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

	function readSaleReport($type){	
        $query = "select a.name,a.aliasName,s.*,
        a.openingBalance,
        COALESCE(tr.payment-tp.payment,0) payment,
        (s.total + a.openingBalance) - COALESCE(tr.payment-tp.payment,0) closingBalance
        from saleReport s
        LEFT JOIN account a ON a.id = s.id
        LEFT JOIN (select debitAccount name, SUM(amount) payment from transaction where type = 'REC' AND deleted = 0 GROUP BY debitAccount) tr ON tr.name = a.name
        LEFT JOIN (select creditAccount name, SUM(amount) payment from transaction where type = 'PAY' AND deleted = 0 GROUP BY debitAccount) tp ON tp.name = a.name";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readPurchaseReport($type){	
        $query = "select a.name,a.aliasName,s.*,
        a.openingBalance,
        COALESCE(tr.payment-tp.payment,0) payment,
        (s.total + a.openingBalance) - COALESCE(tr.payment-tp.payment,0) closingBalance
        from saleReport s
        LEFT JOIN account a ON a.id = s.id
        LEFT JOIN (select debitAccount name, SUM(amount) payment from transaction where type = 'REC' AND deleted = 0 GROUP BY debitAccount) tr ON tr.name = a.name
        LEFT JOIN (select creditAccount name, SUM(amount) payment from transaction where type = 'PAY' AND deleted = 0 GROUP BY debitAccount) tp ON tp.name = a.name";		
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
	
}

?>