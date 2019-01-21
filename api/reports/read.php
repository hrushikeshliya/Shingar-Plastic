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
$transactions2 = new Transaction($db);
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

    $debitTransactionsNet = array();
    $creditTransactionsNet = array();

    $obj->accountId = $id;
    $account->id = $id;
    $transactions->accountId = $id;
    $transactions2->accountId = $id;
    $stmt = $obj->readFullLedger();
    $stmt0 = $account->readOne();
    $stmt1 = $transactions2->readNetOffDate();
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

    $netDebit = 0;
    $netCredit = 0;

    $opgBalance = 0;
    $clsBalance = 0;
    $accountName = "";
    $aliasName = "";
    $type = "";
    $netOffDate = "";

    // Read Account BY ID 
    // IF TYPE = DEBTORS THEN DEBIT = SALE, CREDIT = PAYMENT RCVD
    // IF TYPE = CREDITORS THEN DEBIT = PAYMENT, CREDIT = PAYMENT MADE

    while ($row1 = $stmt1->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $netOffDate = $netOffDate;
    }

    while ($row0 = $stmt0->fetch(PDO::FETCH_ASSOC)){
        extract($row0);
        $type = $accountType;
        $opgBalance = $openingBalance; 
        $accountName = $name;
        $aliasName = $aliasName;
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
    
        if($account == 'SALES' || $account == 'PURCHASE RETURN') {
            $debit += $amount;
            array_push($debitTransactions, $row);
            if(strcmp($date, $netOffDate) >0) {
                array_push($debitTransactionsNet, $row);
            } else {
                $netDebit += $amount;
            }
        } else if($account == 'PURCHASE' || $account == 'SALES RETURN' || $account == 'JOB'){
            $credit += $amount;
            array_push($creditTransactions, $row);

            if(strcmp($date, $netOffDate) >0) {
                array_push($creditTransactionsNet, $row);                
            } else {
                $netCredit += $amount;
            }
        }
    }

    if($type == 'DEBTORS') {
        $stmt2 = $transactions->readCreditTransaction();
        while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
            extract($row2);
            $credit += $amount;
            array_push($creditTransactions, $row2);
            if(strcmp($date, $netOffDate) >0) {
                array_push($creditTransactionsNet, $row2);
            } else {
                $netCredit += $amount;
            }
        }    
    } else if ($type == 'CREDITORS' || $type == 'JOBBER') {
        $stmt2 = $transactions->readDebitTransaction();
        while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
            extract($row2);
            $debit += $amount;
            array_push($debitTransactions, $row2);
            if(strcmp($date, $netOffDate) >0) {
                array_push($debitTransactionsNet, $row2);
            } else {
                $netDebit += $amount;
            }
        } 
    } else if ($type == 'CASH A/C' || $type =='DISCOUNT A/C'){
        $stmt3 = $transactions->readRECCashTransaction();
        while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)){
            extract($row3);
            $debit += $amount;
            array_push($debitTransactions, $row3);
            if(strcmp($date, $netOffDate) >0) {
                array_push($debitTransactionsNet, $row3);
            } else {
                $netDebit += $amount;
            }
        } 

        $stmt4 = $transactions->readPAYCashTransaction();
        while ($row4 = $stmt4->fetch(PDO::FETCH_ASSOC)){
            extract($row4);
            $credit += $amount;
            array_push($creditTransactions, $row4);
            if(strcmp($date, $netOffDate) >0) {
                array_push($creditTransactionsNet, $row4);
            } else {
                $netCredit += $amount;
            }
        } 
    } else {
        $stmt3 = $transactions->readRECTransaction();
        while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)){
            extract($row3);
            $debit += $amount;
            array_push($debitTransactions, $row3);
            if(strcmp($date, $netOffDate) >0) {
                array_push($debitTransactionsNet, $row3);
            } else {
                $netDebit += $amount;
            }
        } 

        $stmt4 = $transactions->readPAYTransaction();
        while ($row4 = $stmt4->fetch(PDO::FETCH_ASSOC)){
            extract($row4);
            $credit += $amount;
            array_push($creditTransactions, $row4);
            if(strcmp($date, $netOffDate) >0) {
                array_push($creditTransactionsNet, $row4);
            } else {
                $netCredit += $amount;
            }
        } 
    }

    $opgBalanceNet = $opgBalance + $netDebit - $netCredit;
    $clsBalance = $opgBalance + $debit - $credit;
    $clsBalanceNet = $opgBalance + $debit - $credit;

    $arr["debitTransactions"] = $debitTransactions; 
    $arr["debitTransactionsNet"] = $debitTransactionsNet; 
    $arr["creditTransactions"] = $creditTransactions; 
    $arr["creditTransactionsNet"] = $creditTransactionsNet; 
    $arr["openingBalance"] = floatVal($opgBalance); 
    $arr["closingBalance"] = floatVal($clsBalance); 
    $arr["openingBalanceNet"] = floatVal($opgBalanceNet); 
    $arr["closingBalanceNet"] = floatVal($clsBalanceNet); 
    $arr["accountName"] = $accountName;
    $arr["aliasName"] = $aliasName;
    $arr["netOffDate"] = $netOffDate;
}

// make it json format
echo (json_encode($arr));
?>