$(document).ready(function () {
    disableSubmitButton();

    $('#sms_code').focusout(function () {
        code = $('#sms_code').val();
        // if (! isCodeValid(code)) {
        if (code != '333') {
            // TODO: dodać translacje wiadomości błędu w JS
            document.cookie = "sms_code_error=Wrong code; max-age=" + 60 * 60 * 24 * 7;
            invalidInput();
        } else {
            validInput();
            // activateSubmitButton();
            document.cookie = 'sms_code_error=; max-age=-99999999;';
        }
    })

    $('#send_code').click(function () {
        // activateSubmitButton();
        // getDataAjax();
        sendActionStyle();
        sendSmsCode();
    })
});

function validInput()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #53d572");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#b8f2b3");
    $('#sms_code_error_message').hide();
}

function invalidInput()
{
    $('#sms_code').css("outline", "none");
    $('#sms_code').css("border", "3px solid #f59990");
    $('#sms_code').css("transition", "0.5s");
    $('#sms_code').css("background-color", "#f7bdb7");
    $('#sms_code_error_message').show();
    $('#sms_code_error_message').css("color", "red");
}

function sendActionStyle()
{
    $('#verify_code').prop("disabled", false);
    $('#sms_code').prop("disabled", false);
    $('#verify_code').removeClass('btn-secondary');
    $('#verify_code').css("transition", "0.5s");
    $('#verify_code').addClass('btn-primary');
    $('#sms_code_desc').hide();
}

function disableSubmitButton()
{
    $(':submit').prop("disabled", true);
    $(':submit').addClass('disabled');
}

function activateSubmitButton()
{
    $(':submit').prop("disabled", false);
    $(':submit').removeClass('disabled');
}

function sendSmsCode()
{
    uuid = generateUUID();
    email = "pawelwiszniewski44@gmail.com";
    phoneNumber = "730050273";

    authKey = atob($('#auth_key').html());
    sendUrl = atob($('#send_url').html());
    verifyUrl = atob($('#verify_url').html());

    fetch("https://apitest.boncard.pl/api/authenticator/sms/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-request-secret": sha256(uuid + email + phoneNumber + authKey),
            "x-request-name": "buying-for-prezent-idealny-send"
        },
        body: JSON.stringify({
            uuid: uuid,
            email: email,
            phone_number: phoneNumber
        })
    })
    .then(data => console.log(data))
    // .then(data => console.log(data))
}

function isCodeValid(code)
{
    return true;
}

function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function getDataAjax()
{
    fetch('apidataajax.php')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}
