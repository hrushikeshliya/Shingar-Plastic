<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/transaction.php';
include_once '../objects/account.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$obj = new Transaction($db);

$account = new Account($db);

$obj->type = isset($_GET['type']) ? $_GET['type'] : die(); 

$currentDate = "";
$debitTotal = 0;
$creditTotal = 0;
$currentOpeningBalance = 0;
$closingBalance = 0;

$arr = array();
$account->id = 29;
$stmt0 = $account->readOne();
$row0 = $stmt0->fetch(PDO::FETCH_ASSOC);
$currentOpeningBalance = $row0['openingBalance'];

if(isset($_GET['startDate'])) {
    $obj->startDate = $_GET['startDate'];
    $stmt0 = $obj->readDayBookOpening();
    $row0 = $stmt0->fetch(PDO::FETCH_ASSOC);
    $currentOpeningBalance = $row0['openingBalance'];
}

if(isset($_GET['endDate'])) {
    $obj->endDate = $_GET['endDate'];
}

if($obj->type == 'JOU') {
    $arr["transaction"]=array();
    $stmt = $obj->readJournal();
} else if ($obj->type == 'dayBook') {
    $arr["dayBook"] = array();
    $stmt = $obj->readDayBook();
    $debitTransactions = array();
    $creditTransactions = array();
} else if($obj->type=='amountTillDate') {
    $arr["payment"]=array();
    $obj->id = isset($_GET['id']) ? $_GET['id'] : die();

    if(isset($_GET['date'])) {
        $obj->date = $_GET['date'];
    } else {
        $obj->date = "GETDATE()";
    }

    $stmt = $obj->readAmountTillDate();
}

$num = $stmt->rowCount();

if($num>0){

    if($obj->type=='dayBook') {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        
        if($currentDate != $date && $currentDate != ""){

                $closingBalance = $currentOpeningBalance - $debitTotal + $creditTotal;

                $dayBook = array(
                    "date" => $currentDate,
                    "debitTransactions" => $debitTransactions,
                    "debitTotal" => floatval($debitTotal),
                    "creditTransactions" => $creditTransactions,
                    "creditTotal" => floatval($creditTotal),
                    "openingBalance" => floatval($currentOpeningBalance),
                    "closingBalance" => floatval($closingBalance)
                );

                array_push($arr["dayBook"],$dayBook);
        
            // Reset Stuff For New DayBook  
           
            $debitTransactions = array();
            $creditTransactions = array();
            $currentDate = $date;
            $debitTotal = 0;
            $creditTotal = 0;
            $currentOpeningBalance = $closingBalance; 
            $closingBalance = 0;

        } 

        
            $currentDate = $date;

            if($type == 'PAY') {
                $debitTotal += $amount;
                array_push($debitTransactions, $row);
            } else if ($type == 'REC') {
                $creditTotal += $amount;
                array_push($creditTransactions, $row);
            }         
    } // end of while


    $closingBalance = $currentOpeningBalance - $debitTotal + $creditTotal;

    $dayBook = array(
        "date" => $currentDate,
        "debitTransactions" => $debitTransactions,
        "debitTotal" => floatval($debitTotal),
        "creditTransactions" => $creditTransactions,
        "creditTotal" => floatval($creditTotal),
        "openingBalance" => floatval($currentOpeningBalance),
        "closingBalance" => floatval($closingBalance)
    );

    array_push($arr["dayBook"],$dayBook);

    echo json_encode($arr);
} else if ($obj->type == 'JOU') {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($arr["transaction"], $row); 
    }
 
    echo json_encode($arr);
} else {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($arr["payment"], $row); 
    }
 
    echo json_encode($arr);
}

} else {
    echo json_encode(
        array("message" => "No Records found.")
    );
}

?>