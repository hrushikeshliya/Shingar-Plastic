<?php

class Sale{

    // database connection and table name
    private $conn;

    // object properties
    public $id;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function readSaleInvoiceId(){	
	    $query = "SELECT MAX(id)+1 FROM sale";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
	
}

?>