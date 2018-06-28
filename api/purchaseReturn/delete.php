<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/purchaseReturn.php';
include_once '../objects/invoiceDetail.php';
 

$database = new Database();
$db = $database->getConnection();
 
$purchaseReturn = new PurchaseReturn($db);
$invoiceDetail = new InvoiceDetail($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$purchaseReturn->id = $data->id;
 
if($purchaseReturn->delete()){
    $invoiceDetail->type="purchaseReturn";
    $invoiceDetail->invoiceId=$data->id;

    if($invoiceDetail->delete()){
        echo '{';
            echo '"message": "Success."';
        echo '}';
    } else {
        echo '{';
            echo '"message": "Oops! Something Went Wrong"';
        echo '}';
    }
} else {
    echo '{';
        echo '"message": "Oops! Something Went Wrong"';
    echo '}';
}
?>