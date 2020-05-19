#######################################################
#
# Mooqita
# Created by Markus on 23/10/2016.
#
#######################################################

#######################################################
@Permissions = new Mongo.Collection("permissions")
@Admissions =  new Mongo.Collection("admissions")
@Admin = new Mongo.Collection("admin")

#######################################################
@Recommendations = new Mongo.Collection("recommendations")
@Organizations = new Mongo.Collection("organizations")
@Invitations = new Mongo.Collection("invitations")
@Challenges = new Mongo.Collection("challenges")
@Solutions = new Mongo.Collection("solutions")
@Feedback = new Mongo.Collection("feedback")
@Profiles = new Mongo.Collection("profiles")
@Messages = new Mongo.Collection("messages")
@Reviews = new Mongo.Collection("reviews")
@Posts = new Mongo.Collection("posts")
@Jobs = new Mongo.Collection("jobs")

#######################################################
@PoolChallenges = new Mongo.Collection("pool_challenges")

#######################################################
@ChallengeSummaries = new Mongo.Collection("challenge_summaries")

#######################################################
@UserSummaries = new Mongo.Collection("user_summaries")
@UserResumes = new Mongo.Collection("user_resumes")
@TeamMembers = new Mongo.Collection("team_members")

#######################################################
@EduCertTemplate = new Mongo.Collection("edu_cert_templates")
@EduCertAssertions = new Mongo.Collection("edu_cert_assertions")
@EduCertRecipients = new Mongo.Collection("edu_cert_recipients")

#######################################################
@Matches = new Mongo.Collection("matches")
@NLPTasks = new Mongo.Collection("nlp_tasks")

#######################################################
@CollectPeerReviews = new Mongo.Collection("peerquestions");
@CollectPeerAnswers = new Mongo.Collection("peeranswers");
@CollectQuiz = new Mongo.Collection("quiz");