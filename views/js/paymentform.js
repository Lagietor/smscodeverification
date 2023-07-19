var correctCode;
var activeCode;

$(document).ready(function () {
    data = getEncryptedDataFromServer();

    uuid = generateUUID();
    var phoneNumber = data[0];
    var email = data[1];
    var authKey = data[2];
    var sendUrl = data[3];
    var verifyUrl = data[4];

    if (($('#sms_code').val() != '333' && $('#sms_code').val() !== '') || getCookieValue('sms_code') == '') {
        activateInput();
        invalidInputFocusOut();
        showWrongCodeMessage();
        correctCode = 0;
    } else if (isExpired('2023-07-19 18:00:00')) {
        activateInput();
        invalidInputFocusOut();
        showExpiredCodeMessage();
        correctCode = 1;
        activeCode = 0;
    } else if ($('#sms_code').val()) {
        activateInput();
        validInputFocusOut();
        hideErrorMessages();
        correctCode = 1;
        activeCode = 1;
    }

    $('#sms_code').focusout(function () {
        code = $('#sms_code').val();
        document.cookie = "sms_code=" + code + "; max-age=" + 60 * 60 * 24 * 7 + "; path=/; domain=" + window.location.hostname;
        // if (! isCodeValid(email, phoneNumber, code, authKey, verifyUrl)) {
        if (code != '333') {
            var cookieErrorMessage = $('#wrong_code_error_message_cookie').text();
            document.cookie = "sms_code_error=" + cookieErrorMessage + "; max-age=" + 60 * 60 * 24 * 7;
            correctCode = 0;
            invalidInputFocusOut();
            showWrongCodeMessage();

            return;
        }

        if (isExpired('2023-07-19 18:00:00')) {
            var cookieErrorMessage = $('#expired_code_error_message_cookie').text();
            document.cookie = "sms_code_error=" + cookieErrorMessage + "; max-age=" + 60 * 60 * 24 * 7;
            activeCode = 0;
            correctCode = 1;
            invalidInputFocusOut();
            showExpiredCodeMessage();

            return;
        }

        validInputFocusOut();
        hideErrorMessages();
        activeCode = 1;
        correctCode = 1;
        document.cookie = 'sms_code_error=; max-age=-99999999;';
    })

    $('#sms_code').focus(function () {
        if (correctCode == 1 && activeCode == 1) {
            validInputFocus()
            hideErrorMessages();
        } else if (correctCode == 0) {
            invalidInputFocus();
            showWrongCodeMessage();
        } else if (activeCode == 0) {
            invalidInputFocus();
            showExpiredCodeMessage();
        }
    })

    $('#send_code').click(function () {
        activateInput();
        sendSmsCode(uuid, email, phoneNumber, authKey, sendUrl);
    })
});