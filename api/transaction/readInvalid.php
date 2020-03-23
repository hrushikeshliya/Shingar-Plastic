<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/transaction.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$obj = new Transaction($db);
 
$stmt = $obj->readInvalid();
$num = $stmt->rowCount();
 

$role_arr=array();
$role_arr["transaction"]=array();
 
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    array_push($role_arr["transaction"], $row);
}
 
echo json_encode($role_arr);
