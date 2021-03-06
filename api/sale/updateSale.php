<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/sale.php';
include_once '../objects/invoiceDetail.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new Sale($db);
 
$data = json_decode(file_get_contents("php://input"));
$obj->id = $data->invoiceId;
$obj->lrNo = $data->lrNo;

$obj->date = $data->date;
$obj->departmentId = $data->departmentId;
$obj->transportId = $data->transportId;
$obj->accountId = $data->accountId;
$obj->tax = $data->tax;
$obj->showName = $data->showName == "on"?true:false;
$obj->narration = $data->narration;
$obj->username = $data->username;
$obj->subTotal = $data->subTotal;
$obj->taxableAmount = $data->taxableAmount;
$obj->taxAmount = $data->taxAmount;
$obj->grandTotal = $data->grandTotal;
$obj->billLimit = $data->billLimit;
$obj->billNameId = $data->billNameId;
$obj->invoiceId = $data->salesInvoiceId;

if($obj->updateSale()){

$oldDetail = new InvoiceDetail($db);
$oldDetail->invoiceId = $data->invoiceId;
$oldDetail->type = "sale";
$oldDetail->hardDelete();

    if(is_array($data->itemName)) {
        for($x = 0; $x < count($data->itemName); $x++) {
            $detail = new InvoiceDetail($db);
            $detail->invoiceId = $data->invoiceId;
            $detail->type = "sale";
            $detail->itemId = $data->itemId[$x];
            $detail->itemName = $data->itemName[$x];
            $detail->narration = $data->itemNarration[$x];
            $detail->quantity = $data->quantity[$x];
            $detail->rate = $data->rate[$x];
            $detail->amount = $data->amount[$x];
            $detail->detailId = 0;

            $detail->create();
        }
    } else {
        $detail = new InvoiceDetail($db);
        $detail->invoiceId = $data->invoiceId;
        $detail->type = "sale";
        $detail->itemId = $data->itemId;
        $detail->itemName = $data->itemName;
        $detail->narration = $data->itemNarration;
        $detail->quantity = $data->quantity;
        $detail->rate = $data->rate;
        $detail->amount = $data->amount;
        $detail->detailId = 0;
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