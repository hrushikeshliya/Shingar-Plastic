<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);
 
// query Object
$stmt = $user->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    $response=array();
    $response["users"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    
        extract($row);
 
        $response_item=array(
            "id" => $Id,
            "firstName" => $firstName,
            "middleName" => $middleName,
            "lastName" => $lastName,
            "email" => html_entity_decode($email),
            "mobile" => $mobile,
            "username" => $username,
            "roleId" => $roleId,
            "deleted" => $deleted,
            "active" => $active,
            "roleName" => $roleName
        );
 
        array_push($response["users"], $response_item);
    }
 
    echo json_encode($response);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>