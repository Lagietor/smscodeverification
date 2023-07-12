<?php

/**
 * 2007-2023 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    PrestaShop SA <contact@prestashop.com>
 *  @copyright 2007-2023 PrestaShop SA
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
require __DIR__ . '/classes/SmsForm.php';

if (!defined('_PS_VERSION_')) {
    exit;
}

class Smscodeverification extends Module
{
    protected $config_form = false;

    public const AUTHENTICATION_KEY = 'SMSCODEVERIFICATION_AUTHENTICATION_KEY';
    public const SEND_CODE_URL = 'SMSCODEVERIFICATION_SEND_CODE_URL';
    public const VERIFY_CODE_URL = 'SMSCODEVERIFICATION_VERIFY_CODE_URL';
    public const SMS_AUTHENTICATION = 'SMSCODEVERIFICATION_SMS_AUTHENTICATION';
    public const MODULE_ADMIN_CONTROLLER = 'AdminSmsVerificationForm';

    public function __construct()
    {
        $this->name = 'smscodeverification';
        $this->tab = 'checkout';
        $this->version = '1.0.0';
        $this->author = 'Pablo&Wiktor';
        $this->need_instance = 0;

        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Sms Code Verification');
        $this->description = $this->l('Adds new field to chosen products in delivery form to check sms code verification ');

        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
    }

    public function install()
    {
        include(dirname(__FILE__) . '/sql/install.php');

        Configuration::updateValue(self::SMS_AUTHENTICATION, 0);
        Configuration::updateValue(self::AUTHENTICATION_KEY, '');
        Configuration::updateValue(self::VERIFY_CODE_URL, 'https://apitest.boncard.pl/api/authenticator/sms/verify');
        Configuration::updateValue(self::SEND_CODE_URL, 'https://apitest.boncard.pl/api/authenticator/sms/send');

        return parent::install() &&
            $this->registerHook('displayPaymentTop') &&
            $this->registerHook('actionObjectOrderAddBefore') &&
            $this->registerHook('header') &&
            $this->registerHook('actionCarrierProcess') &&
            $this->installTabs();
    }

    public function uninstall()
    {
        include(dirname(__FILE__) . '/sql/uninstall.php');

        Configuration::deleteByName(self::SMS_AUTHENTICATION);
        Configuration::deleteByName(self::AUTHENTICATION_KEY);
        Configuration::deleteByName(self::VERIFY_CODE_URL);
        Configuration::deleteByName(self::SEND_CODE_URL);

        return parent::uninstall() &&
            $this->uninstallTabs();
    }

    public function installTabs()
    {
        if (Tab::getIdFromClassName(static::MODULE_ADMIN_CONTROLLER)) {
            return true;
        }

        $tab = new Tab();
        $tab->class_name = static::MODULE_ADMIN_CONTROLLER;
        $tab->module = $this->name;
        $tab->active = true;
        $tab->id_parent = -1;
        $tab->name = array_fill_keys(
            Language::getIDs(false),
            $this->displayName
        );

        return $tab->add();
    }

    public function uninstallTabs()
    {
        $id_tab = (int) Tab::getIdFromClassName(static::MODULE_ADMIN_CONTROLLER);

        if ($id_tab) {
            $tab = new Tab($id_tab);
            return $tab->delete();
        }

        return true;
    }

    public function getContent()
    {
        Tools::redirectAdmin($this->context->link->getAdminLink(static::MODULE_ADMIN_CONTROLLER));
    }

    public function hookDisplayPaymentTop($params)
    {
        $smsForm = new SmsForm();
        $cart = new Cart($params['cart']->id);
        $hasVerifiacationOn = false;

        $productsIds = $smsForm->getInCartProductsIds($cart);
        foreach ($productsIds as $p) {
            if ($smsForm->getProductsOption($p) == true) {
                $hasVerifiacationOn = true;
                setcookie("verificationOn", true, time() + 3600);
                // setcookie('sms_code_error', 'Sms Code verification is required', time() + 3600);
                break;
            }
        }
        if ($hasVerifiacationOn == true) {
            $phone_number = $smsForm->getPhoneNumber($cart->id_address_delivery);
            $this->context->smarty->assign('email', $params['cookie']->email);
            $this->context->smarty->assign('phone_number', $phone_number);
            // $this->context->smarty->assign('authKey', self::AUTHENTICATION_KEY);
            return $this->display(__FILE__, '/views/templates/front/smsverification.tpl');
        }
    }

    public function hookActionObjectOrderAddBefore()
    {
        if ($_COOKIE['verificationOn']) {
            if ($_COOKIE['sms_code_error']) {
                Tools::redirect($_SERVER['HTTP_REFERER']);
            }
            dump('przechodzi!');
            die;
        }

        setcookie("verificationOn", "", time() - 3600);
    }

    public function hookHeader()
    {

        if ($this->context->controller->php_self === 'order') {
            $this->context->controller->addJS($this->_path . 'views/js/paymentformvalidator.js');
            $this->context->controller->addJS($this->_path . 'views/js/sha256.js');
        }
    }

    public function hookActionCarrierProcess()
    {
        if ($_COOKIE['sms_code_error']) {
            $this->context->controller->errors[] = $_COOKIE['sms_code_error'];
            setcookie('sms_code_error', '', time() - 3600);
            return;
        }
    }
}
