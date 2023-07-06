$(document).ready(function () {
    $('#verify_code').click(function () {
        value = $('#sms_code').val();
        if (value != 333) {
            document.cookie = "smscode_error=wrong_code; max-age=" + 60 * 60 * 24 * 7;
            InvalidInputFocused();
        } else {
            // console.log('dupa');
            ValidInputFocused();
        }
    })
    $('#send_code').click(function () {
        console.log('cookieee');
        $('#verify_code').prop("disabled", false);
        document.cookie = "correctVerification=duuuupaaa; max-age=" + 60 * 60 * 24 * 7;
    })
});

function ValidInputFocused() {
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #53d572");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#b8f2b3");
    $('#sms_code' + '_error_message').hide();
}

function InvalidInputFocused() {
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #f59990");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#f7bdb7");
    $('#sms_code' + '_error_message').show();
    $('#sms_code' + '_error_message').css("color", "red");
}