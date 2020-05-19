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
Template.peer_review.onCreated(function(){
    this.state = new ReactiveDict();
    Meteor.subscribe('peerquestions');
    Meteor.subscribe('peeranswers');
});

Template.peer_review.helpers({

    reviewdata() {
        doclist = CollectPeerReviews.find(
            {},            
            {
                sort:{
                    unit_id: 1
                }
            }
        ).fetch();

        result = [];
        index = 0;
        doclist.forEach(doc => {
            if(index === 0) {
                result.push({...doc, questions:[{question_id: doc.question_id, question: doc.question, createdAt: doc.createdAt}]})
                index ++;
            }
            else {
                if( doc.unit_id === result[index-1].unit_id ) {
                    result[index-1].questions.push({question_id: doc.question_id, question: doc.question, createdAt: doc.createdAt});
                }
                else {
                    result.push({...doc, questions:[{question_id: doc.question_id, question: doc.question, createdAt: doc.createdAt}]})
                    index ++;
                }
            }
        })

        return result;
    }
});

Template.peer_review.events({
    'click .go-detail': function(event, instance) {
        console.log(" - go-detail - ");
        Session.set('question', {question_id: this.question_id});
        // FlowRouter.go('peer_review.detail', {_id: this.question_id});
    }
});

Template.peer_review_detail.helpers({

    data() {
        // console.log("-Session-");
        // console.log(Session.get('question'));

        session_question = Session.get('question');
        question_id = session_question.question_id;

        questdoc =  CollectPeerReviews.findOne({question_id: question_id});
        answers = CollectPeerAnswers.find({question_id: question_id}).fetch();

        console.log("# peer_review_detail #");
        console.log(question_id);
        console.log(answers);

        return {
            unit_id: questdoc.unit_id,
            unit_name: questdoc.unit_name,
            question_id: question_id,
            question: questdoc.question,
            answers: answers
        }
    },

    isImage: function(url) {
        return url !== "";
    },
    
    formatDate: function(date) {
        const epochtime = ConvertDateToEpoch(date);
        const dataObj = ConvertEpochToDateFormat(epochtime);

        return `${dataObj.monthAbbr} ${dataObj.date}, ${dataObj.year} ${dataObj.amphours} ${dataObj.ampm}`;
    }
});

Template.peer_review_detail.events({
    'submit .new-review'(event) {
        event.preventDefault();

        console.log("click #review-submit");
        
        const target = event.target;
        const question_id = target.hquestion_id.value;
        const text = target.comment.value;

        // console.log(question_id);
        // console.log(text);        

        Meteor.call('insert_new_peer_review', question_id, text, '');

        target.comment.value = "";
    }
})
