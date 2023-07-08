$(document).ready(function () {
    $('#verify_code').click(function () {
        value = $('#sms_code').val();
        if (value != 333) {
            // TODO: dodać translacje wiadomości błędu w JS
            document.cookie = "smscode_error=Wrong code; max-age=" + 60 * 60 * 24 * 7;
            invalidInputFocused();
        } else {
            validInputFocused();
            document.cookie = 'smscode_error=; max-age=-99999999;';
        }
    })
    $('#send_code').click(function () {
        onPressedSendButton();
    })
});

function validInputFocused()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #53d572");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#b8f2b3");
    $('#sms_code_error_message').hide();
}

function invalidInputFocused()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #f59990");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#f7bdb7");
    $('#sms_code_error_message').show();
    $('#sms_code_error_message').css("color", "red");
}

function onPressedSendButton()
{
    $('#verify_code').prop("disabled", false);
    $('#sms_code').prop("disabled", false);
    $('#verify_code').removeClass('btn-secondary');
    $('#verify_code').css("transition", "0.5s");
    $('#verify_code').addClass('btn-primary');
    $('#sms_code_desc').hide();
}

function sendSmsCode()
{
    // TODO: create AJAX request to send SMS code
}

function isCodeValid(code)
{
    // TODO: check if the code is correct 
}