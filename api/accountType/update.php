<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/accountType.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj= new AccountType($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$obj->id = $data->id; 
$obj->name = $data->name;
$obj->description = $data->description;
$obj->active = $data->active;

if($obj->update()){
        echo '{';
            echo '"message": "Success"';
        echo '}';
    } else {
        echo '{';
            echo '"message": "Internal Server Error"';
        echo '}';
    }
?>