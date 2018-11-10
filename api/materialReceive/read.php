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
$type = isset($_GET['type']) ? $_GET['type'] : "NULL";

$issueId = isset($_GET['issueId']) ? $_GET['issueId'] : 'NULL'; 

if($type== 'NULL'){
    if($issueId == 'NULL'){
        $stmt = $obj->read();
    } else {
        $obj->issueId = $issueId; 
        $stmt = $obj->readByIssueId();
    }
} else if($type=='jobberReport') {
    $stmt = $obj->readJobberReport();
}

$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["materialReceive"]=array(); // Change Array Name
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row); 
        array_push($arr["materialReceive"], $row); // Change Array Name
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>