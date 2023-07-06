<div>
    <div style="width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align: middle;">
        <h3>{l s='SMS Verification: ' mod='smscodeverification'}</h3>
    </div>

    <div style="width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align: middle;">
        <h3>{l s='Phone Number: ' mod='smscodeverification'}{$phone_number}</h3>
    </div>
    {* <hr style="height:1px;border-width:0;color:gray;background-color:gray"> *}
    <div style="width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align: middle;">

    </div>

    <div style=" width:40%; display: inline-block; margin: 2px; padding: 2px; vertical align:
        middle;">
        <h3 style="display: inline-block; vertical align:middle;">{l s='SMS Code: ' mod='smscodeverification'}</h3>
        <input type="text" name="sms_code" id="sms_code">
    </div>
    <div class="row buttons mb-2">
        <input class="btn btn-primary" type="button" id="send_code" value="{l s='Send SMS' mod='smscodeverification'}">
        <input class="btn btn-secondary" type="button" id="verify_code" value="{l s='Verify' mod='smscodeverification'}"
            disabled>
    </div>
</div>