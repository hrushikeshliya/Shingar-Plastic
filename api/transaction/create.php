<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/transaction.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new Transaction($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$obj->type = $data->type;
$obj->date = $data->date;
$obj->debitAccount = $data->debitAccount;
$obj->creditAccount = $data->creditAccount;
$obj->amount = $data->amount;
$obj->narration = $data->narration;
$obj->username = $data->username;

if($obj->create()){
    echo '{';
        echo '"message": "Success"';
    echo '}';
} else {
    echo '{';
        echo '"message": "Internal Server Error"';
    echo '}';
}
?>