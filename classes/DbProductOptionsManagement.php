<?php

class DbProductOptionsManagement
{
    private const TABLE_NAME = 'smscodeverification_product_options';

    public function getProductOptions(int $idProduct): array
    {
        $query = new DbQuery();
        $query->select('active')
            ->from(self::TABLE_NAME)
            ->where('id_product = ' . $idProduct);

        $result = (Db::getInstance()->getRow($query));

        if (!is_array($result)) {
            $result = [];
        }

        return $result;
    }

    // public function getProductsOptions(array $idsProducts): array
    // {
    //     $conditions = 'id_product = ' . implode(' || id_product = ', $idsProducts);

    //     $query = new DbQuery();
    //     $query->select('registered_email, other_email, sms')
    //         ->from(self::TABLE_NAME)
    //         ->where($conditions);

    //     $result = Db::getInstance()->executeS($query);

    //     return $result;
    // }

    // public function getProductName(int $idProduct): string
    // {

    //     $query = new DbQuery();
    //     $query->select('product_name')
    //         ->from('wishformlist')
    //         ->where('id_product = ' . $idProduct);
    //     $result = Db::getInstance()->getValue($query);

    //     return $result;
    // }

    public function setOptions(array $idProducts, bool $active): bool
    {
        if (empty($idProducts)) {
            return false;
        }

        $query = 'REPLACE INTO `' . _DB_PREFIX_ . self::TABLE_NAME . '`(
            `id_product`, `active`) VALUES ';

        foreach ($idProducts as $index => $idProduct) {
            if ($index != 0) {
                $query .= ', ';
            }

            $query .= '(' . (int)$idProduct . ', ' . (int)$active . ')';
        }

        return Db::getInstance()->executeS($query);
    }
}