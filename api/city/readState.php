<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/city.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$obj= new City($db);
 
$stmt = $obj->readState();
$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["records"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $arr_item=array(
            "stateName" => $stateName,
        );
 
        array_push($arr["records"], $arr_item);
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>