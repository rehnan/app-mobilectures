$(document).ready(function () { ml.timer.load(); });

ml.timer = {

   load: function () {
   		ml.timer.storage = window.sessionStorage;
   		ml.timer.counter = null;
   		ml.timer.incrementTimer();
   		ml.timer.current();
   		ml.timer.start(false);
   		ml.timer.reset();
   		ml.timer.stop();
   },

   incrementTimer: function () {
   		if(!ml.session.user.current()) { return false; }
   		var value = JSON.parse(ml.timer.storage.getItem('timer_'+ml.session.user.current().email));
   		value++;
   	    ml.timer.storage.setItem('timer_'+ml.session.user.current().email, JSON.stringify(value));
   },

   current: function () {
   		if(!ml.session.user.current()) { return false; }
   		return JSON.parse(ml.timer.storage.getItem('timer_'+ml.session.user.current().email));
   }, 

   start: function (boolean) {
   		if(!ml.session.user.current()) { return false; }
   		if(boolean) {
   			ml.timer.counter = setInterval(function () {
			ml.timer.incrementTimer();
			console.log('Increment Timer...'+ ml.timer.current());
			//Limit seconds timer
			if(ml.timer.current() === 1000) {
				console.log('O tempo chegou ao limite');
				return clearInterval(ml.timer.counter);	
			}
			}, 1000);
   		} 
   },

   stop: function () {
   	    clearInterval(ml.timer.counter);
   },

   reset: function () {
   		if(!ml.session.user.current()) { return false; }
   	    ml.timer.storage.setItem('timer_'+ml.session.user.current().email, JSON.stringify(0));
   },
   
}