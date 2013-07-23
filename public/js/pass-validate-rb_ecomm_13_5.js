
;(function ($){
    $.stubhub = $.stubhub || {};
	
	$.stubhub.passValidator = {
		init : function (passwordS) {
			var that = this;
			that.passwordS = passwordS;
			
			// show passwork tooltip
			$(that.passwordS).focus(function(){
				$(".pswStrength").css("display","block");
				$(".pswField .tooltip").show();
			}).blur(function(){
				$(".pswField .tooltip").hide();
			});

			// Method for password validation: Used in Register page
			if (jQuery.validator && $.isFunction(jQuery.validator.addMethod)) {
				jQuery.validator.addMethod("passwordValidation", function(value, element) {
					var validationScore = that.countPswScore();
					return validationScore >= 2;
				});
			}
			
			//
			//$(that.passwordS).keyup(that.passwordKeyHandler);
			$(that.passwordS).bind('keyup',that.passwordKeyHandler());
	
		},
	
	
	  // password strength counting
	 countPswScore : function () {
		var that = this,
			score = 0,
		    str = $(that.passwordS).val(),
		    emailstr = $('#emailAddress').val();

		if (str.match(/[^\w!@#\$%^&\*()\+\-<>\/?~]/) || (str == emailstr && str != "")) {
			return score;
		} else {		
			if (str.length >= 8 && str.length <= 20) {
				if (str.match(/\d/)) { score++; }
				if (str.match(/[a-z]/)) { score++; }
				if (str.match(/[A-Z]/)) { score++; }
				if (str.match(/[_!@#\$%^&\*()\+\-<>\/?~]/)) { score++; }
				if (score == 3 && str.match(/[_!@#\$%^&\*()\+\-<>\/?~]/) && str.match(/[\d]/)) { score++; }
			} else if (str.length < 1){
				score = -1;
			} 
		}
		return score;
	},
	
	passwordKeyHandler : function () {
	   var that = this;
	   return function (e) {
			var title = $(".pswStrength .optional"),
				strength = $(".pswStrength .strength"),
				passwordScore = that.countPswScore();
			
			if (passwordScore == 2) {
				strength.attr("class","strength weak");
			} else if (passwordScore == 3) {
				strength.attr("class","strength medium");
			} else if (passwordScore == 4) {
				strength.attr("class","strength strong");
			}
			
			if (passwordScore >= 0 && passwordScore < 2) {
				title.text("invalid");
				strength.attr("class","strength invalid");	
			} else if ( passwordScore >= 2) {
				title.text("Password strength");
				strength.removeClass("invalid");
			} else if (passwordScore == -1 ) {
				title.text("Password strength");
				strength.attr("class","strength");	
			}
	  };
	}
 }
	
})(jQuery);


