<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/materialReceive.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new materialReceive($db); //Change ClassName

// set ID property of User to be edited
$id = isset($_GET["id"]) ? $_GET["id"] : die();

$obj->id = $id;
// query Object
$stmt = $obj->readOne();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

        $response=array(
            "id" => $obj ->id,
            "date" =>  $row['date'],
            "issueDate" =>  $row['issueDate'],
            "jobberId" =>  $row['jobberId'],
            "aliasName" =>  $row['aliasName'],
            "itemId" =>  $row['itemId'],
            "itemName" =>  $row['itemName'],
            "quantity" =>  floatval($row['quantity']),
            "issuedQuantity" =>  floatval($row['issuedQuantity']),
            "receivedQuantity" =>  floatval($row['receivedQuantity']),
            "pendingQuantity" =>  floatval($row['pendingQuantity']),
            "narration" =>  $row['narration'],
            "username" =>  $row['username'],
            "rate" =>  floatval($row['rate']),
            "jobCharge" =>  floatval($row['jobCharge'])
        );
  
// make it json format
print_r(json_encode($response));
?>