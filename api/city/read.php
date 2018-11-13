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

if(isset($_GET['id'])){
    $obj->id = $_GET['id'];
    $stmt = $obj->readOne();
} else {
    $stmt = $obj->read();
}

$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["city"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
        array_push($arr["city"], $row);
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>