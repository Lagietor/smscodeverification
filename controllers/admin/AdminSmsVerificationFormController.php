<?php

require_once(_PS_MODULE_DIR_ . 'smscodeverification/smscodeverification.php');
require_once(_PS_MODULE_DIR_ . 'smscodeverification/classes/SmsCodeVerificationFormList.php');
require_once(_PS_MODULE_DIR_ . 'smscodeverification/classes/DbProductOptionsManagement.php');

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
        parent::initContent();

        $content = $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'smscodeverification/views/templates/admin/productsmsselection.tpl');

        // dump(Configuration::get(Smscodeverification::SMS_AUTHENTICATION));
        // die;
        // TODO: naprawić system zapamiętywania poprzedniej opcji

        $this->context->smarty->assign([
            'content' => $this->content . $content,
            'sms_authentication' => Configuration::get(Smscodeverification::SMS_AUTHENTICATION)
        ]);

        if (((bool)Tools::isSubmit('submitSmsCodeselectionModule')) == true) {
            Configuration::updateValue(Smscodeverification::SMS_AUTHENTICATION, Tools::getValue('sms_authentication'));

            $productOptions = new DbProductOptionsManagement();

            if (Tools::getValue('smscodeverification_product_listBox')) {
                if (
                    $productOptions->setOptions(
                        Tools::getValue('smscodeverification_product_listBox'),
                        Tools::getValue('sms_authentication')
                    )
                ) {
                    $this->confirmations[] = ($this->l('Data was saved successfully'));
                }
            } else {
                $this->errors[] = ($this->l('There is nothing to add'));
            }
        }
    }
}
