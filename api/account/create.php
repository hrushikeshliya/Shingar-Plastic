<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/account.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new Account($db);
 
$data = json_decode(file_get_contents("php://input"));

$obj->name = $data->name;
$obj->aliasName = $data->aliasName;
$obj->typeId = $data->typeId;
$obj->openingBalance = $data->openingBalance * $data->openingDirection;
$obj->address1 = $data->address1;
$obj->address2 = $data->address2;
$obj->city = $data->city;
$obj->state = $data->state;
$obj->pincode = $data->pincode;
$obj->phone = $data->phone;
$obj->mobile = $data->mobile;
$obj->mobile2 = $data->mobile2;
$obj->email = $data->email;
$obj->transportId = $data->transportId;
$obj->billLimit = $data->billLimit;
$obj->gstno = $data->gstno;
$obj->active = $data->active;
  
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