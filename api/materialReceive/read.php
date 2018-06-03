<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/materialReceive.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new MaterialReceive($db);  //Change ClassName

$issueId = isset($_GET['issueId']) ? $_GET['issueId'] : 'NULL'; 

if($issueId == 'NULL'){
    $stmt = $obj->read();
} else {
    $obj->issueId = $issueId; 
    $stmt = $obj->readByIssueId();
}

$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["materialReceive"]=array(); // Change Array Name
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $arr_item=array(
            "id" => intval($id),
            "issueId" => intval($issueId),
            "issueDate" =>  $issueDate,
            "date" =>  $date,
            "processId" =>  intval($processId),
            "processName" =>  $processName,
            "jobberId" =>  intval($jobberId),
            "aliasName" =>  $aliasName,
            "itemId" =>  intval($itemId),
            "itemName" =>  $itemName,
            "issuedQuantity" =>  floatval($issuedQuantity),
            "receivedQuantity" =>  floatval($receivedQuantity),
            "pendingQuantity" =>  floatval($pendingQuantity),
            "quantity" =>  floatval($quantity),
            "rate" => floatval($rate),
            "jobCharge" => floatval($jobCharge),
            "narration" =>  $narration,
            "issueNarration" =>  $issueNarration,
            "username" =>  $username
        );
 
        array_push($arr["materialReceive"], $arr_item); // Change Array Name
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>