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
include_once '../objects/invoiceDetail.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
$transactions = new Transaction($db);
$account = new Account($db);
$invoice_details = new InvoiceDetail($db);

// set ID property of User to be edited
$type = isset($_GET['type']) ? $_GET['type'] : die();

$startDate = isset($_GET['startDate']) ? $_GET['startDate'] : die();
$endDate = isset($_GET['endDate']) ? $_GET['endDate'] : die();

if($type=='sale') {
    $stmt = $transactions->readSaleReport($startDate, $endDate);
} else if($type=='purchase') {
    $stmt = $transactions->readPurchaseReport($startDate, $endDate);
}

if($type=='sale' || $type=='purchase') {
    $arr=array();

    $arr["reports"]=array();
    $opening = array();
    $closing = array();
    $fiscalPayment = array();

    $stmt2 = $transactions->readBalanceByDate2($startDate,"Opening");
    $stmt3 = $transactions->readBalanceByDate2($endDate,"Closing");
    $stmt4 = $transactions->readFiscalPayment($startDate,$endDate);

    while ($row1 = $stmt3->fetch(PDO::FETCH_ASSOC)){
        array_push($closing, $row1);
    }

    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
        array_push($opening, $row2);
    }

    while ($row3 = $stmt4->fetch(PDO::FETCH_ASSOC)){
        array_push($fiscalPayment, $row3);
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        $id = $row["id"];
        $expected = array_filter($opening, function ($var) use ($id) {
            return ($var['id'] == $id);
        });

        foreach($expected  as $obj){
            $row["openingBalance"] = round(floatVal($obj["balance"]),2);      
        }

        $expected = array_filter($closing, function ($var) use ($id) {
            return ($var['id'] == $id);
        });

        foreach($expected  as $obj){
            $row["closingBalance"] = round(floatVal($obj["balance"]),2);        
        }

        $expected = array_filter($fiscalPayment, function ($var) use ($id) {
            return ($var['id'] == $id);
        });

        foreach($expected  as $obj){
            $row["payment"] = round(floatVal($obj["payment"]),2);         
        }

        $row["january"] = round(floatVal($row["january"]),2);
        $row["february"] = round(floatVal($row["february"]),2);
        $row["march"] = round(floatVal($row["march"]),2);
        $row["april"] = round(floatVal($row["april"]),2);
        $row["may"] = round(floatVal($row["may"]),2);
        $row["june"] = round(floatVal($row["june"]),2);
        $row["july"] = round(floatVal($row["july"]),2);
        $row["august"] = round(floatVal($row["august"]),2);
        $row["september"] = round(floatVal($row["september"]),2);
        $row["october"] = round(floatVal($row["october"]),2);
        $row["november"] = round(floatVal($row["november"]),2);
        $row["december"] = round(floatVal($row["december"]),2);
        $row["total"] = round(floatVal($row["total"]),2);


        if($type=='sale'){

            if($row["openingBalance"]>0 && $row["payment"]>$row["openingBalance"] && $row["payment"]!=0) {
                $row["payment"] -= $row["openingBalance"];
                $row["openingBalance"] = 0;
            } else if ($row["openingBalance"]>0 && $row["payment"]<=$row["openingBalance"] && $row["payment"]!=0) {
                $row["openingBalance"] -= $row["payment"];
                $row["payment"] = 0;
            }
            
            if($row["november"]>0 && $row["payment"]>$row["november"] && $row["payment"]!=0) {
                $row["payment"] -= $row["november"];
                $row["november"] = 0;
            } else if ($row["november"]>0 && $row["payment"]<=$row["november"] && $row["payment"]!=0) {
                $row["november"] -= $row["payment"];
                $row["payment"] = 0;
            }
            
            if($row["december"]>0 && $row["payment"]>$row["december"] && $row["payment"]!=0) {
                $row["payment"] -= $row["december"];
                $row["december"] = 0;
            } else if ($row["december"]>0 && $row["payment"]<=$row["december"] && $row["payment"]!=0) {
                $row["december"] -= $row["payment"];
                $row["payment"] = 0;
            }
            
            if($row["january"]>0 && $row["payment"]>$row["january"] && $row["payment"]!=0) {
                $row["payment"] -= $row["january"];
                $row["january"] = 0;
            } else if ($row["january"]>0 && $row["payment"]<=$row["january"] && $row["payment"]!=0) {
                $row["january"] -= $row["payment"];
                $row["payment"] = 0;
            }
            
            if($row["february"]>0 && $row["payment"]>$row["february"] && $row["payment"]!=0) {
                $row["payment"] -= $row["february"];
                $row["february"] = 0;
            } else if ($row["february"]>0 && $row["payment"]<=$row["february"] && $row["payment"]!=0) {
                $row["february"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["march"]>0 && $row["payment"]>$row["march"] && $row["payment"]!=0) {
                $row["payment"] -= $row["march"];
                $row["march"] = 0;
            } else if ($row["march"]>0 && $row["payment"]<=$row["march"] && $row["payment"]!=0) {
                $row["march"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["april"]>0 && $row["payment"]>$row["april"] && $row["payment"]!=0) {
                $row["payment"] -= $row["april"];
                $row["april"] = 0;
            } else if ($row["april"]>0 && $row["payment"]<=$row["april"] && $row["payment"]!=0) {
                $row["april"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["may"]>0 && $row["payment"]>$row["may"] && $row["payment"]!=0) {
                $row["payment"] -= $row["may"];
                $row["may"] = 0;
            } else if ($row["may"]>0 && $row["payment"]<=$row["may"] && $row["payment"]!=0) {
                $row["may"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["june"]>0 && $row["payment"]>$row["june"] && $row["payment"]!=0) {
                $row["payment"] -= $row["june"];
                $row["june"] = 0;
            } else if ($row["june"]>0 && $row["payment"]<=$row["june"] && $row["payment"]!=0) {
                $row["june"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["july"]>0 && $row["payment"]>$row["july"] && $row["payment"]!=0) {
                $row["payment"] -= $row["july"];
                $row["july"] = 0;
            } else if ($row["july"]>0 && $row["payment"]<=$row["july"] && $row["payment"]!=0) {
                $row["july"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["august"]>0 && $row["payment"]>$row["august"] && $row["payment"]!=0) {
                $row["payment"] -= $row["august"];
                $row["august"] = 0;
            } else if ($row["august"]>0 && $row["payment"]<=$row["august"] && $row["payment"]!=0) {
                $row["august"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["september"]>0 && $row["payment"]>$row["september"] && $row["payment"]!=0) {
                $row["payment"] -= $row["september"];
                $row["september"] = 0;
            } else if ($row["september"]>0 && $row["payment"]<=$row["september"] && $row["payment"]!=0) {
                $row["september"] -= $row["payment"];
                $row["payment"] = 0;
            }

            if($row["october"]>0 && $row["payment"]>$row["october"] && $row["payment"]!=0) {
                $row["payment"] -= $row["october"];
                $row["october"] = 0;
            } else if ($row["october"]>0 && $row["payment"]<=$row["october"] && $row["payment"]!=0) {
                $row["october"] -= $row["payment"];
                $row["payment"] = 0;
            }
            
        } else if ($type=='purchase'){

            if($row["openingBalance"]<0 && $row["payment"]>($row["openingBalance"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["openingBalance"];
                $row["openingBalance"] = 0;
            } else if ($row["openingBalance"]<0 && $row["payment"]<=($row["openingBalance"]*-1) && $row["payment"]!=0) {
                $row["openingBalance"] += $row["payment"];
                $row["payment"] = 0;
            }
            
            if($row["november"]<0 && $row["payment"]>($row["november"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["november"];
                $row["november"] = 0;
            } else if ($row["november"]<0 && $row["payment"]<=($row["november"]*-1) && $row["payment"]!=0) {
                $row["november"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["december"]<0 && $row["payment"]>($row["december"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["december"];
                $row["december"] = 0;
            } else if ($row["december"]<0 && $row["payment"]<=($row["december"]*-1) && $row["payment"]!=0) {
                $row["december"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["january"]<0 && $row["payment"]>($row["january"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["january"];
                $row["january"] = 0;
            } else if ($row["january"]<0 && $row["payment"]<=($row["january"]*-1) && $row["payment"]!=0) {
                $row["january"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["february"]<0 && $row["payment"]>($row["february"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["february"];
                $row["february"] = 0;
            } else if ($row["february"]<0 && $row["payment"]<=($row["february"]*-1) && $row["payment"]!=0) {
                $row["february"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["march"]<0 && $row["payment"]>($row["march"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["march"];
                $row["march"] = 0;
            } else if ($row["march"]<0 && $row["payment"]<=($row["march"]*-1) && $row["payment"]!=0) {
                $row["march"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["april"]<0 && $row["payment"]>($row["april"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["april"];
                $row["april"] = 0;
            } else if ($row["april"]<0 && $row["payment"]<=($row["april"]*-1) && $row["payment"]!=0) {
                $row["april"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["may"]<0 && $row["payment"]>($row["may"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["may"];
                $row["may"] = 0;
            } else if ($row["may"]<0 && $row["payment"]<=($row["may"]*-1) && $row["payment"]!=0) {
                $row["may"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["june"]<0 && $row["payment"]>($row["june"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["june"];
                $row["june"] = 0;
            } else if ($row["june"]<0 && $row["payment"]<=($row["june"]*-1) && $row["payment"]!=0) {
                $row["june"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["july"]<0 && $row["payment"]>($row["july"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["july"];
                $row["july"] = 0;
            } else if ($row["july"]<0 && $row["payment"]<=($row["july"]*-1) && $row["payment"]!=0) {
                $row["july"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["august"]<0 && $row["payment"]>($row["august"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["august"];
                $row["august"] = 0;
            } else if ($row["august"]<0 && $row["payment"]<=($row["august"]*-1) && $row["payment"]!=0) {
                $row["august"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["september"]<0 && $row["payment"]>($row["september"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["september"];
                $row["september"] = 0;
            } else if ($row["september"]<0 && $row["payment"]<=($row["september"]*-1) && $row["payment"]!=0) {
                $row["september"] += $row["payment"];
                $row["payment"] = 0;
            }

            if($row["october"]<0 && $row["payment"]>($row["october"]*-1) && $row["payment"]!=0) {
                $row["payment"] += $row["october"];
                $row["october"] = 0;
            } else if ($row["october"]<0 && $row["payment"]<=($row["october"]*-1) && $row["payment"]!=0) {
                $row["october"] += $row["payment"];
                $row["payment"] = 0;
            }

        }



        array_push($arr["reports"], $row); 
    }

} else if ($type=='ledger') {
    $arr=array();
    $id = isset($_GET['id']) ? $_GET['id'] : die();
    $partialStartDate = isset($_GET['partialStartDate']) ? $_GET['partialStartDate'] : die();
    $partialEndDate = isset($_GET['partialEndDate']) ? $_GET['partialEndDate'] : die();

    $debitTransactions = array();
    $creditTransactions = array();

    $debitTransactionsNet = array();
    $creditTransactionsNet = array();

    $debitTransactionsPartial = array();
    $creditTransactionsPartial = array();

    $account->id = $id;
    $transactions->accountId = $id;
    
    $stmt = $transactions->readFullLedger($startDate, $endDate);
    
    $stmt0 = $account->readOne();
    $stmt1 = $transactions->readNetOffDate();

    $accountName = "";
    $aliasName = "";
    while ($row0 = $stmt0->fetch(PDO::FETCH_ASSOC)){
        extract($row0);
        $accountName = $name;
        $aliasName = $aliasName;
    }
    
    $netOffDate = "";
    while ($row1 = $stmt1->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $netOffDate = $netOffDate;

        if(strcmp(0, $netOffDate) == 0 || strcmp($netOffDate, $startDate) < 0){
            $netOffDate = new DateTime($startDate);
            $netOffDate->modify('-1 day');
            $netOffDate = $netOffDate->format('Y-m-d');
        }

        if(strcmp($netOffDate, $endDate) >= 0){
            $netOffDate = $endDate;
        }
    }

    $stmt2 = $transactions->readBalanceByDate($startDate,"Opening"); 
    $stmt5 = $transactions->readBalanceByDate($endDate,"Closing");
    $openingBalance = 0;
    $closingBalanceExpected = 0;
    while ($row1 = $stmt2->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $openingBalance = $balance;
    }
    while ($row1 = $stmt5->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $closingBalanceExpected = $balance;
    }
    $debit = 0;
    $credit = 0;

    $stmt3 = $transactions->readBalanceByDate($netOffDate,"Closing");
    $stmt6 = $transactions->readBalanceByDate($endDate,"Closing");
    $openingBalanceNet = 0;
    $closingBalanceNetExpected = 0;
    while ($row1 = $stmt3->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $openingBalanceNet = $balance;
    }
    while ($row1 = $stmt6->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $closingBalanceNetExpected = $balance;
    }
    $netDebit = 0;
    $netCredit = 0;

    $stmt4 = $transactions->readBalanceByDate($partialStartDate,"Opening");
    $stmt7 = $transactions->readBalanceByDate($partialEndDate,"Closing");
    $openingBalancePartial = 0;
    $closingBalancePartialExpected = 0;
    while ($row1 = $stmt4->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $openingBalancePartial = $balance;
    }
    while ($row1 = $stmt7->fetch(PDO::FETCH_ASSOC)){
        extract($row1);
        $closingBalancePartialExpected = $balance;
    }
    $partialDebit = 0;
    $partialCredit = 0;

    // Read Account BY ID 
    // IF TYPE = DEBTORS THEN DEBIT = SALE, CREDIT = PAYMENT RCVD
    // IF TYPE = CREDITORS THEN DEBIT = PAYMENT, CREDIT = PAYMENT MADE

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
    
        if($transactionType == 'DEBIT TRANSACTION') {
            $debit += $amount;
            array_push($debitTransactions, $row);

            if(strcmp($date, $netOffDate) >0) {
                array_push($debitTransactionsNet, $row);
                $netDebit += $amount;
            }

            if(strcmp($date, $partialStartDate) >= 0 && strcmp($date, $partialEndDate) <= 0) {
                array_push($debitTransactionsPartial, $row);
                $partialDebit += $amount;
            }
        } else if($transactionType == 'CREDIT TRANSACTION'){
            $credit += $amount;
            array_push($creditTransactions, $row);

            if(strcmp($date, $netOffDate) >0) {
                array_push($creditTransactionsNet, $row);   
                $netCredit += $amount;             
            }

            if(strcmp($date, $partialStartDate) >= 0 && strcmp($date, $partialEndDate) <= 0) {
                array_push($creditTransactionsPartial, $row);
                $partialCredit += $amount;
            }
        }

    }

    $closingBalance = $openingBalance + $debit - $credit;
    $closingBalanceNet = $openingBalanceNet + $netDebit - $netCredit;
    $closingBalancePartial = $openingBalancePartial + $partialDebit - $partialCredit;

    $summary_by_hsn = array();
    $stmt_summary_hsn = $invoice_details->read_summary_by_hsn();

    while ($row_summary_hsn = $stmt_summary_hsn->fetch(PDO::FETCH_ASSOC)){
        extract($row_summary_hsn);
        array_push($summary_by_hsn, $row_summary_hsn);
    }

    $arr["debitTransactions"] = $debitTransactions; 
    $arr["creditTransactions"] = $creditTransactions; 
    $arr["openingBalance"] = floatVal($openingBalance); 
    $arr["closingBalance"] = floatVal($closingBalance); 
    $arr["closingBalanceExpected"] = floatVal($closingBalanceExpected); 

    $arr["debitTransactionsNet"] = $debitTransactionsNet; 
    $arr["creditTransactionsNet"] = $creditTransactionsNet; 
    $arr["openingBalanceNet"] = floatVal($openingBalanceNet); 
    $arr["closingBalanceNet"] = floatVal($closingBalanceNet); 
    $arr["closingBalanceNetExpected"] = floatVal($closingBalanceNetExpected); 

    $arr["debitTransactionsPartial"] = $debitTransactionsPartial; 
    $arr["creditTransactionsPartial"] = $creditTransactionsPartial;     
    $arr["openingBalancePartial"] = floatVal($openingBalancePartial); 
    $arr["closingBalancePartial"] = floatVal($closingBalancePartial); 
    $arr["closingBalancePartialExpected"] = floatVal($closingBalancePartialExpected); 
    
    $arr["accountName"] = $accountName;
    $arr["aliasName"] = $aliasName;
    $arr["netOffDate"] = $netOffDate;

    $arr["partialStartDate"] = $partialStartDate;
    $arr["partialEndDate"] = $partialEndDate;

    $arr["hsn_summary"] = $summary_by_hsn;
}

// make it json format
echo (json_encode($arr));
?>