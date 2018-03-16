<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/transport.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj= new Transport($db);

// set ID property of User to be edited
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// query Object
$stmt = $obj->readOne();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

    
        $response=array(
            "id" => $obj->id,
            "name" => $row['name'],
            "shortName" => $row['shortName'],
            "contactPerson" => $row['contactPerson'],
            "mobile" => $row['mobile'],
            "mobile2" => $row['mobile2'],
            "active" => $row['active']
        );
  
// make it json format
print_r(json_encode($response));
?>