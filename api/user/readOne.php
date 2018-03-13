<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);

// set ID property of User to be edited
$user->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// query Object
$stmt = $user->readOne();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

    
        $response=array(
            "id" => $user ->id,
            "firstName" => $row['firstName'],
            "middleName" => $row['middleName'],
            "lastName" => $row['lastName'],
            "email" => html_entity_decode($row['email']),
            "mobile" => $row['mobile'],
            "username" => $row['username'],
            "roleId" => $row['roleId'],
            "deleted" => $row['deleted'],
            "active" => $row['active'],
            "roleName" => $row['roleName']
        );
  
// make it json format
print_r(json_encode($response));
?>