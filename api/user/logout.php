<?php
// Starting session
session_start();
 
// Removing session data
if(isset($_SESSION["username"])){
    unset($_SESSION["username"]);
}

header("location: ../../index.php"); 
?>