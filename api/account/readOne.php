<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/account.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new Account($db);

// set ID property of User to be edited
$obj->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// query Object
$stmt = $obj->readOne();

$row = $stmt->fetch(PDO::FETCH_ASSOC);

        $response=array(
            "id" => $obj ->id,
            "name" => $row['name'],
            "aliasName" => $row['aliasName'],
            "typeId" => $row['typeId'],
            "openingBalance" => $row['openingBalance'],
            "currentBalance" => $row['currentBalance'],
            "address1" => $row['address1'],
            "address2" => $row['address2'],
            "city" => $row['city'],
            "state" => $row['state'],
            "pincode" => $row['pincode'],
            "phone" => $row['phone'],
            "mobile" => $row['mobile'],
            "mobile2" => $row['mobile2'],
            "email" => $row['email'],
            "gstno" => $row['gstno'],
            "transportId" => $row['transportId'],
            "billLimit" => $row['billLimit'],
            "address1" => $row['address1'],
            "address2" => $row['address2'],
            "transportName" => $row['transportName'],
            "accountType" => $row['accountType'],
            "active" => $row['active']
        );
  
// make it json format
print_r(json_encode($response));
?>