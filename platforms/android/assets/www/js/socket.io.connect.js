var socket = io.connect(ml.config.url);

socket.on("connect", function () {
   console.log("broadcast!!1");
});

socket.on('welcome-msg', function(message){
   ml.flash.success("#page-logged-1", message);
});

socket.on('disconnect', function (reason) {
   console.log('(II) Disconnected from server\n');
});
