$(document).ready(function () { ml.quizzes.load(); });

ml.quizzes = {
	load: function () {
		ml.quizzes.quiz();
		ml.quizzes.all();
		ml.quizzes.badge_count();
		ml.quizzes.render();
		ml.quizzes.start();
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
			ml.quizzes.render();
		});
	},

	badge_count: function () {
		$(".badge-quizzes").text(ml.quizzes.all().length);
	},

	render: function () {
		ml.flash.clear_this_page('#page-quiz');
		var count_quizzes = ml.quizzes.all().length;
		$("#listview-quizzes").html('');
		if(count_quizzes > 0) {

			 $.each(ml.quizzes.all(), function(index, quiz){ 
				var number = index+1;
				var li_quiz = "<li class='ui-li-has-alt ui-li-has-thumb ui-first-child'>" +
				"<a href='#' class='ui-btn'>" +
            "<img src='img/quiz_image.png'>" +
          	"<h2>"+number+" - "+quiz.title+"</h2>" +
          	"<p>"+quiz.description+"</p></a>" +
            "<a href='#purchase"+quiz.id+"' data-rel='popup' data-position-to='window' data-transition='pop' aria-haspopup='true' aria-owns='purchase' aria-expanded='false' class='ui-btn ui-btn-icon-notext ui-icon-gear ui-btn-a' ></a>" +
            "</li>"+
            "<div data-role='popup' id='purchase"+quiz.id+"' data-theme='a' data-overlay-theme='b' class='ui-content' style='max-width:340px; padding-bottom:2em;'>" +
              "<h3>Quiz "+number+" - "+quiz.title+"</h3>" +
          	  "<p>"+quiz.description+"</p>" +
              "<a href='#' data-rel='back' data-questions='"+JSON.stringify(quiz.questions)+"' class='start_quiz ui-shadow ui-btn ui-corner-all  ui-icon-check ui-btn-icon-left ui-btn-inline ui-mini'>Iniciar Quiz</a>" +
              "<a href='#' data-rel='back' class='ui-shadow ui-btn ui-corner-all  ui-icon-delete ui-btn-icon-left ui-btn-inline ui-mini'>Delete</a>" +
        		"</div>";
            $("#listview-quizzes").append(li_quiz).enhanceWithin();
			});
		} else {
			ml.flash.info('#page-quiz', 'Você possui '+count_quizzes+' quizzes para responder!');
		}
	},

	start: function () {
		
		$(document).on( "vclick", ".start_quiz", function(event) {
			$("#form-quiz").html(''); 
			$("#listview-quizzes").html('');
			console.log($(this).data('questions'));
			$("#form-quiz").html('Vou iniciar o jogo! Renderizando a primeira questão!').enhanceWithin();
			//Pego os dados
			//Seto o Current
			//Renderiza primeira questão do current;
			// $('#chart_div').removeData("chart-json");
			//   	    var jsonData = $('#chart_div').data('chart-json'); 
			return true;
		});
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

	all: function () {
		return ml.session.quizzes.all(); 
	}

}