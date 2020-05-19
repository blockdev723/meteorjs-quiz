/*
 * Federico(Pang)
 * gangwang592@gmail.com
*/

import {Meteor} from 'meteor/meteor';


if( Meteor.isServer) {
    Meteor.publish('peerquestions', function peerreviewsPublication(){
        
        //Test
        if( CollectPeerReviews.find().count() === 0 ) {
            CollectPeerReviews.insert(
                {
                    unit_id: "Unit1",
                    unit_name: "Unit 1 - Syntax",                    
                    question_id: "1",
                    question: "Can someone help me with this import statement?",
                    user_id: 'user1',
                    createdAt: "April 17, 2020 7:00 pm"                    
                });

                CollectPeerReviews.insert(
                    {
                        unit_id: "Unit1",
                        unit_name: "Unit 1 - Syntax",                                       
                        question_id: "2",
                        question: "I don't understand why my print statement is not working. Help?",
                        user_id: 'user2',
                        createdAt: "April 17, 2020 7:00 pm"                            
                    });

            CollectPeerReviews.insert(
                {
                    unit_id: "Unit2",
                    unit_name: "Unit 2 - For Loops",                    
                    question_id: "3",
                    question: "Can someone help me with this import statement?",
                    user_id: 'user1',
                    createdAt: "April 17, 2020 7:00 pm"                     
                });            

                CollectPeerReviews.insert(
                    {
                        unit_id: "Unit2",
                        unit_name: "Unit 2 - For Loops",                    
                        question_id: "4",
                        user_id: 'user1',
                        question: "I don't understand why my print statement is not working. Help?",
                        createdAt: "April 17, 2020 7:00 pm",
                    });            
    
        }

        return CollectPeerReviews.find();
    });

    Meteor.publish('peeranswers', function peeranswersPublication(){

        if(CollectPeerAnswers.find().count() === 0 ) {
            //Sample Answers
            //question 1
            CollectPeerAnswers.insert(
                {
                    question_id: "1",
                    user_id: 1,
                    text: "Can someone Help with this import statement   I have this for my code right now but i think line 1 might be the issue.   My code goes like this:",
                    img: "code1.png",
                    createdAt: "April 17, 2020 7:00 pm"
                }
            );

            CollectPeerAnswers.insert(
                {
                    question_id: "1",
                    user_id: 2,
                    text: "Can someone Help with this import statement  I have this for my code right now but i think line 1 might be the issue.",
                    img: "code1.png",
                    createdAt: "April 17, 2020 7:00 pm"
                }
            )

            //question2
            CollectPeerAnswers.insert(
                {
                    question_id: "2",
                    user_id: 1,
                    text: "Can someone Help with this import statement   I have this for my code right now but i think line 1 might be the issue.   My code goes like this:",
                    img: "code1.png",
                    createdAt: "April 17, 2020 7:00 pm"
                }
            );

            CollectPeerAnswers.insert(
                {
                    question_id: "3",
                    user_id: 2,
                    text: "Can someone Help with this import statement  I have this for my code right now but i think line 1 might be the issue.",
                    img: "code1.png",
                    createdAt: "April 17, 2020 7:00 pm"
                }
            );
        }

        return CollectPeerAnswers.find();
    });

    Meteor.publish('quiz', function quizPublication(){
        return CollectQuiz.find();
    });
}

Meteor.methods({
    insert_new_peer_review(question_id, text, img) {
        CollectPeerAnswers.insert(
            {
                question_id,
                user_id: 1,
                text,
                img: "",
                createdAt: new Date()
            }
        );
    },

    add_quiz(quiz){
        CollectQuiz.insert(quiz);
    },

    update_quiz(quiz, quiz_id){
        CollectQuiz.upsert({_id: quiz_id}, quiz);
    }
})