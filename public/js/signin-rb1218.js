
function initSignin(){

	$("#login").panel({bgTopClass:'p-bg-hdrblu-lrg p-hdr-lrg', contentClass:'modulebox'});		
	$("#register").panel({bgTopClass:'p-bg-hdrgry-lrg p-hdr-lrg', contentClass:'modulebox'});
	$("#signinForm").validate({					
		rules: $.stubhub.defaultValidation.loginRules,
		messages: $.stubhub.defaultValidation.loginMessages	
	});
}

function initRegister(){
	var validChars = function(value,element) {
		
		var validChars = /^[A-Za-z ^'-]{1,50}$/;
		
		if(validChars.test(value))	{
			return true;
		}
		else{
			$('#password, #rePassword').val('');
			return false;
		}
};
 
/* Method for first and last name validation */
jQuery.validator.addMethod("validLastNameChars",validChars,validLastNameMessage);

jQuery.validator.addMethod("validFirstNameChars",validChars,validFirstNameMessage);

	$("#registerForm").validate({	
		rules: $.stubhub.defaultValidation.registerRules,
		messages: $.stubhub.defaultValidation.registerMessages,
		submitHandler: function(form) {
		// do rewards tracking, and set time out for omniture catching before page refresh
			if ($('#joinrewards').is(":checked")) {
				try {
					if (typeof s != "undefined") {
						s.linkTrackVars="prop61,prop62,prop63,events";
						s.linkTrackEvents="event39";						
						s.events="event39";
						s.prop61 = "Rewards : Full Registeration : Join Rewards Checkbox Checked";
						s.prop62 = "Rewards : Join Rewards Checkbox Checked";
						s.prop63 = "Rewards : Full Registeration";
						s.t();
					}
				} catch (e) {}
			
				setTimeout(function(){
					form.submit();
				},250);
			} else {
				form.submit();
			}
		}	
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

//var initUserAgreementConfirm = function() {
//	var changeContinueBtnStatus = function() {

function changeContinueBtnStatus() {
	if ($('#userAgreement').is(':checked')) {
        $('#registerSubmit').removeClass('disabled-lrg').addClass('orange-lrg').removeAttr('disabled');
    } else {
        $('#registerSubmit').removeClass('orange-lrg').addClass('disabled-lrg').attr('disabled', 'disabled');
    }
	
	if ($('#stateTextBox').val() != ""){
		$('#state').val($('#stateTextBox').val());
	} else {
		$('#state').val($('#stateSelect option:selected').val());
	}
}

$('#userAgreement').live('click', function() {	
	changeContinueBtnStatus();
});

function trackRewardsEnrollment(prop61, prop62) {
		if (typeof s != "undefined") {
			s.prop61 = "Rewards:Enrollment:Registration:" + prop61;
			s.prop62 = prop62;
			s.prop63 = "Registration:Generic";
			s.t();
		}
	};
	
$('#terms').click(function (e) {
	trackRewardsEnrollment('Terms','Full Site Link Click');
});        

$('#jrLink').click(function (e) {
	trackRewardsEnrollment('About','Link:Hover');
	e.preventDefault();
});

$('#joinrewards').click(function(){
	if ($(this).is(":checked")) {
		$('#birthMonthField').show();
	} else {
		$('#birthMonthField').hide();
	}
});
