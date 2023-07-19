
function validInputFocusOut()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #53d572");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#cbf2d4");
}

function invalidInputFocusOut()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #f59990");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#f2dede");
}

function validInputFocus()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #53d572");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#b8f2b3");
}

function invalidInputFocus()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #f59990");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#f7bdb7");
}

function activateInput()
{
    $('#sms_code').prop("disabled", false);
    $('#sms_code_desc').hide();
}

function showWrongCodeMessage()
{
    $('#wrong_code_error_message').show();
    $('#expired_code_error_message').hide();
    $('#wrong_code_error_message').css("color", "red");
}

function showExpiredCodeMessage()
{
    $('#expired_code_error_message').show();
    $('#wrong_code_error_message').hide();
    $('#expired_code_error_message').css("color", "red");    
}

function hideErrorMessages()
{
    $('#wrong_code_error_message').hide();
    $('#expired_code_error_message').hide();
}

// function disableSubmitButton()
// {
//     $(".btn.btn-primary.center-block").prop("disabled", true);
//     $(".btn.btn-primary.center-block").addClass('disabled');
// }

// function activateSubmitButton()
// {
//     $(".btn.btn-primary.center-block").prop("disabled", false);
//     $(".btn.btn-primary.center-block").removeClass('disabled');
// }