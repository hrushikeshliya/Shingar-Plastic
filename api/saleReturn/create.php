<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/saleReturn.php';
include_once '../objects/invoiceDetail.php';

$database = new Database();
$db = $database->getConnection();
 
$obj = new SaleReturn($db);
 
$data = json_decode(file_get_contents("php://input"));

$obj->date = $data->date;
$obj->invoiceId = $data->invoiceId;
$obj->accountId = $data->accountId;
$obj->narration = $data->narration;
$obj->username = $data->username;
$obj->totalAmount = $data->totalAmount;

if($obj->create()){
    
    if(is_array($data->itemName)) {
        for($x = 0; $x < count($data->itemName); $x++) {
            $detail = new InvoiceDetail($db);
            $detail->invoiceId = $data->returnInvoiceId;
            $detail->type = "saleReturn";
            $detail->itemId = $data->itemId[$x];
            $detail->itemName = $data->itemName[$x];
            $detail->quantity = $data->quantity[$x];
            $detail->rate = $data->rate[$x];
            $detail->amount = $data->amount[$x];

            $detail->create();
        }
    } else {
        $detail = new InvoiceDetail($db);
        $detail->invoiceId = $data->returnInvoiceId;
        $detail->type = "saleReturn";
        $detail->itemId = $data->itemId;
        $detail->itemName = $data->itemName;
        $detail->quantity = $data->quantity;
        $detail->rate = $data->rate;
        $detail->amount = $data->amount;
        $detail->create();
    }

    echo '{';
        echo '"message": "Success"';
    echo '}';

} else {
    echo '{';
        echo '"message": "Internal Server Error"';
    echo '}';
}



?>