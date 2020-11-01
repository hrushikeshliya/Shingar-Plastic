<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/transaction.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new Transaction($db);
 
$data = json_decode(file_get_contents("php://input"));

$type = isset($_GET['type']) ? $_GET['type'] : "NULL";

$obj->type = $data->type;
$obj->date = $data->date;
$obj->debitAccount = $data->debitAccount;
$obj->creditAccount = $data->creditAccount;
$obj->debitAccountId = $data->debitAccountId;
$obj->creditAccountId = $data->creditAccountId;
$obj->amount = $data->amount;
$obj->narration = $data->narration;
$obj->username = $data->username;

if($type=='netOff') {
    $obj->netOff = 1;
} else {
    $obj->netOff = 0;
}

$stmt = $obj->checkForDuplicate();
$num = $stmt->rowCount();

if($num == 0) {
if($obj->create()){
    echo '{';
        echo '"message": "Success"';
    echo '}';
} else {
    echo '{';
        echo '"message": "Internal Server Error"';
    echo '}';
}}else {
    echo '{';
        echo '"message": "You Tried Adding Duplicate Record"';
    echo '}';
}

?>