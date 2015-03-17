$('#submit').click(function(){
    var name = $('#form-signup').find('input[name="name_user"]').val();
    var email = $('#form-signup').find('input[email="email_user"]').val();
    alert('Name: '+name+' Email: '+email);
    /*
     socket.post('https://mobilectures.herokuapp.com/speaker/listeners/create', {name:name, email:email}, function (data, jwres){
      });
      */
});