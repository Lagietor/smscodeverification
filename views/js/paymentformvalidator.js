function isExpired(expireDate)
{
    var currentDate = new Date();
    expireDate = new Date(expireDate);

    return (currentDate > expireDate);
}

function getEncryptedDataFromServer()
{
    nonce = getCookieValue('nonce');
    data = getCookieValue('data');
    encryptionKey = getCookieValue('encryptionKey');

    var nonce = Uint8Array.from(atob(nonce), c => c.charCodeAt(0));
    var encryptedData = Uint8Array.from(atob(data), c => c.charCodeAt(0));
    var encryptionKey = Uint8Array.from(atob(encryptionKey), c => c.charCodeAt(0));

    var decryptedData = nacl.secretbox.open(encryptedData, nonce, encryptionKey);
    var jsonData = decryptedData ? new TextDecoder().decode(decryptedData) : null;

    // [0] => phoneNumber, [1] => email, [2] => authKey, [3] => sendUrl, [4] => verifyUrl
    return jsonData ? JSON.parse(jsonData) : null;
}

function getCookieValue(name) 
{
    var cookieString = document.cookie;

    var cookieArr = cookieString.split(';');
  
    for (let i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split('=');
      var cookieName = cookiePair[0].trim();
  
      if (cookieName === name) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
  
    return null;
}

function generateUUID()
{
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
