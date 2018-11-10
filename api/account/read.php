<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/account.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new Account($db);
 
$type = isset($_GET['type']) ? $_GET['type'] : 'NULL';

if($type == 'NULL') {
    $stmt = $obj->read();
} else {
    $stmt = $obj->readByType($type);
}

$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["account"]=array();
 
  
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        array_push($arr["account"], $row); // Change Array Name
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>