<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/materialIssue.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new MaterialIssue($db); //Change ClassName

// set ID property of User to be edited
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// query Object
$stmt = $obj->readOne();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

print_r(json_encode($row));

?>