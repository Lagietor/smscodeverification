function sendSmsCode(uuid, email, phoneNumber, authKey, sendUrl)
{
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

    $.ajax({
        url: sendUrl,
        method: "POST",
        headers: headers,
        data: JSON.stringify(body),
        dataType: "json",
        success: function (response) {
            console.log("Response:", response);
            const {expiry_at, message} = response;

            document.cookie = "expiry_at=" + expiry_at + "; max-age=" + 60 * 60 * 24 * 7 + "; path=/; domain=" + window.location.hostname;
            activeVerifyButton();
            $("#response_message").html(message);
            $('#expiry_at').html(expiry_at);
        },
        error: function (xhr, status, error) {
            if (xhr.responseJSON.message) {
                $("#response_message").html(xhr.responseJSON.message);
                $('#response_message').css("color", "red");
            } else {
                $("#response_message").html("Nie można wysłać kodu, proszę spróbować ponownie");
                $('#response_message').css("color", "red");
            }
        },
    });

}

function isCodeValid(email, phoneNumber, code, authKey, verifyUrl, _callback)
{
    const headers = {
        "Content-Type": "application/json",
        "x-request-secret": sha256(uuid + email + phoneNumber + code + authKey),
        "x-request-name": "buying-for-prezent-idealny-send"
    };
    
    const body = {
        uuid: uuid,
        email: email,
        phone_number: phoneNumber,
        code: code
    };

    $.ajax({
        url: verifyUrl,
        method: "POST",
        headers: headers,
        data: JSON.stringify(body),
        dataType: "json",
        success: function (response) {
            console.log("Response:", response);
            const {message} = response;

            console.log(message);
            showCorrectCodeMessage(message);
            _callback(true, message);
        },
        error: function (xhr, status, error) {
            if (xhr.responseJSON.message) {
                showErrorCodeMessage(xhr.responseJSON.message);
            } else {
                showErrorCodeMessage('Nie można zweryfikować kodu, proszę spróbować ponownie')
            }
            _callback(false, xhr.responseJSON.message);
        },
    });

    // fetch(sendUrl, {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify(body)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(response.statusText || 'Network response was not ok');
    //         }
    //         // Parse the response as JSON
    //         return response.json();
    //     })
    //         .then(responseData => {
    //         // Work with the successful response data
    //         $("#response_message").html(responseData.message);
    //         $('#response_message').css("color", "#53d572");
    //         $('#expiry_at').html(responseData.expiry_at);
    //         activeVerifyButton();
    //         console.log(responseData);
    //         return responseData;
    //     })
    //     .catch(error => {
    //         // Handle any errors
    //         console.error('Error:', error);
    //         if (error) {
    //             $("#response_message").html(error);
    //         } else {
    //             $("#response_message").html('Nie można wysłać kodu, proszę spróbować ponownie');
    //         }
            
    //         throw error;
    //     });
    // fetch(verifyUrl, {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(body)
    // })
    // .then(response => {
    //     // Check if the response was successful
    //     if (!response.ok) {
    //         throw new Error(response.json());
    //     }
    //     // Parse the response as JSON
    //     return response.json();
    // })
    // .then(responseData => {
    //     // Work with the response data
    //     console.log(responseData);
    //     showCorrectCodeMessage(responseData.message);
    //     _callback(false);
    //     return responseData;
    //     // Handle the response data
    // })
    // .catch(error => {
    //     console.log(error.message);
    //     return error.message;
    // })
    // .then(responseData => {
    //     console.log(responseData);
    //     if (responseData.message) {
    //         showErrorCodeMessage(responseData.message);
    //     } else {
    //         showErrorCodeMessage('Nie można zweryfikować kodu, proszę spróbować ponownie')
    //     }
    //     _callback(false);
    // });
}
