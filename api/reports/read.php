<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/reports.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new SingleValues($db); //Change ClassName

// set ID property of User to be edited
$type = isset($_GET['type']) ? $_GET['type'] : die();

if($type=='sale') {
    $stmt = $obj->readSaleReport();
} else if($type=='purchase') {
    $stmt = $obj->readPurchaseReport();
} 

$arr=array();
$arr["reports"]=array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    array_push($arr["reports"], $row); 
}
// make it json format
print_r(json_encode($arr));
?>