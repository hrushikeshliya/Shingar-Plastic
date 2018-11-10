<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/sale.php';
include_once '../objects/invoiceDetail.php';
 
$database = new Database();
$db = $database->getConnection();
 
$sale = new Sale($db);  //Change ClassName

$type = isset($_GET['type']) ? $_GET['type'] : "NULL";

if($type=='sale' || $type=='saleReturn') {

    $id= isset($_GET['id']) ? $_GET['id'] : "NULL";

    if($id == "NULL") {
        $stmt = $sale->read();
    } else {
        $sale->id = $id;
        $stmt = $sale->readOne();
    }

    $num = $stmt->rowCount();
     
    if($num>0){
     
        $arr=array();
        $arr["sale"]=array();
     
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    
            extract($row);
    
            $invoiceDetail = new InvoiceDetail($db);  //Change ClassName
            $invoiceDetail->invoiceId = $id;
            $invoiceDetail->type = $type;
            $arr2 = array();

            if($type == "sale"){
                $stmt2 = $invoiceDetail->readOneSale();
            } else {
                $stmt2 = $invoiceDetail->readOneSaleReturn();
            }
    
            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
                array_push($arr2, $row2);
            }
            $row['invoiceDetail']=$arr2;
    
            array_push($arr["sale"], $row); 
        }
     
        echo json_encode($arr);
    } else{
        echo json_encode(
            array("message" => "No Records found.")
        );
    }

} else if($type=='distinctAccount') {
    $stmt = $sale->readDistinctAccount();
} else if($type=='distinctInvoiceId') {
    $accountId = isset($_GET['id']) ? $_GET['id'] : die();
    $sale->accountId = $accountId;
    $stmt = $sale->readInvoiceIdByAccount();
} else if($type=='saleReport') {
    $stmt = $sale->readSaleReport();
}

if($type=='distinctAccount' || $type=='distinctInvoiceId' || $type=='saleReport') {

$num = $stmt->rowCount();
     
if($num>0){
    $arr=array();
    $arr["sale"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($arr["sale"], $row); 
    }
 
    echo json_encode($arr);
} else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}
}

?>