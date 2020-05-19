Template.design_quiz.onCreated(function(){
    Session.set('createquiz', [
            {
                index: 1,
                type: 'none',
                question: '',
                multi: [
                    // {
                    //     selected: true,
                    //     text: ""
                    // }
                ],
                answer: ''
            }        
        ]
		);
		
		Meteor.subscribe('quiz');
})

Template.design_quiz.helpers({
    createquiz() {
        return Session.get('createquiz');
		},
		
		isSelected(type, val) {
			return type === val;
		}
})

Template.design_quiz.events({
    'change select[class=question-selection]': function(event) {
        var selVal = $(event.target).val();
				console.log(selVal);
				console.log(event.target.name);

				index = parseInt(event.target.name);
				index -= 1;

				createquiz = Session.get('createquiz');
				createquiz[index].type = selVal;

				Session.set('createquiz', createquiz)

      //   if(selVal == 'mc') {
      //       template.$('#question1MulDiv').show();
      //       template.$('#question1FillDiv').hide();
      //       template.$('#question1FreeDiv').hide();
      //   }
     },     

    // 'click .open-insert-modal': function (e) {
		// 	e.preventDefault();
		// 	//{backdrop: "static"} it is use for only close button click than close

		// 	$('#insertModal').modal({backdrop: "static"});

		// },

		'submit #form-create-quiz'(event){
			event.preventDefault();

			//Check validation
			const target = event.target;
			const designer_quiz_title = target.designer_quiz_title.value;

			if( designer_quiz_title.trim() === "" ) {
				alert("Please insert quiz title.");
				return;
			}

			const designer_quiz_text = target.designer_quiz_text.value;
			if( designer_quiz_text.trim() === "" ) {
				alert("Please insert quiz text.");
				return;
			}

			//Fetch data in the form.
			createquiz = Session.get('createquiz');
			for( i = 1; i <= createquiz.length; i ++ ) {								
				index = i - 1;
				if(createquiz[index].type !== 'none') {
					createquiz[index].question = $(`#designer_quiz_title-${i}`).val();

					if(createquiz[index].type === 'mc') {
						multi = [];
						for( k = 1; k <= 4; k ++ ) {
							multi.push({
								selected: $(`#q1o${k}-${i}`).prop('checked'),
								text: $(`#questionOption${k}-${i}`).val()
							})
						}

						createquiz[index].multi = multi;
					}
					else {
						createquiz[index].answer = $(`#designer_quiz_answer-${i}`).val();
					}
				}
			}

			quiz = {
				quiztitle: designer_quiz_title,
				quiztext: designer_quiz_text,
				quizlist: createquiz,
				createdAt: new Date()
			}

			Meteor.call("add_quiz", quiz, (err, result) => {
				if( err ) {

				}
				else {
					$('#insertModal').modal({backdrop: "static"});

					//new quiz
					target.designer_quiz_title.value = "";
					target.designer_quiz_text.value = "";

					Session.set('createquiz', [
									{
											index: 1,
											type: 'none',
											question: '',
											multi: [
													// {
													//     selected: true,
													//     text: ""
													// }
											],
											answer: ''
									}        
							]
					);
				}
			});

			console.log(quiz);
		},
		
		'click #add-question': function(e) {
			createquiz = Session.get('createquiz');

			index = createquiz.length + 1;
			newquiz = {
					index: index,
					type: 'none',
					question: '',
					multi: [
							// {
							// 		selected: true,
							// 		text: ""
							// }
					],
					answer: ''
			};
			createquiz.push(newquiz);

			Session.set('createquiz', createquiz)
		}
});