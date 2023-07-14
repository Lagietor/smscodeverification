<div>
    <div>
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
        <div class="row">
            <div class="col-md-6">
                <h3><span style="color: red">*</span>{l s='SMS Verification: ' mod='smscodeverification'}</h3>
            </div>
            <div class="col-6 col-md-6">
                <h3>{l s='Phone Number: ' mod='smscodeverification'}{$phone_number}</h3>
                {* <h3 id="phone_number" style="display: none" ;>{$phone_number}</h3>
                <h3 id=" email" style="display: none">{$email}</h3> *}
            </div>
        </div>

        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
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
        <!-- Columns are always 50% wide, on mobile and desktop -->
    </div>




    {* TODO: do renowacji, zmiana style na bootstrap klasy *}
    {* <div class="row">
        <div class="col-md-6">
            <h3><span style="color: red">*</span>{l s='SMS Verification: ' mod='smscodeverification'}</h3>
        </div>
        <div class="col-md-6">
            <h3>{l s='Phone Number: ' mod='smscodeverification'}{$phone_number}</h3>
            <h3 id="phone_number" style="display: none" ;>{$phone_number}</h3>
            <h3 id=" email" style="display: none">{$email}</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6">
            <h3>{l s=' SMS Code: ' mod='smscodeverification'}</h3>
            <input type="text" name="sms_code" id="sms_code" disabled>
            <span id="sms_code_desc" class="form-text text-muted">
                {l s='Send sms first to input the code' mod='wishdeliveryselection'} </span>
            <span name="sms_code_error_message" id="sms_code_error_message"
                style="display: none">{l s='Invalid code' mod='wishdeliveryselection'}</span>
        </div>
    </div>
    <div class="row buttons mb-2">
        <input class="col-md-6 btn btn-primary" type="button" id="send_code"
            value="{l s='Send SMS' mod='smscodeverification'}">
        <input class="col-md-6 btn btn-secondary" type="button" id="verify_code"
            value="{l s='Verify' mod='smscodeverification'}" disabled>
    </div>
</div> *}