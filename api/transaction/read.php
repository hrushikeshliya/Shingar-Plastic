<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/transaction.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
$obj = new Transaction($db);

$obj->type = isset($_GET['type']) ? $_GET['type'] : die(); 

if($obj->type == 'JOU') {
    $stmt = $obj->readJournal();
} else if ($obj->type == 'dayBook') {
    $stmt = $obj->readDayBook();
}

$num = $stmt->rowCount();

$currentDate = "";
$debitTotal = 0;
$creditTotal = 0;
$currentOpeningBalance = 0;
$closingBalance = 0;

if($num>0){

    $arr = array();

    if($obj->type == 'JOU') {
        $arr["transaction"]=array();
    } else {
        $arr["dayBook"] = array();
        $debitTransactions = array();
        $creditTransactions = array();
    }

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
            $currentOpeningBalance = 0;  
            $debitTransactions = array();
            $creditTransactions = array();
            $currentDate = $date;
            $debitTotal = 0;
            $creditTotal = 0;
            $closingBalance = 0;

        } 
            $currentDate = $date;
            $currentOpeningBalance = $openingBalance;
            $arr_item=array(
                "id" => $id,
                "type" => $type,
                "date" => $date,
                "debitAccount" => $debitAccount,
                "creditAccount" => $creditAccount,
                "amount" => floatval($amount),
                "username" => $username,
                "narration" => $narration
            );

            if($type == 'PAY') {
                $debitTotal += $amount;
                array_push($debitTransactions, $arr_item);
            } else if ($type == 'REC') {
                $creditTotal += $amount;
                array_push($creditTransactions, $arr_item);
            } else if($type == 'JOU'){
                array_push($arr["transaction"],$arr_item);
            } 
        

    }

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
}
 

else{
    echo json_encode(
        array("message" => "No Records found.")
    );
}

?>