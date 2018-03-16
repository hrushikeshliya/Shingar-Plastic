<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/itemGroup.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new ItemGroup($db);  //Change ClassName
 
$stmt = $obj->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["itemGroup"]=array(); // Change Array Name
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $arr_item=array(
            "id" => $Id,
            "name" => $name,
            "rawType" => $rawType,
            "active" => $active,

        );
 
        array_push($arr["itemGroup"], $arr_item); // Change Array Name
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>