<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/item.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new Item($db); //Change ClassName

// set ID property of User to be edited
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// query Object
$stmt = $obj->readOne();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

        $response=array(
            "id" => $obj ->id,
            "name" => $row['name'],
            "itemGroupId" => $row['itemGroupId'],
            "itemGroup" => $row['itemGroup'],
            "purchaseRate" => $row['purchaseRate'],
            "saleRate" => $row['saleRate'],
            "jobRate" => $row['jobRate'],
            "itemWeight" => $row['itemWeight'],
            "hsnSac" => $row['hsnSac'],
            "narration" => $row['narration'],
            "active" => $row['active']
        );
  
// make it json format
print_r(json_encode($response));
?>