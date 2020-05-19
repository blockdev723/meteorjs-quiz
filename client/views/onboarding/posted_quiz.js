//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Onboarding / learner / peer review
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// local variables and methods
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FlowRouter = require('meteor/ostrio:flow-router-extra').FlowRouter

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.posted_quiz.onCreated(function(){
    this.state = new ReactiveDict();
    Meteor.subscribe('quiz');
});

Template.posted_quiz.helpers({
    quizlist() {
        result = CollectQuiz.find(
            {},            
            {
                fields:{
                    _id: 1,
                    quiztitle: 1,
                    quiztext: 1,
                    createdAt: 1
                }
            }
        ).fetch();

        return result;
    }
});

Template.posted_quiz.events({
    'click .btn-edit-quiz': function(event, instance) {
				console.log(" - go-edit - ");
				console.log(event.target.id);

        Session.set('quiz_id', event.target.id);
        // FlowRouter.go('peer_review.detail', {_id: this.question_id});
    }
});