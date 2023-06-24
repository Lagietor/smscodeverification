<div class="panel col-lg-12">
    <div class="panel-heading"> 
        {l s='Choose SMS authentication' mod='smscodeverification'} 
    </div>
    <p>{$sms_authentication}</p>
    <label name="">
        <input type="checkbox" name="sms_authentication" value="true" form="form-smscodeverification_product_list"
            {if $sms_authentication == "true"}
                checked
            {/if}>
        {l s='Enable Sms Authentication' mod='smscodeverification'}
    </label>
    <br>
    <div class="panel-footer">
        <input type="submit" class="btn btn-default pull-right" name="submitSmsCodeselectionModule" value="{l s='Save' mod='smscodeverification'}" form="form-smscodeverification_product_list">
    </div>
</div>
