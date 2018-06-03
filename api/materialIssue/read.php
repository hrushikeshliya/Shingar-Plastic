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
 
        $arr_item=array(
            "id" => $id,
            "date" =>  $date,
            "processId" =>  $processId,
            "processName" =>  $processName,
            "jobberId" =>  $jobberId,
            "aliasName" =>  $aliasName,
            "itemId" =>  $itemId,
            "itemName" =>  $itemName,
            "quantity" =>  $quantity,
            "receivedQuantity" =>  $receivedQuantity,
            "pendingQuantity" =>  $pendingQuantity,
            "narration" =>  $narration,
            "username" =>  $username
        );
 
        array_push($arr["materialIssue"], $arr_item); // Change Array Name
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>