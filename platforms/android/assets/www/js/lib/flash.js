ml.flash = {

   error: function (page, message) {
      ml.flash.clear();
      var flash = '<div class="flash error">'+ message +'</div>';
      $(page).find("div[data-role=main]").prepend(flash);
   },

   success: function (page, message) {
      ml.flash.clear();
      var flash = '<div class="flash success">'+ message +'</div>';
      $(page).find("div[data-role=main]").prepend(flash);
   },

   info: function (page, message) {
      ml.flash.clear();
      var flash = '<div class="flash info">'+ message +'</div>';
      $(page).find("div[data-role=main]").prepend(flash);
   },

   clear: function () {
      $("div[data-role=main]").find('.flash').remove();
   }
};
