<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/item.php';
 
$database = new Database();
$db = $database->getConnection();
 
$obj = new Item($db);  //Change ClassName
 
$stmt = $obj->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    $arr=array();
    $arr["item"]=array(); // Change Array Name
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $arr_item=array(
            "id" => $id,
            "name" => $name,
            "itemGroupId" => $itemGroupId,
            "itemGroup" => $itemGroup,
            "purchaseRate" => $purchaseRate,
            "saleRate" => $saleRate,
            "jobRate" => $jobRate,
            "itemWeight" => $itemWeight,
            "hsnSac" => $hsnSac,
            "narration" => $narration,
            "active" => $active,

        );
 
        array_push($arr["item"], $arr_item); // Change Array Name
    }
 
    echo json_encode($arr);
}
 
else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
?>