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
		return ml.session.storage.setItem(ml.session.user.current().user.email, JSON.stringify(new Array()));
	},


	all: function () {
		if(!ml.session.user.current()) { return false; }
		console.log('hoho'+ml.session.user.current().user.email);
		return JSON.parse(ml.session.storage.getItem(ml.session.user.current().user.email));
	},

	save: function (polls) {
		if(!polls) { return false; }
		ml.session.storage.setItem(ml.session.user.current().user.email, JSON.stringify(polls));
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
