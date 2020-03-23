<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
include_once '../objects/financialYear.php';
  
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$user = new User($db);
$financialYear = new FinancialYear($db);

$user->username = isset($_POST['username']) ? $_POST['username'] : die(); 
$user->password = isset($_POST['password']) ? $_POST['password'] : die(); 
$financialYear->displayName = isset($_POST['financialYear']) ? $_POST['financialYear'] : die(); 
$stmt = $user->authenticate();
$num = $stmt->rowCount();


// check if more than 0 record found
if($num>0){ 
    $stmt2 = $financialYear->readOne();

    if($stmt2->rowCount() == 1){
        $row = $stmt2->fetch(PDO::FETCH_ASSOC);
        
        setcookie("username", $_POST['username'], time() + (86400 * 30), "/");
        setcookie("financialYear", $_POST['financialYear'], time() + (86400 * 30), "/");
        setcookie("startDate", $row['startDate'], time() + (86400 * 30), "/");
        setcookie("endDate", $row['endDate'], time() + (86400 * 30), "/");
        header("location: ../../home.php"); 
    } else {
        die();
    }

} else {
    header("location: ../../index.php?status=failed"); 
}    
?>