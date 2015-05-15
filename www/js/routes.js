$(document).ready(function () { ml.routes.load(); $.mobile.changePage(ml.routes.sign_in()); });

ml.routes = {

   load: function () {
   	ml.routes.dynamic_route();
   	ml.routes.beforeAction();
      ml.routes.sign_in();
      ml.routes.sign_up();
      ml.routes.index();
      ml.routes.doubts();
   },

   
   beforeAction: function () {
      $(document).bind("pagebeforechange", function ( event , data ) {

         if(typeof data.toPage !== "object") {
        		/*

        		pega url absoluta pra qual está sendo redirecionada
	         data.AbsUrl 

        		Mudar rota de redirecionamento
	         data.ToPage = novaUrl
	         
	         Recupera id da página quebrando a url do link
	         var arrayUrl = data.absUrl.split("#");
	         var page = "#"+arrayUrl[1];

				seta novaUrl para a nova rota depois de analisada
				var url = data.absUrl.replace(pattern, ml.routes.index());
	         data.toPage = url;
	        
	         var pattern =  /#.*[a-z]/i ;
	         if(ml.session.getItem("authorization") === 'false' && page === ml.routes.sign_in() || page === ml.routes.sign_up()){
	         	return true;
	         } else if (ml.session.getItem("authorization") === 'true' && page === ml.routes.sign_in() || page === ml.routes.sign_up()){
	         	
	         	alert('aqquiii');
	         	var url = data.absUrl.replace(pattern, ml.routes.index());
	         	data.toPage = url;
	         	return true;
	         } else if(ml.session.getItem("authorization") === 'true' && page !== ml.routes.sign_in() || page !== ml.routes.sign_up()) {
	         	console.log(ml.session.getItem("authorization"));
	         	var url = data.absUrl.replace(pattern, page);
	         	data.toPage = url;
	         	return true;
	         }
	         return false;

			*/
		}
	   return false;    
   },

   mount_route: function (absUrl, toPage) {

   },

   dynamic_route: function (toPage) {

   },

   sign_in: function () {
   	return '#page-sign-in';	
   }, 

   sign_up: function () {
   	return '#page-sign-up';
   },

   index: function () {
   	return '#page-logged-1';
   },

   doubts: function () {
   	return '#doubt';
   }
}