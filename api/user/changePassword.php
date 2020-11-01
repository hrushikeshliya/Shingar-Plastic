<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: *");
 
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$user->username = isset($_COOKIE['username']) ? $_COOKIE['username'] : die(); 
$user->password = $data -> npwd; 

if($user->changePassword($data -> opwd)){
    echo '{';
        echo '"message": "Success."';
    echo '}';
}
else{
    echo '{';
        echo '"message": "Internal Server Error."';
    echo '}';
}

?>