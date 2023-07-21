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

    if ((!getCookieValue('verified') && $('#sms_code').val() !== '') || getCookieValue('sms_code') == '') {
        showErrorCodeMessage(getCookieValue('sms_code_error'));
        activeVerifyButton();
        activateInput();
        invalidInputFocusOut();
        badVerifyButton();
        correctCode = 0;
    } else if (getCookieValue('verified') && isExpired(getCookieValue('expiry_at'))) {
        showErrorCodeMessage(getCookieValue('sms_code_error'));
        activeVerifyButton();
        activateInput();
        invalidInputFocusOut();
        badVerifyButton();
        correctCode = 1;
        activeCode = 0;
    } else if (getCookieValue('verified')) {
        disableInput();
        $('#sms_code_desc').hide();
        showCorrectCodeMessage(getCookieValue('verified'));
        document.cookie = 'sms_code_error=; max-age=-99999999;';
        disableVerifyButton();
        validInputFocusOut();
        goodVerifyButton();
        correctCode = 1;
        activeCode = 1;
    } else if (!getCookieValue('expiry_at')) {
        disableInput();
        disableVerifyButton();
    }

    $('#send_code').click(function () {
        activateInput();
        $('#response_message').show();
        sendSmsCode(uuid, email, phoneNumber, authKey, sendUrl);
    })

    $('#verify_code').click(function () {
        code = $('#sms_code').val();
        expiryAt = getCookieValue('expiry_at');
        document.cookie = "sms_code=" + code + "; max-age=" + 60 * 60 * 24 * 7 + "; path=/; domain=" + window.location.hostname;

        isCodeValid(email, phoneNumber, code, authKey, verifyUrl, function (state, message) {
            if (! state) {
                correctCode = 0;
                invalidInputFocusOut();
                badVerifyButton();
                document.cookie = "sms_code_error=" + message + "; max-age=" + 60 * 60 * 24 * 7;
                return;
            }

            if (isExpired(expiryAt)) {
                activeCode = 0;
                correctCode = 1;
                invalidInputFocusOut();
                badVerifyButton();
                document.cookie = "sms_code_error=" + message + "; max-age=" + 60 * 60 * 24 * 7;
                return;
            }

            goodVerifyButton();
            validInputFocusOut();
            hideErrorMessages();
            disableVerifyButton();
            disableInput();
            showCorrectCodeMessage(message);
            document.cookie = 'sms_code_error=; max-age=-99999999;';
            activeCode = 1;
            correctCode = 1;
            document.cookie = "verified=" + message + "; max-age=" + 60 * 60 * 24 * 7 + "; path=/; domain=" + window.location.hostname;
        });
    })

    $('#sms_code').focusout(function () {
        if (correctCode == 0 || activeCode == 0) {
            invalidInputFocusOut();
            return;
        } else if (correctCode == 1 && activeCode == 1) {
            validInputFocusOut();
        }
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

});