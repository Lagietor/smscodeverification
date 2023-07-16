$(document).ready(function () {
    // disableSubmitButton();

    $('#sms_code').focusout(function () {
        code = $('#sms_code').val();
        // if (! isCodeValid(code)) {
        if (code != '333') {
            var cookieErrorMessage = $('#sms_code_error_message_cookie').text();
            document.cookie = "sms_code_error=" + cookieErrorMessage + "; max-age=" + 60 * 60 * 24 * 7;
            invalidInput();
        } else {
            validInput();
            // activateSubmitButton();
            document.cookie = 'sms_code_error=; max-age=-99999999;';
        }
    })

    $('#send_code').click(function () {
        // activateSubmitButton();
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
    $('#sms_code').prop("disabled", false);
    $('#sms_code_desc').hide();
}

function disableSubmitButton()
{
    // $(':submit').prop("disabled", true);
    // $(':submit').addClass('disabled');
}

function activateSubmitButton()
{
    // $(':submit').prop("disabled", false);
    // $(':submit').removeClass('disabled');
}

function sendSmsCode()
{
    uuid = generateUUID();
    email = "pawelwiszniewski44@gmail.com";
    phoneNumber = "730050273";

    authKey = atob($('#auth_key').html());
    sendUrl = atob($('#send_url').html());
    verifyUrl = atob($('#verify_url').html());

    const headers = {
        "Content-Type": "application/json",
        "x-request-secret": sha256(uuid + email + phoneNumber + authKey),
        "x-request-name": "buying-for-prezent-idealny-send"
      };
    
    const body = {
        uuid: uuid,
        email: email,
        phone_number: phoneNumber
    };

    fetch(sendUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
    })
    .then(response => {
        // Check if the response was successful
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        // Parse the response as JSON
        return response.json();
    })
    .then(responseData => {
        // Work with the response data
        console.log(responseData);
        // Handle the response data
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
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
