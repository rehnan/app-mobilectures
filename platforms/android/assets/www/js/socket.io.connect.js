var socket = io.connect(ml.config.url);

socket.on("connect", function () {
	console.log("Socket Connected!");
	ml.loader.show();
	socket.on('disconnect', function () {
		console.log("## Socket Desconnected!");
		//Prepara loading
	});

	socket.on('reconnecting', function () {
		console.log("### => Socket Reconnecting!");
		//Exibe loading
	});

	socket.on('reconnect', function () {
		console.log("## Socket Reconnect!");
		//Deslogar e logar novamente
		//Feacha loading
	});
});

socket.on('welcome-msg', function(message){
	ml.flash.success("#page-logged-1", message);
});

socket.on('polls-receive', function(poll){
	ml.polls.add(poll)
	ml.polls.badge_count();
	ml.polls.render();
});



