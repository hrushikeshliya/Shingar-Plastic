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
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$user = new User($db);
echo("<script>console.log('PHP: ');</script>");
$user->username = isset($_POST['username']) ? $_POST['username'] : die(); 
$user->password = isset($_POST['password']) ? $_POST['password'] : die(); 

$stmt = $user->authenticate();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){ 
    setcookie("username", $_POST['username'], time() + (86400 * 30), "/");
    header("location: ../../home.php"); 
} else {
    header("location: ../../index.php?status=failed"); 

}    
?>