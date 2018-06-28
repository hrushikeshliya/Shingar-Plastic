<?php

class SingleValues{

    // database connection and table name
    private $conn;

    // object properties
    public $id;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function readByType($type){	
        $query = "SELECT COALESCE(MAX(id),0)+1 as id FROM ".$type;	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readDistinctSaleAccount() {
        $query = "SELECT DISTINCT a.name FROM sale s LEFT JOIN account a ON s.accountId = a.id WHERE s.deleted!=1";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readQuantityByItem($type,$invoiceId,$itemId){	
        $query = "select 
        CASE WHEN MAX(si.quantity) IS NULL THEN 0 ELSE MAX(si.quantity) END - 
        CASE WHEN SUM(sri.quantity) IS NULL THEN 0 ELSE SUM(sri.quantity) END as quantity  
        from ".$type." s
        LEFT JOIN invoiceDetail si ON (s.id = si.invoiceId AND si.deleted = 0)
        LEFT JOIN ".$type."Return sr ON (s.id = sr.invoiceId AND sr.deleted = 0)
        LEFT JOIN invoiceDetail sri ON (sr.id = sri.invoiceId AND sri.deleted = 0)
        WHERE s.id = ".$invoiceId."
        AND si.itemId = ".$itemId."
        ";
        //$query = "SELECT COALESCE(SUM(quantity),0) as quantity FROM invoiceDetail WHERE type = '".$type."' AND itemId = ".$itemId." AND invoiceId = ".$invoiceId;	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
	
}

?>