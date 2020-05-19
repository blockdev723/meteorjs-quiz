###########################################################3
  ##########################

###

  Created Date 3/27/2020 Srividya Gopaluni
###


Meteor.methods
  get_cobol_questions:() ->
    cobol_questions = {}
    cobol_questions.question = "When did COBOL language first come into use?"
    cobol_questions.answer_one = "1987"
    cobol_questions.answer_two = "1994"
    cobol_questions.answer_three = "1878"
    cobol_questions.answer_four = "2020"

    cobol_questions.question2 = "When did JAVA language first come into use?"
    cobol_questions.Answer2_one = "1987"
    cobol_questions.Answer2_two = "1994"
    cobol_questions.Answer2_three = "1878"
    cobol_questions.Answer2_four = "2020"






    return cobol_questions

    get_quiz_scores:() ->
      score = {}
      score.cobol_quiz_score = 17

      return score