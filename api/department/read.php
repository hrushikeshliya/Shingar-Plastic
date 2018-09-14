<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/department.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new Department($db);  //Change ClassName

if($_GET['type'] == 'active'){
    $stmt = $obj->readActive();
} else if(isset($_GET['id'])){
    $obj->id = $_GET['id'];
    $stmt = $obj->readOne();
} else {
    $stmt = $obj->read();
}
$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["department"]=array(); // Change Array Name
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        array_push($arr["department"], $row); // Change Array Name
    }
 
    echo json_encode($arr);
} 
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>