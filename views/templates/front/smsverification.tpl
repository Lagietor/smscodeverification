<div>
    {* TODO: do renowacji, zmiana style na bootstrap klasy *}
    <div style="width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align: middle;">
        <h3><span style="color: red">*</span>{l s='SMS Verification: ' mod='smscodeverification'}</h3>
    </div>

    <div style="width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align: middle;">
        <h3> {l s='Phone Number: ' mod='smscodeverification'}{$phoneNumber} </h3>
    </div>
    <div style="width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align: middle;">
    {* po co tu jest ten div??? *}
    </div>

    <div style=" width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align:middle;">
        <h3 style="display: inline-block; vertical align:middle;">{l s='SMS Code: ' mod='smscodeverification'}</h3>
        <input type="text" name="sms_code" id="sms_code" disabled>
        <span id="sms_code_desc" class="form-text text-muted"> {l s='Send sms first to input the code' mod='wishdeliveryselection'} </span>
        <span name="sms_code_error_message" id="sms_code_error_message" style="display: none">{l s='Invalid code' mod='wishdeliveryselection'}</span>
    </div>
    <div class="row buttons mb-2">
        <input class="btn btn-primary" type="button" id="send_code" value="{l s='Send SMS' mod='smscodeverification'}">
        {* <input class="btn btn-secondary" type="button" id="verify_code" value="{l s='Verify' mod='smscodeverification'}" *}
    </div>

    <div hidden>
        <p id="auth_key"> {$authKey} </p>
        <p id="send_url">  {$sendUrl} </p>
        <p id="verify_url"> {$verifyUrl} </p>
    </div>
</div>