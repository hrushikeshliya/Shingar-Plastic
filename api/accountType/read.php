<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/accountType.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new AccountType($db);
 
$stmt = $obj->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["accountType"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        array_push($arr["accountType"], $row); // Change Array Name
    }

    $arr["exportKey"] = "accountType";
    echo json_encode($arr);

}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>