$(document).ready(function () { ml.quizzes.load(); });

ml.quizzes = {
	load: function () {
		ml.quizzes.quiz();
		ml.quizzes.badge_count();
		ml.quizzes.render();
		ml.quizzes.render_question();
		ml.quizzes.add(null);
		ml.quizzes.remove();
		ml.quizzes.quizzes();
		ml.quizzes.current();
		ml.quizzes.badge_count();
		/*ml.quizzes.notify();
		ml.quizzes.send_answer();*/
	},

	quiz: function () {
		$("a[href=#quiz]").click(function (){
			if(!ml.session.user.current()) { return $.mobile.changePage('#page-sign-in'); }
			$.mobile.changePage('#page-quiz');
			//ml.quizzes.render();
		});
	},

	badge_count: function () {
		$(".badge-quizzes").text(ml.session.quizzes.all().length);
	},

	render: function () {

	},

	render_question: function () {

	},

	add: function (quiz) {
		ml.session.quizzes.add(quiz); 
	},

	quizzes: function () {
		return ml.session.quizzes.all(); 
	},

	remove: function () {
		ml.session.quizzes.remove(); 
	}, 

	current: function () {
		return ml.session.quizzes.current(); 
	},

}