<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/purchase.php';
include_once '../objects/invoiceDetail.php';
 
$database = new Database();
$db = $database->getConnection();
 
$purchase = new Purchase($db);  //Change ClassName
$type = isset($_GET['type']) ? $_GET['type'] : "NULL";

if($type=='purchase' || $type=='purchaseReturn') {

    $id= isset($_GET['id']) ? $_GET['id'] : "NULL";

    if($id == "NULL") {

        if(isset($_GET['startDate'])) {
            $purchase->startDate = $_GET['startDate'];
        }
        
        if(isset($_GET['endDate'])) {
            $purchase->endDate = $_GET['endDate'];
        }

        if(isset($_GET['departmentId'])) {
            $purchase->departmentId = $_GET['departmentId'];
        }

        if(isset($_GET['accountId'])) {
            $purchase->accountId = $_GET['accountId'];
        }

        if(isset($_GET['itemId'])) {
            $purchase->itemId = $_GET['itemId'];
        }

        $stmt = $purchase->read();
    } else {
        $purchase->id = $id;
        $stmt = $purchase->readOne();
    }

    $num = $stmt->rowCount();
     
    if($num>0){
     
        $arr=array();
        $arr["purchase"]=array();
     
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    
            extract($row);
    
            $invoiceDetail = new InvoiceDetail($db);  //Change ClassName
            $invoiceDetail->invoiceId = $id;
            $invoiceDetail->type = "purchase";
            $arr2 = array();

            if($type == "purchase"){
                $stmt2 = $invoiceDetail->readOnePurchase();
            } else {
                $stmt2 = $invoiceDetail->readOnePurchaseReturn();
            }

            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
                array_push($arr2, $row2);
            }
            $row['invoiceDetail']=$arr2;
    
            array_push($arr["purchase"], $row); 
        }
     
        echo json_encode($arr);
    }
     
    else{
        echo json_encode(
            array("message" => "No Records found.")
        );
    }

} else if($type=='distinctAccount') {
    $stmt = $purchase->readDistinctAccount();
} else if($type=='distinctInvoiceId') {
    $accountId = isset($_GET['id']) ? $_GET['id'] : die();
    $purchase->accountId = $accountId;
    $stmt = $purchase->readInvoiceIdByAccount();
} else if($type=='purchaseReport') {
    $stmt = $purchase->readPurchaseReport();
} else if($type=='amountTillDate') {
    $purchase->id = isset($_GET['id']) ? $_GET['id'] : die();

    if(isset($_GET['date'])) {
        $purchase->date = $_GET['date'];
    } else {
        $purchase->date = "GETDATE()";
    }

    $stmt = $purchase->readAmountTillDate();
}

if($type=='distinctAccount' || $type=='distinctInvoiceId' || $type=='purchaseReport' || $type=='amountTillDate') {

    $num = $stmt->rowCount();
         
    if($num>0){
     
        $arr=array();
        $arr["purchase"]=array();
     
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($arr["purchase"], $row); 
        }
     
        echo json_encode($arr);
    } else{
        echo json_encode(
            array("message" => "No Records found.")
        );
    }
}
?>