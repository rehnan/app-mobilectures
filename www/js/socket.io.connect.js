var socket = io.connect(ml.config.url);

socket.on("connect", function () {
	console.log("Socket Connected!");
	$.mobile.loading('show');
	socket.on('disconnect', function () {
		console.log("Socket Desconnected!");
	});
});

socket.on('welcome-msg', function(message){
	ml.flash.success("#page-logged-1", message);
});

socket.on('polls-receive', function(poll){
	ml.polls.add(poll)
	ml.polls.notify();
});



