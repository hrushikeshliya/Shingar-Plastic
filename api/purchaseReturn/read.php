<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/purchaseReturn.php';
include_once '../objects/invoiceDetail.php';
 
$database = new Database();
$db = $database->getConnection();
 
$purchaseReturn = new PurchaseReturn($db);  //Change ClassName

$stmt = $purchaseReturn->read();

$num = $stmt->rowCount();
     
if($num>0){
     
    $arr=array();
    $arr["purchaseReturn"]=array();
     
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    
        extract($row);
    
        $invoiceDetail = new InvoiceDetail($db);  //Change ClassName
        $invoiceDetail->invoiceId = $id;
        $invoiceDetail->type = "purchaseReturn";
        $arr2=array();
        $stmt2 = $invoiceDetail->readOne();
    
        while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
            array_push($arr2, $row2);
        }
        $row['invoiceDetail']=$arr2;
    
        array_push($arr["purchaseReturn"], $row); 
    }
     
    echo json_encode($arr);
} else{
        echo json_encode(
            array("message" => "No Records found.")
        );
    }

?>