$(document).ready(function () { ml.login.load(); });

ml.login = {

   load: function () {
      //ml.login.pagebeforecreate();
      ml.login.beforeAction();
      ml.login.sign_up();
      ml.login.sign_in();
      ml.login.sign_out();
   },


   beforeAction: function () {
      $(document).bind("pagebeforechange", function ( event , data ) {
         alert(data.absUrl);
         if(ml.session.getItem("authorization") === 'false') {
            data.toPage = 'http://localhost/app-mobilectures/www/#page-sign-in';
            console.log("Offline");
         } else {
            data.toPage = 'http://localhost/app-mobilectures/www/#page-logged-1';
            console.log("Online");
         }
        
        //return $.mobile.changePage("#page-sign-in");

      });
      
      /*
      $("div[data-role='page']").bind("pagecontainerbeforechange", function(event, ui){
         event.preventDefault();
         alert(event);
         var page = $(this);
         alert(ml.session.getItem("authorization"));
         if(ml.session.getItem("authorization") === 'false' && page.attr('id') === 'page-sign-up' || page.attr('id') === 'page-sign-in') {
            return $.mobile.changePage('#'+page.attr('id'));
         } else if (ml.session.getItem("authorization") === 'true') {
            return $.mobile.changePage('#'+page.attr('id'));
         } else {
            return $.mobile.changePage('#page-sign-in');
         }
      });
      */
   },

   sign_up: function () {
      $('#form-sign-up').submit(function() {

         var data = $(this).serializeJSON();
         var url = ml.config.url + '/api/listeners'

         $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            success: function(data, status) { 
               ml.forms.clear('#form-sign-up');
               $.mobile.changePage('#page-sign-in');
            },
            error: function(data, status) {
               console.log(data.responseJSON);
               ml.flash.error('#page-sign-up', 'Dados incorretos!');
               var errors = data.responseJSON.errors;
               ml.forms.showErrors('#form-sign-up', errors, 'user');
            },
         });

         return false;
      });

   },

   sign_in: function () {
      $('#form-sign-in').submit(function() {

         var params = $(this).serializeJSON();
         var url = ml.config.url + '/api/listeners/join'

         socket.post(url, params , function (data, jwres) {
            if (data.authorization == "authorized") {
               var header = "Sessão " + data.session.name;
               $('#page-logged-1').find('div[data-role="header"] h1').html(header);
               ml.forms.clear('#form-sign-in');
               $.mobile.changePage('#page-logged-1');
            } else if (data.error) {
               ml.flash.error("#page-sign-in", data.error.message);
            }
         });

         return false;
      });
   },

   sign_out: function () {
      $("a[href=#sign-out]").click(function (){
         console.log(this);
         var url = ml.config.url + "/api/listeners/leave";

         socket.get(url, {}, function (data, jwres) {
            console.log(data);
            console.log(jwres);
            ml.session.setItem("listener", null);
            $.mobile.changePage('#page-sign-in');
            ml.flash.info("#page-sign-in", "Obrigado por participar desta sessão!");
         });

         return false;
      });
   }
}
