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
        return responseData;
        // Handle the response data
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
}

function isCodeValid(email, phoneNumber, code, authKey, verifyUrl)
{
    const headers = {
        "Content-Type": "application/json",
        "x-request-secret": sha256(uuid + email + phoneNumber + code + authKey),
        "x-request-name": "buying-for-prezent-idealny-verify"
    };
    
    const body = {
        uuid: uuid,
        email: email,
        phone_number: phoneNumber,
        code: code
    };

    fetch(verifyUrl, {
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
        return responseData;
        // Handle the response data
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
}