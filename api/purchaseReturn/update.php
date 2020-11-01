<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/purchaseReturn.php';
include_once '../objects/invoiceDetail.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new PurchaseReturn($db);
 
$data = json_decode(file_get_contents("php://input"));
$obj->id = $data->invoiceId;

$obj->date = $data->date;
$obj->totalAmount = $data->totalAmount;
$obj->narration = $data->narration;
$obj->username = $data->username;

if($obj->update()){

$oldDetail = new InvoiceDetail($db);
$oldDetail->invoiceId = $data->invoiceId;
$oldDetail->type = "purchaseReturn";
$oldDetail->hardDelete();

    if(is_array($data->itemName)) {
        for($x = 0; $x < count($data->itemName); $x++) {
            $detail = new InvoiceDetail($db);
            $detail->invoiceId = $data->invoiceId;
            $detail->type = "purchaseReturn";
            $detail->itemId = $data->itemId[$x];
            $detail->itemName = $data->itemName[$x];
            $detail->narration = $data->itemNarration[$x];
            $detail->quantity = $data->quantity[$x];
            $detail->rate = $data->rate[$x];
            $detail->amount = $data->amount[$x];
            $detail->detailId = $data->detailId[$x];

            $detail->create();
        }
    } else {
        $detail = new InvoiceDetail($db);
        $detail->invoiceId = $data->invoiceId;
        $detail->type = "purchaseReturn";
        $detail->itemId = $data->itemId;
        $detail->itemName = $data->itemName;
        $detail->quantity = $data->quantity;
        $detail->rate = $data->rate;
        $detail->amount = $data->amount;
        $detail->detailId = $data->detailId;
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