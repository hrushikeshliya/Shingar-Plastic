<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/roles.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$role = new Role($db);
 
$stmt = $role->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    // products array
    $role_arr=array();
    $role_arr["roles"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $role_item=array(
            "id" => $Id,
            "name" => $name,

        );
 
        array_push($role_arr["roles"], $role_item);
    }
 
    echo json_encode($role_arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>