var socket = io.connect(ml.config.url);

socket.on("connect", function () {
	ml.loader.hide();
	console.log("Connection Success!");

	socket.on('disconnect', function () {
		console.log('Server is died!')
		ml.loader.show();
		$("#msg-loading").html("<strong> Aguarde... <br> Conexão perdida... </strong>").text();
	});

	socket.on('reconnecting', function () {
		console.log('Trying Reconnecting...') 
		$("#msg-loading").html("<strong> Aguarde... <br> Tentando uma reconexão com o servidor </strong>").text();
	});

	socket.on('reconnect', function () {
		var url = ml.config.url + '/api/listeners/join';
		if(ml.session.user.current()) {
			socket.post(url, ml.session.user.current(), function (data, jwres) {
	            if (data.authorization == "authorized") {
	               var header = "Sessão " + data.session.name;
	               console.log('Logged!!');
	              $("#msg-loading").html("<strong> Aguarde... <br> Reconexão efetuado com sucesso! </strong>").text();
	            } else if (data.error) {
	               console.log('Erro Logged!!');
	            }
	      	});
		}
	
		ml.loader.hide();
	});
});

socket.on('error', function (data) {
	console.log('Server is alive?');
	ml.loader.show();
	$("#msg-loading").html("<strong> Aguarde... <br> Tentando uma conexão com o servidor </strong>").text();
});

socket.on('welcome-msg', function(message){
	ml.flash.success("#page-logged-1", message);
});

socket.on('polls-receive', function(poll){
	console.log('Pollll');
	ml.polls.add(poll)
	ml.polls.badge_count();
	ml.polls.render();
});

socket.on('quizzes-receive', function(quiz){
	console.log('Quizzzz');
	ml.quizzes.add(quiz);
	ml.quizzes.badge_count();
	ml.quizzes.render();
});



