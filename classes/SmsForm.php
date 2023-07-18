<?php

class SmsForm
{
    private const TABLE_NAME = 'smscodeverification_product_options';

    public function getInCartProductsIds(Cart $cart): ?array
    {
        $products = $cart->getProducts();
        $productsIds = [];

        foreach ($products as $p) {
            $productsIds[] = $p['id_product'];
        }

        return $productsIds;
    }

    public function getProductsOption(int $productsId)
    {
        $query = new DbQuery();
        $query->select('active')
            ->from(self::TABLE_NAME)
            ->where('id_product = ' . $productsId);

        $result = (Db::getInstance()->getRow($query));

        return $result;
    }

    public function getPhoneNumber($id_address)
    {
        $query = new DbQuery();
        $query->select('phone')
            ->from('address')
            ->where('id_address = ' . $id_address);

        $result = (Db::getInstance()->getValue($query));
        return $result;
    }
}
