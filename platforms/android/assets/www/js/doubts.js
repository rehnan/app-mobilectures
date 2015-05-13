$(document).ready(function () { ml.doubts.load(); });

ml.doubts = {

  load: function () {
    ml.doubts.send_doubt();
    ml.doubts.doubt();
  },

  doubt: function () {
    $("a[href=#doubt]").click(function (){
     $.mobile.changePage('#page-doubt');
   });
  },

  send_doubt: function() {
    $("#form-doubt").submit(function(){
     
      var params = $(this).serializeJSON();
      var url = ml.config.url + "/api/doubts";
          //alert(JSON.stringify(params));

      socket.post(url, params, function (data, jwres) {
        var status_code = jwres.statusCode;

        console.log(status_code);
        if (data.errors) {
          ml.flash.error('#page-doubt', 'Dados incorretos!');
          ml.forms.showErrors('#form-doubt', data.errors, 'doubt');
        } else if(status_code == 200) {
          console.log(data.doubt.id);
          ml.flash.success('#page-doubt', 'Dúvida enviada com sucesso! '+data.doubt.id);
          //ml.flash.clear();
          ml.forms.clear('#form-doubt');
          //Redireciona $.mobile.changePage('#page-sign-in');
        }
      });
      return false;
    });
  }
}
