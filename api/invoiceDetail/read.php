<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/invoiceDetail.php';
 
$database = new Database();
$db = $database->getConnection();
 
$type = isset($_GET['type']) ? $_GET['type'] : die();
$id = isset($_GET['id']) ? $_GET['id'] : die();

$obj = new InvoiceDetail($db);  //Change ClassName
$obj->invoiceId = $id;
$obj->type = $type;
if($type == "sale") {
    $stmt = $obj->readOneSale();     
} else if($type == "saleReturn") {
    $stmt = $obj->readOneSaleReturn();     
} else if($type == "purchase") {
    $stmt = $obj->readOnePurchase();     
} else if($type == "purchaseReturn") {
    $stmt = $obj->readOnePurchaseReturn();     
} else {
    $stmt = $obj->readOne();  
}
$num = $stmt->rowCount();
     
if($num>0){
 
    $arr=array();
    $arr["invoiceDetail"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($arr["invoiceDetail"], $row); 
    }
 
    echo json_encode($arr);
} else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}

?>