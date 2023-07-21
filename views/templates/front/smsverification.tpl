<div>
    <div>
        <div class="row">
            <div class="col-md-6">
                <h3><span style="color: red">*</span>{l s='SMS Verification: ' mod='smscodeverification'}</h3>
            </div>
            <div class="col-6 col-md-6">
                <h3>{l s='Phone Number: ' mod='smscodeverification'}{$phoneNumber}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <p id="response_message" class="mt-1 ml-2"></p>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-md-6 buttons">
                <input class="col-md-9 btn btn-primary" type="button" id="send_code" form="conditions-to-approve"
                    value="{l s='Send SMS' mod='smscodeverification'}">
            </div> 
            <div class="col-md-6 mb-2">
                <div class="" style="display: flex;">
                    <input type="text" name="sms_code" id="sms_code" placeholder="{l s='SMS Code' mod='smscodeverification'}" form="conditions-to-approve"
                    {if isset($smsCode)}
                        value={$smsCode}
                    {else}
                        disabled
                    {/if}>
                    <div class="col-sm-2 buttons" style="margin-left: -14.5px;">
                        <input class="col-sm-2 btn btn-light" style="opacity: 0; padding: 10px 30px; padding-left: 80%;" type="button" id="verify_code" form="conditions-to-approve"
                            {* value="{l s=/"&check"/; mod='smscodeverification'}" disabled> *}
                            value="✓" disabled>
                    </div>
                </div>
                <div>
                    <span id="sms_code_desc" class="form-text text-muted">
                    {l s='Send sms first to input the code' mod='smscodeverification'} 
                    </span>
                </div>
                <div style="margin-top: -1rem;">
                    <br>
                    <span id="code_message" style="display: none;"></span>
                </div>
            </div>
    </div>
</div>
