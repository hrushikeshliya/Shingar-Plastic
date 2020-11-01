<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/accountType.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new AccountType($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$obj->name = $data->name;
$obj->description = $data->description;
 
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