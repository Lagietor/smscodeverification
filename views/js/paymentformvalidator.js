$(document).ready(function () {
    $('#send_code').click(function () {
        console.log('cookieee');
        document.cookie = "correctVerification=duuuupaaa; max-age=" + 60 * 60 * 24 * 7;
    })
});