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

	function readSaleReport(){	
        $query = "select a.name,a.aliasName,s.*,
        a.openingBalance,
        COALESCE(tr.payment,0) payment,
        (s.total + a.openingBalance) - COALESCE(tr.payment,0) closingBalance
        from saleReport s
        LEFT JOIN account a ON a.id = s.id
        LEFT JOIN (select debitAccount name, SUM(amount) payment from transaction where type = 'REC' AND deleted = 0 GROUP BY debitAccount) tr ON tr.name = a.name";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readPurchaseReport(){	
        $query = "select a.name,a.aliasName,s.*,
        a.openingBalance,
        COALESCE(tp.payment,0) payment,
        (s.total + a.openingBalance) + COALESCE(tp.payment,0) closingBalance
        from purchaseReport s
        LEFT JOIN account a ON a.id = s.id
        LEFT JOIN (select creditAccount name, SUM(amount) payment from transaction where type = 'PAY' AND deleted = 0 GROUP BY debitAccount) tp ON tp.name = a.name";		
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readFullLedger(){	
        $query = "
        
        SELECT  CONCAT('SAL_',d.billCode,'_',s.invoiceId ) id, s.date,'SALES' account, s.grandTotal amount, s.narration, a.openingBalance, aty.name  FROM sale s
        LEFT JOIN department d ON s.departmentId = d.Id
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        s.accountId = :accountId
        AND s.deleted = 0

        UNION

        SELECT  CONCAT('PUR_',d.billCode,'_',s.invoiceId ) id, s.date,'PURCHASE' account, s.grandTotal amount, s.narration, a.openingBalance, aty.name  FROM purchase s
        LEFT JOIN department d ON s.departmentId = d.Id
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        s.accountId = :accountId
        AND s.deleted = 0
        
        ORDER BY DATE ASC
        ";	
        
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        
	    $stmt->execute();	 	
	    return $stmt;	
    }
	
}

?>