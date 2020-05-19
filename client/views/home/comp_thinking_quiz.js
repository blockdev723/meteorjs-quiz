Template.comp_thinking_quiz.helpers({
    quiz: () => {
        debugger;
        return Session.get('comp_thinking_quiz')
    },

    comp_thinking_quiz_score: () => {
        debugger;
        var comp_thinking_quiz_score = Session.get('comp_thinking_quiz_score')

        if(comp_thinking_quiz_score == undefined) {
            comp_thinking_quiz_score = false
        }

        return comp_thinking_quiz_score
    }
})

Template.comp_thinking_quiz.onRendered(() => {
    Meteor.call('get_comp_thinking_questions', (err, res) => {
        debugger;
        Session.set('comp_thinking_quiz', res)
    })

    Meteor.call('get_quiz_scores', (err, res) => {
        debugger;
        Session.set('comp_thinking_quiz_score', res.comp_thinking_quiz_score)
    })

    this.$('#comp_thinking_quiz').submit(event => {
        event.preventDefault()
        var submitted_answers = this.$('#comp_thinking_quiz').serializeArray()
        var quiz = Session.get('comp_thinking_quiz')
        var count = 0
        var correct = 0

        $('#comp_thinking_quiz').html('')

        for(let i = 0; i < submitted_answers.length; i++) {
            if(submitted_answers[i].value   == quiz[count][quiz[count].correct_answer]) {
                $('#comp_thinking_quiz').append('<div>')
                $('#comp_thinking_quiz').append('<strong>Question ' + (count + 1) + ' Correct:</strong> <br />')
                $('#comp_thinking_quiz').append(quiz[count][quiz[count].correct_answer])
                $('#comp_thinking_quiz').append('</div> <br />')
                correct += 1
            } else {
                $('#comp_thinking_quiz').append('<div>')
                $('#comp_thinking_quiz').append('<strong>Question ' + (count + 1) + ' Incorrect:</strong> <br />')
                $('#comp_thinking_quiz').append('<span>You said: ' + submitted_answers[i].value + '<span> <br />')
                $('#comp_thinking_quiz').append('<span>The correct answer was: ' + quiz[count][quiz[count].correct_answer] + '<span> <br />')
                $('#comp_thinking_quiz').append('</div> <br />')
            }

            count += 1
        }

        var score = ((correct / submitted_answers.length) * 100).toFixed(2)

        Meteor.call('set_comp_thinking_score', score, err => {
            if(!score) {
                $('#comp_thinking_quiz').html('<h1>You can\'t resubmit this quiz.</h1>')    
            }
        })

        $('#comp_thinking_quiz').append('<h1><strong>Score</strong>: ' + score + '%</h1>')

        return false
    })
})