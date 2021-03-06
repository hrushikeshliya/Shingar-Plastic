<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare User object
$user = new User($db);
 
// get User id
$data = json_decode(file_get_contents("php://input"));
 
// set User id to be deleted
$user->id = $data->id;
 
// delete the User
if($user->delete()){
    echo '{';
        echo '"message": "Success."';
    echo '}';
}
 
// if unable to delete the User
else{
    echo '{';
        echo '"message": "Oops! Something Went Wrong"';
    echo '}';
}
?>