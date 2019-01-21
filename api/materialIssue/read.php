<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/materialIssue.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new MaterialIssue($db);  //Change ClassName
 

$type = isset($_GET['type']) ? $_GET['type'] : 'NULL'; 

if($type == 'NULL'){

    if(isset($_GET['startDate'])) {
        $obj->startDate = $_GET['startDate'];
    }
    
    if(isset($_GET['endDate'])) {
        $obj->endDate = $_GET['endDate'];
    }

    if(isset($_GET['accountId'])) {
        $obj->accountId = $_GET['accountId'];
    }

    if(isset($_GET['itemId'])) {
        $obj->itemId = $_GET['itemId'];
    }

    $stmt = $obj->read();
} else {
    $id = isset($_GET['id']) ? $_GET['id'] : die(); 
    if($type=='jobber') {
        $stmt = $obj->readByJobber($id);
    }
}

$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["materialIssue"]=array(); // Change Array Name
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        array_push($arr["materialIssue"], $row); 
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>