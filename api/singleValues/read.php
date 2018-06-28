<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/singleValues.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new SingleValues($db); //Change ClassName

// set ID property of User to be edited
$type = isset($_GET['type']) ? $_GET['type'] : "NULL";

if($type=='distinctSale') {
    $stmt = $obj->readDistinctSaleAccount();
} else if($type=='distinctPurchase') {
    $stmt = $obj->readDistinctPurchaseAccount();
} else if($type=='totalQuantity') {
    $invoiceId = isset($_GET['invoiceId']) ? $_GET['invoiceId'] : die();
    $itemId = isset($_GET['itemId']) ? $_GET['itemId'] : die();
    $table = isset($_GET['table']) ? $_GET['table'] : die();
    $stmt = $obj->readQuantityByItem($table,$invoiceId,$itemId);
} else {
    $stmt = $obj->readByType($type);
}

$arr=array();
$arr["singleValues"]=array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    array_push($arr["singleValues"], $row); 
}
// make it json format
print_r(json_encode($arr));
?>