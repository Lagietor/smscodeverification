<form method="POST">
    <div class="panel col-lg-12">
        <div class="panel-heading"> 
            {l s='Set Api authentication data' mod='smscodeverification'} 
        </div>
        <div class="form-group">
            <label for="authentication_key"> {l s='Authentication key' mod='smscodeverification'} </label>
            <input type="text" class="form-control" name="authentication_key" 
            {if isset($authentication_key)}
                value="{$authentication_key}"
            {/if}>
        </div>
        <div class="form-group">
        <label for="send_code_url"> {l s='Send Code Url' mod='smscodeverification'} </label>
            <input type="text" class="form-control" name="send_code_url" 
            {if isset($send_code_url)}
                value="{$send_code_url}"
            {/if}>
    </div>
        <div class="form-group">
            <label for="send_code_url"> {l s='Verify Code Url' mod='smscodeverification'} </label>
            <input type="text" class="form-control" name="verify_code_url" 
            {if isset($verify_code_url)}
                value="{$verify_code_url}"
            {/if}>
        </div>
        {* <div class="form-group">
            <label name="authentication_key" class="col-xs-4">
                {l s='Authentication key' mod='smscodeverification'}
                <input type="text" class="form-control" name="authentication_key"
                    {if isset($authentication_key)}
                        value="{$authentication_key}"
                    {/if}>
            </label>
        </div>
        <br><br>
        <div class="form-group">
            <label name="send_code_url" class="col-xs-4">
                {l s='Send Code Url' mod='smscodeverification'}
                <input type="text" name="send_code_url"
                    {if isset($send_code_url)}
                        value="{$send_code_url}"
                    {/if}>
            </label>
        </div>
            <br><br>
            <label name="verify_code_url" class="col-xs-4">
                {l s='Verify Code Url' mod='smscodeverification'}
                <input type="text" name="verify_code_url"
                    {if isset($verify_code_url)}
                        value="{$verify_code_url}"
                    {/if}>
            </label>
            <br>
        </div> *}
        <div class="panel-footer">
            <input type="submit" class="btn btn-default pull-right" name="SmsAuthenticationDataFormSubmit" value="{l s='Save' mod='smscodeverification'}">
        </div>
    </div>
</form>
