$(document).ready(function () { ml.quizzes.load(); });

ml.quizzes = {
	load: function () {
		ml.quizzes.quiz();
		ml.quizzes.all();
		ml.quizzes.badge_count();
		ml.quizzes.render();
		ml.quizzes.select();
		ml.quizzes.render_question(null);
		ml.quizzes.send_answer();
		ml.quizzes.add(null);
		ml.quizzes.remove();
		ml.quizzes.quizzes();
		ml.quizzes.current();
		ml.quizzes.set_current(null);
		ml.quizzes.find(0);
		ml.quizzes.badge_count();
	},

	quiz: function () {
		$("a[href=#quiz]").click(function (){
			if(!ml.session.user.current()) { return $.mobile.changePage('#page-sign-in'); }
			$.mobile.changePage('#page-quiz');
			$("#listview-quizzes").html('');
			if(ml.quizzes.current() === null) {
				ml.flash.clear_this_page('#page-quiz');
				ml.quizzes.render();
			} else {
				ml.quizzes.render_question(ml.quizzes.current());
			}
		});
	},

	badge_count: function () {
		$(".badge-quizzes").text(ml.quizzes.all().length);
	},

	render: function () {

		var count_quizzes = ml.quizzes.all().length;
		$("#listview-quizzes").html('');
		if(count_quizzes > 0) {

			$.each(ml.quizzes.all(), function(index, quiz){ 
				var li_quiz = "<li class='ui-li-has-alt ui-li-has-thumb ui-first-child'>" +
				"<a href='#' class='ui-btn'>" +
				"<img src='img/quiz_image.png'>" +
				"<h2>"+(index+1)+" - "+quiz.title+"</h2>" +
				"<p>"+quiz.description+"</p></a>" +
				"<a href='#purchase"+quiz.id+"' data-rel='popup' data-position-to='window' data-transition='pop' aria-haspopup='true' aria-owns='purchase' aria-expanded='false' class='ui-btn ui-btn-icon-notext ui-icon-gear ui-btn-a' ></a>" +
				"</li>"+
				"<div data-role='popup' id='purchase"+quiz.id+"' data-theme='a' data-overlay-theme='b' class='ui-content' style='max-width:340px; padding-bottom:2em;'>" +
				    	"<h3>Quiz - "+quiz.title+"</h3>" +
				"<p>"+quiz.description+"</p>" +
				    	"<a href='#' data-rel='back' data-index-question='"+JSON.stringify(index)+"' class='start_quiz ui-shadow ui-btn ui-corner-all  ui-icon-check ui-btn-icon-left ui-btn-inline ui-mini'>Iniciar Quiz</a>" +
				    	"<a href='#' data-rel='back' class='ui-shadow ui-btn ui-corner-all  ui-icon-delete ui-btn-icon-left ui-btn-inline ui-mini'>Delete</a>" +
				"</div>";
				$("#listview-quizzes").append(li_quiz).enhanceWithin();
			});
} else {
	ml.flash.info('#page-quiz', 'Você possui '+count_quizzes+' quizzes para responder!');
}
},

select: function () {
	$(document).on("vclick", ".start_quiz", function(event) {
		/* clear div listview-quizzes */
		$("#listview-quizzes").html('');
		var quiz;

			//Getting index question
			var i = $(this).data('index-question');

			//Check by current quiz 
			if (ml.quizzes.current() === null) {
				console.log('Não existe um current_quiz selecionado!');
				quiz = ml.quizzes.find(i);
				ml.quizzes.set_current(quiz);
				ml.flash.clear_this_page('#page-quiz');
			} else {
				console.log('Já existe um current_quiz selecionado!')
				quiz = ml.quizzes.current();
			} 

			//Render question
			ml.quizzes.render_question(quiz);

			return true;
		});
},

render_question: function (quiz) {

	$("#quiz-info").html('')
	$("#quiz-question").html('')
	$("#quiz-alternatives").html('');

	if(quiz && quiz.questions && quiz.questions.length > 0) {

		var question = quiz.questions.shift();

		$("#quiz-info").html("<span><center><b>Título: </b>"+quiz.title+"</center></span>").enhanceWithin();
		$("#quiz-info").html("<input type='hidden' name='quiz' value='"+quiz.id+"'><input type='hidden' name='quizquestion' value='"+question.id+"'><input type='hidden' name='listener' value='"+ml.session.user.current().id+"'><input type='hidden' name='correct_alternative' value='"+question.correct_alternative+"'><input type='hidden' name='points' value='"+question.points+"'>");
		$("#quiz-question").html("<hr><p>"+question.description+"</p>").enhanceWithin();
		$("#quiz-alternatives").html('');

		$.each(question.alternatives, function(index, alternative){ 
			var alt = "<label for='"+index+"'>"+alternative+"</label>" +
			"<input type='radio' name='alternative' value="+index+" id='"+index+"'>";
			$("#quiz-alternatives").append(alt).enhanceWithin();
		});

		$("#quiz-alternatives").append("<button id='send_answer_quiz'>Responder Enquete </button>").enhanceWithin();
		
		//Start timer to answer question...
		ml.timer.stop();
		ml.timer.start(true);
		console.log('Iniciando Timer...');
	} else {
		ml.timer.stop();
		ml.timer.reset();
		ml.quizzes.set_current(null);
		ml.quizzes.render();
		if (quiz !== 'done') { ml.flash.success('#page-quiz', 'Quiz finalizado com sucesso!'); }
	}
},


send_answer: function () {
	$('#form-quiz').submit(function() {
		console.log('Sending answer...');
		var form = $(this).serializeJSON();

		form.alternative = Number(form.alternative);
		form.correct_alternative = Number(form.correct_alternative);
		form.points = Number(form.points);
		//Stopping timer
		ml.timer.stop();
		form.timer = ml.timer.current();
	
		//console.log('Pontos: '+(Number(form.points) - (ml.timer.current()/100));

		var url = ml.config.url + '/api/quiz_answers'

		socket.post(url, form, function (data, resp) {

			ml.flash.clear_this_page('#page-quiz');
			if(data.errors) {
				if(data.errors.alternative) {
					//Start timer
					ml.timer.start(true);
					console.log('Erro - Tempo continua...');
					ml.flash.error('#page-quiz', data.errors.alternative[1]);
				} else {
					ml.timer.stop();
					ml.timer.reset();
					console.log('Tempo interrompido - Quiz Encerrado!!');
					console.log(data.errors);
					ml.flash.error('#page-quiz', data.errors);
					ml.quizzes.set_current(null);
					return ml.quizzes.render_question('done');
				}
				return false;
			}

			ml.timer.stop();
			ml.timer.reset();

			ml.flash.success('#page-quiz', 'Resposta enviada com sucesso!');
			var quiz = ml.quizzes.current();
			console.log(quiz.questions.length);
			quiz.questions.shift();
			ml.quizzes.set_current(quiz);
			console.log(ml.quizzes.current().questions.length);
			return ml.quizzes.render_question(ml.quizzes.current());
		});

		return false;
	});
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

set_current: function (value) {
	return ml.session.quizzes.set_current(value); 
},

all: function () {
	return ml.session.quizzes.all(); 
},

find: function (index) {
	return ml.session.quizzes.find(index); 
},

};