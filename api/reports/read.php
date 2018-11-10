<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/reports.php';
include_once '../objects/transaction.php';
include_once '../objects/account.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$obj = new Reports($db); //Change ClassName
$transactions = new Transaction($db);
$account = new Account($db);

// set ID property of User to be edited
$type = isset($_GET['type']) ? $_GET['type'] : die();

if($type=='sale') {
    $stmt = $obj->readSaleReport();
} else if($type=='purchase') {
    $stmt = $obj->readPurchaseReport();
} else if($type=='ledger') {
    $id = isset($_GET['id']) ? $_GET['id'] : die();
    $debitTransactions = array();
    $creditTransactions = array();

    $obj->accountId = $id;
    $account->id = $id;
    $transactions->accountId = $id;
    $stmt = $obj->readFullLedger();
    $stmt0 = $account->readOne();
}

$arr=array();

if($type=='sale' || $type=='purchase') {
    $arr["reports"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($arr["reports"], $row); 
    }
} else if ($type=='ledger') {

    $debit = 0;
    $credit = 0;
    $opgBalance = 0;
    $clsBalance = 0;
    $type = "";

    // Read Account BY ID 
    // IF TYPE = DEBTORS THEN DEBIT = SALE, CREDIT = PAYMENT RCVD
    // IF TYPE = CREDITORS THEN DEBIT = PAYMENT, CREDIT = PAYMENT MADE

    while ($row0 = $stmt0->fetch(PDO::FETCH_ASSOC)){
        extract($row0);
        $opgBalance = $openingBalance; 
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        
        $type = $name;
        if($name == 'DEBTORS') {
            $debit += $amount;
            array_push($debitTransactions, $row);
        } else {
            $credit += $amount;
            array_push($creditTransactions, $row);
        }

    }

    if($type == 'DEBTORS') {
        $stmt2 = $transactions->readCreditTransaction();
        while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
            extract($row2);
            $credit += $amount;
            array_push($creditTransactions, $row2);
        }    
    } else {
        $stmt2 = $transactions->readDebitTransaction();
        while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
            extract($row2);
            $debit += $amount;
            array_push($debitTransactions, $row2);
        } 
    }

    $clsBalance = $opgBalance + $debit - $credit;

    $arr["debitTransactions"] = $debitTransactions; 
    $arr["creditTransactions"] = $creditTransactions; 
    $arr["openingBalance"] = floatVal($opgBalance); 
    $arr["closingBalance"] = floatVal($clsBalance); 
}

// make it json format
echo (json_encode($arr));
?>