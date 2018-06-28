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
 
$saleReturn = new SaleReturn($db);
$invoiceDetail = new InvoiceDetail($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$saleReturn->id = $data->id;
 
if($saleReturn->delete()){
    $invoiceDetail->type="saleReturn";
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