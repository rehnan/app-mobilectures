$(document).ready(function() {


   var socket = io.connect('http://localhost:1337');
  
	$("#action_login").click(function() {
		//$('.form-signin').find('input[name="email"]').val();
		
	});

	socket.on("connect", function () {
	   	 console.log("Connected!");
	   	 var key = "5412";
		var url = '/listeners/join';
  		socket.get(url, {keySession:key}, function (response){
  			console.log(response.msg);

  			
		});
	});
});