<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/roles.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$role = new Role($db);
 
$data = json_decode(file_get_contents("php://input"));
 
$role->id = $data->id; 
$role->name = $data->name;

if($role->update()){
    echo '{';
        echo '"message": "Success"';
    echo '}';
} else {
    echo '{';
        echo '"message": "Internal Server Error"';
    echo '}';
}
?>