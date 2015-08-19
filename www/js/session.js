$(document).ready(function () { ml.session.load(); });

//ml.session.setItem("authorization", false);
ml.session = {

   load: function () {
	  ml.session.storage = window.sessionStorage;
	  
      ml.session.user.save();
      ml.session.user.current();
      ml.session.user.destroy();

      ml.session.polls.new();
      ml.session.polls.all();
      ml.session.polls.save(null);
      ml.session.polls.add(null);
      ml.session.polls.remove();
      ml.session.polls.current();

      ml.session.quizzes.new();
      ml.session.quizzes.all();
      ml.session.quizzes.save(null);
      ml.session.quizzes.add(null);
      ml.session.quizzes.remove();
      ml.session.quizzes.current();
   },
}

ml.session.user = {

	save: function (listener) {
		ml.session.storage.setItem("listener", JSON.stringify(listener));
	},

	current: function () {
		if(ml.session.storage.getItem("listener") === 'undefined') { return false; }
		return JSON.parse(ml.session.storage.getItem("listener"));
	},

	destroy: function () {
		ml.session.storage.setItem("listener", null);
	}
};

ml.session.polls = {
	new: function () {
		if(!ml.session.user.current()) { return false; }
		return ml.session.storage.setItem('polls_'+ml.session.user.current().user.email, JSON.stringify(new Array()));
	},


	all: function () {
		if(!ml.session.user.current()) { return false; }
		return JSON.parse(ml.session.storage.getItem('polls_'+ml.session.user.current().user.email));
	},

	save: function (polls) {
		if(!polls) { return false; }
		console.log('Call Save From Polls');
		ml.session.storage.setItem('polls_'+ml.session.user.current().user.email, JSON.stringify(polls));
	},

	add: function (poll) {
		if(!ml.session.user.current()) { return false; }
		var polls = ml.session.polls.all();
		polls.push(poll);
		ml.session.polls.save(polls);
	},

	remove: function () {
		if(!ml.session.user.current()) { return false; }
		var polls = ml.session.polls.all();
		polls.shift();
		ml.session.polls.save(polls);
	},

	current: function () {
		if(!ml.session.user.current()) { return false; }
		return ml.session.polls.all().shift();
	}
};


ml.session.quizzes = {
	new: function () {
		if(!ml.session.user.current()) { return false; }
		return ml.session.storage.setItem('quizzes_'+ml.session.user.current().user.email, JSON.stringify(new Array()));
	},


	all: function () {
		if(!ml.session.user.current()) { return false; }
		return JSON.parse(ml.session.storage.getItem('quizzes_'+ml.session.user.current().user.email));
	},

	save: function (quizzes) {
		if(!quizzes) { return false; }
		console.log('Call Save From Quizzes');
		ml.session.storage.setItem('quizzes_'+ml.session.user.current().user.email, JSON.stringify(quizzes));
	},

	add: function (quiz) {
		if(!ml.session.user.current()) { return false; }
		var quizzes = ml.session.quizzes.all();
		quizzes.push(quiz);
		ml.session.quizzes.save(quizzes);
	},

	remove: function () {
		if(!ml.session.user.current()) { return false; }
		var quizzes = ml.session.quizzes.all();
		quizzes.shift();
		ml.session.quizzes.save(quizzes);
	},

	current: function () {
		if(!ml.session.user.current()) { return false; }
		return ml.session.quizzes.all().shift();
	}
};
