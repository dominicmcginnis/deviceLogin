
function initSignin(){

	$("#login").panel({bgTopClass:'p-bg-hdrblu-lrg p-hdr-lrg', contentClass:'modulebox'});		
	$("#register").panel({bgTopClass:'p-bg-hdrgry-lrg p-hdr-lrg', contentClass:'modulebox'});
	$("#signinForm").validate({					
		rules: $.stubhub.defaultValidation.loginRules,
		messages: $.stubhub.defaultValidation.loginMessages
	});
}

function initRegister(){

	/* Method for password validation: Used in Register page */
	jQuery.validator.addMethod("passwordValidation", function(value,element) {

		var validationPassword = $('#rePassword'),
		validationPasswordValue = $('#rePassword').val();

		if(value === '' || value.length < 6 || value.length > 20 
			|| validationPasswordValue === '' || validationPasswordValue.length < 6 || validationPasswordValue.length > 20
			|| value !== validationPasswordValue)	{
			$('<label for="rePassword" class="error" style="display: block;">Enter a valid, matching password </label>').insertAfter(validationPassword);
			$('#password, #rePassword').val('');
			return false;
		}
		else	{
			return true;
		}
	},'Enter a valid, matching password');
	$("#registerForm").validate({	
		rules: $.stubhub.defaultValidation.registerRules,
		messages: $.stubhub.defaultValidation.registerMessages
	});
	var changeSubmitBtnStatus = function() {
	    if($('#userAgreement').is(':checked')) {
		$('#registerSubmit').removeClass('disabled-lrg').addClass('orange-lrg').removeAttr('disabled');
	    } else {
		$('#registerSubmit').removeClass('orange-lrg').addClass('disabled-lrg').attr('disabled', 'disabled');
	    }
	};

	$('#userAgreement').click(function()	{
		changeSubmitBtnStatus();
	});

	changeSubmitBtnStatus();
	/* Creating panels */
	$('#RegisterFormPane, #RegisterFormAgreementPane').panel({contentClass:'setFormattingContext registerPagePanels'});
	$('#alreadyRegisteredBox, #privacyContent').panel();
	
	$('#registerFormWrapper, #registerInfoWrapper').removeClass('p-offscreenOnLoad');
	
	$('#privacyPolicyOverlayTrigger').overlay();
	
		$('#stateInputType').livequery(function() {
					checkState();
	});
	
}

function initUserDeactivated(){
	$('#accountLockedErrorMessage').roundedCorners({wrapperClass:'rc-panel4 rc-panel4-all'});
}



	