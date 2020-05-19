Template.learner_designed_challenges.events({
    'click div[id=unitDiv1]': function(event, template) {
        template.$('#unit1q1').show();
        template.$('#unit1q2').show();
     },
    'click .open-insert-modal': function (e) {
    e.preventDefault();
    //{backdrop: "static"} it is use for only close button click than close
    $('#insertModal').modal({backdrop: "static"});
    },
});