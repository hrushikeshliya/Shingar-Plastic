<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/transport.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$obj = new Transport($db);
 
$stmt = $obj->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    // products array
    $arr=array();
    $arr["transport"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $arr_item=array(
            "id" => $Id,
            "name" => $name,
            "shortName" => $shortName,
            "contactPerson" => $contactPerson,
            "mobile" => $mobile,
            "mobile2" => $mobile2,
            "active" => $active,

        );
 
        array_push($arr["transport"], $arr_item);
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>