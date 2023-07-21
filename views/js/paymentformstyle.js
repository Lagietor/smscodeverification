
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

function disableInput()
{
    $('#sms_code').prop("disabled", true);
}

function activeVerifyButton()
{
    $('#verify_code').prop("disabled", false);
    $('#verify_code').removeClass('disabled');
    $('#verify_code').css("transition", "0.5s");
    $('#verify_code').css("opacity", 100);
}

function disableVerifyButton()
{
    $('#verify_code').prop("disabled", true);
    $('#verify_code').css("transition", "0.5s");
}

function badVerifyButton()
{
    $('#verify_code').removeClass('btn-light');
    $('#verify_code').removeClass('btn-success');
    $('#verify_code').addClass('btn-danger');
    $('#verify_code').css("transition", "0.5s");
    $('#verify_code').css("opacity", 100);
}

function goodVerifyButton()
{
    $('#verify_code').removeClass('btn-light');
    $('#verify_code').removeClass('btn-danger');
    $('#verify_code').addClass('btn-success');
    $('#verify_code').css("transition", "0.5s");
    $('#verify_code').css("opacity", 100);
}

function showCorrectCodeMessage(message)
{
    $('#code_message').html(message);
    $('#code_message').css("color", "#53d572");
    $('#code_message').show();
}

function showErrorCodeMessage(message) 
{
    $('#code_message').html(message);
    $('#code_message').css("color", "red");
    $('#code_message').show();
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
    $('#code_message').hide();
}

// DOBRY IDEA blokujemy checkbox!!!

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