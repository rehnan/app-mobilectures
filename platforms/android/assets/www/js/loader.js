$(document).ready(function () { ml.loader.load(); });

ml.loader = {
	load: function () {
		ml.loader.show();
	},

	show: function () {
		
		    var $this = $("#show-page-loading-msg"),
		        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
		        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
		        textonly = !!$this.jqmData( "textonly" );
		        html = $this.jqmData( "html" ) || "ssssssssss";
		    $.mobile.loading( "show", {
		            text: msgText,
		            textVisible: textVisible,
		            textonly: textonly,
		            html: html
		    });
		
	}
};