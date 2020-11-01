<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/materialReceive.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new MaterialReceive($db);
 
$data = json_decode(file_get_contents("php://input"));

$obj->date = $data->date;
$obj->issueId = $data->issueId;
$obj->quantity = $data->quantity;
$obj->rate = $data->rate;
$obj->jobCharge = $data->jobCharge;
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