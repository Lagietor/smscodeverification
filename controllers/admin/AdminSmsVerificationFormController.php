<?php

require_once(_PS_MODULE_DIR_ . 'smscodeverification/smscodeverification.php');
require_once(_PS_MODULE_DIR_ . 'smscodeverification/classes/SmsCodeVerificationFormList.php');
require_once(_PS_MODULE_DIR_ . 'smscodeverification/classes/DbProductOptionsManagement.php');
require_once(_PS_MODULE_DIR_ . 'smscodeverification/classes/SmsConfHelper.php');

class AdminSmsVerificationFormController extends ModuleAdminController
{
    public function __construct()
    {
        $this->bootstrap = true;
        $this->table = 'smscodeverification_product_list';
        $this->className = 'SmsCodeVerificationFormList';
        $this->lang = false;
        $this->explicitSelect = true;
        $this->allow_export = true;
        $this->deleted = false;
        $this->identifier = 'id_product';
        $this->bulk_actions = true;
        $this->addRowAction('view');

        parent::__construct();

        $this->fields_list = [
            'id_product' => [
                'title' => $this->module->l('ID'),
                'width' => 120,
                'type' => 'text',
                'search' => false,
                'orderby' => false,
                'remove_onclick' => true
            ],
            'product_name' => [
                'title' => $this->module->l('Product'),
                'width' => 120,
                'type' => 'text',
                'search' => true,
                'orderby' => false,
                'remove_onclick' => true
            ],
            'category_name' => [
                'title' => $this->module->l('Category'),
                'width' => 140,
                'type' => 'text',
                'search' => true,
                'orderby' => false,
                'remove_onclick' => true
            ],
            'sms_authentication' => [
                'title' => $this->module->l('SMS Authentication'),
                'width' => 100,
                'type' => 'bool',
                'search' => false,
                'orderby' => true,
                'remove_onclick' => true,
                'activeVisu' => 'new_window'
            ]
        ];
    }

    public function init()
    {
        parent::init();
    }

    public function initContent()
    {
        $this->context->smarty->assign([
            'sms_authentication' => Configuration::get(Smscodeverification::SMS_AUTHENTICATION),
            'authentication_key' => Configuration::get(Smscodeverification::AUTHENTICATION_KEY),
            'send_code_url' => Configuration::get(Smscodeverification::SEND_CODE_URL),
            'verify_code_url' => Configuration::get(Smscodeverification::VERIFY_CODE_URL),
        ]);

        parent::initContent();

        $apiDataForm = $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'smscodeverification/views/templates/admin/apidataform.tpl');
        $smsAuthenticationForm = $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'smscodeverification/views/templates/admin/productsmsselection.tpl');

        $this->context->smarty->assign([
            'content' => $this->content . $smsAuthenticationForm . $apiDataForm,
        ]);

        if ((((bool)Tools::isSubmit('SmsActivationFormSubmit')) == true)) {
            Configuration::updateValue(Smscodeverification::SMS_AUTHENTICATION, Tools::getValue('sms_authentication'));

            $productOptions = new DbProductOptionsManagement();

            if (Tools::getValue('smscodeverification_product_listBox')) {
                if (
                    $productOptions->setOptions(
                        Tools::getValue('smscodeverification_product_listBox'),
                        Tools::getValue('sms_authentication')
                    )
                ) {
                    $this->confirmations[] = ($this->l('Product data was saved successfully'));
                }
            } else {
                $this->errors[] = ($this->l('There is nothing to add'));
            }
        }

        if ((((bool)Tools::isSubmit('SmsAuthenticationDataFormSubmit')) == true)) {
            Configuration::updateValue(Smscodeverification::AUTHENTICATION_KEY, Tools::getValue('authentication_key'));
            Configuration::updateValue(Smscodeverification::SEND_CODE_URL, Tools::getValue('send_code_url'));
            Configuration::updateValue(Smscodeverification::VERIFY_CODE_URL, Tools::getValue('verify_code_url'));

            $this->confirmations[] = ($this->l('Api data was saved successfully'));
        }
    }
}
