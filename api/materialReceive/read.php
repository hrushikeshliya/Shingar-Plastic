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
        $obj->issueId = $issueId; 
        $stmt = $obj->readByIssueId();
    }
} else if($type=='jobberReport') {
    $stmt = $obj->readJobberReport();
} else if($type=='amountTillDate') {
    $obj->id = isset($_GET['id']) ? $_GET['id'] : die();

    if(isset($_GET['date'])) {
        $obj->date = $_GET['date'];
    } else {
        $obj->date = "GETDATE()";
    }

    $stmt = $obj->readAmountTillDate();
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