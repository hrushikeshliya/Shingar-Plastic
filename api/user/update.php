<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare User object
$user = new User($db);
 
// get id of User to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of User to be edited
$user->id = $data->id;
 
// set User property values
$user->firstName = $data->firstName;
$user->middleName = $data->middleName;
$user->lastName = $data->lastName;
$user->email = $data->email;
$user->roleId = $data->roleId;
$user->mobile = $data->mobile;
$user->active = $data->active;

// update the User
if($user->update()){
    echo '{';
        echo '"message": "User was updated."';
    echo '}';
}
 
// if unable to update the User, tell the user
else{
    echo '{';
        echo '"message": "Unable to update User."';
    echo '}';
}
?>