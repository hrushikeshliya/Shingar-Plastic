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
$id = isset($_GET['id']) ? $_GET['id'] : die();
$type = isset($_GET['type']) ? $_GET['type'] : die();

// query Object
if($type == 'issued') {

} else if ($type == 'pending') {

}

$stmt = $obj->readOne();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

        $response=array(
            "id" => $obj ->id,
            "name" => $row['name'],
            "date" =>  $row['date'],
            "jobberId" =>  $row['jobberId'],
            "aliasName" =>  $row['aliasName'],
            "itemId" =>  $row['itemId'],
            "itemName" =>  $row['itemName'],
            "quantity" =>  $row['quantity'],
            "narration" =>  $row['narration'],
            "username" =>  $row['username']
        );
  
// make it json format
print_r(json_encode($response));
?>