$(document).ready(function () { ml.polls.load(); });

ml.polls = {
	load: function () {
		ml.polls.poll();
		ml.polls.render();
		ml.polls.add(null);
		ml.polls.remove();
		ml.polls.polls();
		ml.polls.notify();
	},


	poll: function () {
		$("a[href=#poll]").click(function (){
			$.mobile.changePage('#page-poll');
			//Verificar se polls.length > 0 então retorn o .shift()
			//console.log("######### => "+ml.polls.polls().shift());
			ml.polls.render();
			//A cada envio atualiza view
		});
	},

	notify: function() {
		//Modificar label e gerar uma notificação de nova enquete com o plugin phonegap
		$(".badge-polls").text(ml.polls.polls().length);
	},

	render: function () {
		if(ml.polls.polls().length > 0) {
			var poll = ml.polls.polls().shift();
		//Renderizar formulário com a questão de enquete
		console.log(poll);
		$("#poll-info").html("<h1>"+poll.title+"</h1>");
		$("#poll-question").html("<p>"+poll.question+"</p>");
		$("#poll-alternatives").html('');
		var alt = '<form><label><input type="radio" name="radio-choice-0" id="radio-choice-0a">One</label><label for="radio-choice-0b">Two</label><input type="radio" name="radio-choice-0" id="radio-choice-0b" class="custom"></form>';
                    
			$("#poll-alternatives").html(alt);
		$.each(poll.alternatives, function(index, alternative){ 
			console.log(alternative);
			
		});
	}
},

add: function (poll) {
	var polls = JSON.parse(ml.session.getItem("polls-list"));
	polls.push(poll);
	ml.session.setItem("polls-list", JSON.stringify(polls));
	console.log('Adicionando Enquente...');
	console.log(polls);
},

polls: function () {
	return JSON.parse(ml.session.getItem("polls-list"));
},

remove: function () {
	var polls = JSON.parse(ml.session.getItem("polls-list"));
	polls.shift();
	ml.session.setItem("polls-list", JSON.stringify(polls));
	console.log('Removendo Enquente...');
	console.log(polls);
}, 

answer: function () {

}
}