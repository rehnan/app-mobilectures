$(document).ready(function () { ml.doubts.load(); });

ml.doubts = {

   load: function () {
    ml.doubts.send_doubt();
    ml.doubts.doubt();
    ml.doubts.append_doubt();
    ml.doubts.formatDate();
 },

 doubt: function () {
   $("a[href=#doubt]").click(function (){
      $.mobile.changePage('#page-doubt');
      var url = ml.config.url + "/api/doubts";
      socket.get(url, function (data, jwres) {
         //console.log(data);
         //console.log(jwres);
         $('#doubts-table tbody').empty();
         var doubts = data.doubts;
         $.each(doubts, function(index, doubt){
            console.log(doubt);
            $('#doubts-table tbody').append("<tr><td>"+(index+1)+"</td><td>"+doubt.description+"</td><td>"+ml.doubts.formatDate(doubt.createdAt)+"</td><td>"+doubt.answered+"</td></tr>");
         })
      });
   });
},

append_doubt: function (index, doubt) {

},


formatDate: function(date) {
   return moment(date).format('DD/MM/YYYY HH:mm:ss');
},

send_doubt: function() {
 $("#form-doubt").submit(function(){
   var params = $(this).serializeJSON();
   var url = ml.config.url + "/api/doubts";
          //alert(JSON.stringify(params));

          socket.post(url, params, function (data, jwres) {
           var status_code = jwres.statusCode;
             //Append new dount in table
             //append_doubt(data.doubt, data.index);
             console.log(data.doubt);
             var doubt = data.doubt;
             var index = data.index;

             $('#doubts-table tbody').append("<tr><td>"+index+"</td><td>"+doubt.description+"</td><td>"+doubt.createdAt+"</td><td>"+doubt.answered+"</td></tr>");
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
