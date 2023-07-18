$(document).ready(function () {
    data = getEncryptedDataFromServer();

    uuid = generateUUID();
    var phoneNumber = data[0];
    var email = data[1];
    var authKey = data[2];
    var sendUrl = data[3];
    var verifyUrl = data[4];

    $('#sms_code').focusout(function () {
        code = $('#sms_code').val();
        // if (! isCodeValid(email, phoneNumber, code, authKey, verifyUrl)) {
        if (code != '333') {
            var cookieErrorMessage = $('#wrong_code_error_message_cookie').text();
            console.log(cookieErrorMessage);
            document.cookie = "sms_code_error=" + cookieErrorMessage + "; max-age=" + 60 * 60 * 24 * 7;
            invalidInput();
            return;
        }

        if (isExpired('2023-07-18 18:00:00')) {
            var cookieErrorMessage = $('#expired_code_error_message_cookie').text();
            console.log(cookieErrorMessage);
            document.cookie = "sms_code_error=" + cookieErrorMessage + "; max-age=" + 60 * 60 * 24 * 7;
            expiredInput();
            return;
        }

        validInput();
        document.cookie = 'sms_code_error=; max-age=-99999999;';
    })

    $('#send_code').click(function () {
        sendActionStyle();
        sendSmsCode(uuid, email, phoneNumber, authKey, sendUrl);
    })
});