<div>
    <div>
        <div class="row">
            <div class="col-md-6">
                <h3><span style="color: red">*</span>{l s='SMS Verification: ' mod='smscodeverification'}</h3>
            </div>
            <div class="col-6 col-md-6">
                <h3>{l s='Phone Number: ' mod='smscodeverification'}{$phone_number}</h3>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-md-6 buttons mb-2">
                <input class="col-md-9 btn btn-primary" type="button" id="send_code"
                    value="{l s='Send SMS' mod='smscodeverification'}">
            </div>
            <div class="col-md-6">
                <input type="text" name="sms_code" id="sms_code" placeholder="{l s=' SMS Code: ' mod='smscodeverification'}" disabled>
                <span id="sms_code_desc" class="form-text text-muted">
                    {l s='Send sms first to input the code' mod='wishdeliveryselection'} </span>
                <span name="sms_code_error_message" id="sms_code_error_message"
                    style="display: none">{l s='Invalid code' mod='wishdeliveryselection'}</span>
            </div>
        </div>
    </div>