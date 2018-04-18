<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/city.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new City($db);
$obj->stateName = isset($_GET['stateName']) ? $_GET['stateName'] : die();

$stmt = $obj->readByState();
$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["records"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $arr_item=array(
            "cityName" => $cityName,
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