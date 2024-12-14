<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/navBar.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$navBar = new NavBar($db);
$navBar->username = isset($_GET['username']) ? $_GET['username'] : die();
 
$stmt = $navBar->read();
$num = $stmt->rowCount();

$currentHeading = "";

if($num>0){
 
    // products array
    $navBar_arr["navBar"]=array();
 	$navGroup_arr["navGroup"]=array();
 	
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

    extract($row);
    
    if($currentHeading != $heading) {
	    $currentHeading = $heading;
	    if(sizeOf($navGroup_arr)>0) {
            	array_push($navBar_arr["navBar"], $navGroup_arr);
            }
	    $navGroup_arr["navGroup"]=array();
    }	
        $nav_item=array(
            "id" => $id,
            "groupId" => $groupId,
            "heading" => $heading,
            "name" => $name,
            "url" => $url
        );
 
        array_push($navGroup_arr["navGroup"], $nav_item);
    }
    
    array_push($navBar_arr["navBar"], $navGroup_arr);
    echo json_encode($navBar_arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>