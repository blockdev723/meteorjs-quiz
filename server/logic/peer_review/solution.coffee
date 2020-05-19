###############################################################################
@gen_solution = (challenge, user, company_tag) ->
	solution = get_document user, OWNER, "solutions", {challenge_id: challenge._id}
	if solution
		return solution._id

	solution =
		name: "Solution: " + challenge.title
		index: 1
		challenge_id: challenge._id
		published: false
		company_tag: company_tag

	s_id = store_document_unprotected Solutions, solution, user, true
	msg = "Solution (" + s_id + ") generated by: " + get_user_mail user
	log_event msg, event_logic, event_info

	return s_id


###############################################################################
@finish_solution = (solution, user) ->
	if solution.published
		return solution._id

	requested = num_requested_reviews solution
	provided = num_provided_reviews solution
	credits = provided - requested

	if credits < 0
		msg = "You need to finish your pending reviews."
		msg += "To publish a new solution."
		msg += "Go to My Challenges and finish open challenges."
		throw new Meteor.Error "no-credits", msg

	modify_field_unprotected Solutions, solution._id, "published", true
	solution = Solutions.findOne solution._id

	request_review solution, user
	send_solution_message(solution)

	#TODO: inform people on the waiting list for reviews.

	msg = "Solution (" + solution._id + ") published by: " + get_user_mail user
	log_event msg, event_logic, event_info

	return solution._id


###############################################################################
@reopen_solution = (solution, user) ->
	if !solution.published
		return solution._id

	# we can reopen a solution when:
	# There are no published reviews

	mod =
		fields:
			assigned: 1
			modified: 1

	filter =
		solution_id: solution._id
		published: false

	reviews = Reviews.find(filter, mod).fetch()

	# There are no assigned reviews that
	# have been touched in the last 24 hours
	for r in reviews
		if r.assigned == false
			continue
		if r.modified > new Date((new Date())-1000*60*60*24)
			continue

		throw new Meteor.Error "in-progress", "The Solution already has reviews."

	modify_field_unprotected Solutions, solution._id, "published", false

	remove_documents(Reviews, filter, user)
	remove_documents(Feedback, filter, user)

	msg = "Solution (" + solution.id + ") reopened by: " + get_user_mail user
	log_event msg, event_logic, event_info

	return solution._id

