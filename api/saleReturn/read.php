<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/saleReturn.php';
include_once '../objects/invoiceDetail.php';
 
$database = new Database();
$db = $database->getConnection();
 
$saleReturn = new SaleReturn($db);  //Change ClassName

$type = isset($_GET['type']) ? $_GET['type'] : "NULL";

if($type=='amountTillDate') {
    $saleReturn->id = isset($_GET['id']) ? $_GET['id'] : die();

    if(isset($_GET['date'])) {
        $saleReturn->date = $_GET['date'];
    } else {
        $saleReturn->date = "GETDATE()";
    }

    $stmt = $saleReturn->readAmountTillDate();
} else {
    $stmt = $saleReturn->read();
}
$num = $stmt->rowCount();
     
if($num>0){
     
    $arr=array();
    $arr["saleReturn"]=array();
     
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    
        extract($row);
    
        if($type!='amountTillDate') {
            $invoiceDetail = new InvoiceDetail($db);  //Change ClassName
            $invoiceDetail->invoiceId = $id;
            $invoiceDetail->type = "saleReturn";
            $arr2=array();
            $stmt2 = $invoiceDetail->readOneSaleReturn();
        
            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
                array_push($arr2, $row2);
            }
            $row['invoiceDetail']=$arr2;
        }
    
        array_push($arr["saleReturn"], $row); 
    }
     
    echo json_encode($arr);
} else{
        echo json_encode(
            array("message" => "No Records found.")
        );
    }

?>