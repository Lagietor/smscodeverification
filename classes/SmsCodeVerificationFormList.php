<?php

class SmsCodeVerificationFormList extends ObjectModel
{
    public $id_formlist;
    public $id_product;
    public $product_name;
    public $category_name;

    public static $definition = [
        'table' => 'smscodeverification_formlist',
        'primary' => 'id_product',
        'multilang' => true,
        'fields' => [
            'id_product' => ['type' => self::TYPE_INT],
            'product_name' => ['type' => self::TYPE_STRING],
            'category_name' => ['type' => self::TYPE_STRING],
            'sms_authentication' => ['type' => self::TYPE_BOOL]
        ]
    ];
}