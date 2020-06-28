<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/account.php';
include_once '../objects/transaction.php';
 
$database = new Database();
$db = $database->getConnection();
$transactions = new Transaction($db);

$obj = new Account($db);
 
$type = isset($_GET['type']) ? $_GET['type'] : 'NULL';
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

if($type == 'NULL') {
    $stmt = $obj->read();
} else {
    $stmt = $obj->readByType($type);
}

$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["account"]=array();
    $opening = array();
    $closing = array();

    $stmt2 = $transactions->readBalanceByDate2($startDate,"Opening");
    $stmt3 = $transactions->readBalanceByDate2($endDate,"Closing");

    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
        array_push($opening, $row2);
    }

    while ($row1 = $stmt3->fetch(PDO::FETCH_ASSOC)){
        array_push($closing, $row1);
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $id = $row["id"];
        $expected = array_filter($opening, function ($var) use ($id) {
            return ($var['id'] == $id);
        });

        foreach($expected  as $obj){
            $row["openingBalanceCurrent"] = $obj["balance"];         
        }

        $expected = array_filter($closing, function ($var) use ($id) {
            return ($var['id'] == $id);
        });

        foreach($expected  as $obj){
            $row["closingBalanceCurrent"] = $obj["balance"];         
        }

        array_push($arr["account"], $row);
    }

    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>