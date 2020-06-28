<?php

class Reports{

    // database connection and table name
    private $conn;

    // object properties
    public $id;
    public $accountId;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}


	
}

?>