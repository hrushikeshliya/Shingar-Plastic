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
        LEFT JOIN (select debitAccount name,creditAccount, SUM(amount) payment from transaction 
        where 
        (type = 'REC' OR (type = 'JOU' AND creditAccount = 'DISCOUNT A/C')) 
        AND deleted = 0 GROUP BY debitAccount) tr ON tr.name = a.name
        ORDER BY a.aliasName";	
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
        LEFT JOIN (select creditAccount name, debitAccount, SUM(amount) payment from transaction 
        where 
        (type = 'PAY' OR (type = 'JOU' AND debitAccount = 'DISCOUNT A/C')) 
        AND deleted = 0 GROUP BY creditAccount) tp ON tp.name = a.name
        ORDER BY a.aliasName";		
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readFullLedger(){	
        $query = "
        
        select 
        CONCAT('JOB_',mr.id) id, 
        mr.date, 
        'JOB' account,
        mr.jobCharge amount, 
        mr.narration, 
        a.openingBalance,
        aty.name
        FROM materialReceive mr
        LEFT JOIN materialIssue mi ON mr.issueID = mi.id
        LEFT JOIN account a ON a.id = mi.jobberId
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        a.id = :accountId
        AND mr.deleted = 0

        UNION

        SELECT  CONCAT('SAL_',d.billCode,'_',s.invoiceId ) id, s.date,
        'SALES' account, 
        (s.subTotal+(s.taxableAmount*s.billLimit*tax/10000)) amount, 
        s.narration, a.openingBalance, aty.name  
        FROM sale s
        LEFT JOIN department d ON s.departmentId = d.Id
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        s.accountId = :accountId
        AND s.deleted = 0

        UNION

        SELECT  
        CONCAT('SAL_RET_',d.billCode,'_',sr.returnId ) id, 
        sr.date,
        'SALES RETURN' account, 
        sr.totalAmount amount, 
        sr.narration, 
        a.openingBalance, 
        CONCAT(aty.name,'_RETURN') name 
        FROM sale s
        LEFT JOIN saleReturn sr ON s.id = sr.invoiceId and sr.deleted = 0
        LEFT JOIN department d ON s.departmentId = d.Id
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        s.accountId = :accountId
        AND s.deleted = 0
        AND sr.totalAmount IS NOT NULL

        UNION

        SELECT  
        CONCAT('PUR_',d.billCode,'_',s.invoiceId ) id, 
        s.date,
        'PURCHASE' account, 
        s.grandTotal amount, 
        s.narration, 
        a.openingBalance, 
        aty.name  
        FROM purchase s
        LEFT JOIN department d ON s.departmentId = d.Id
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        s.accountId = :accountId
        AND s.deleted = 0

        UNION

        SELECT  
        CONCAT('PUR_RET_',d.billCode,'_',sr.returnId ) id, 
        sr.date,
        'PURCHASE RETURN' account, 
        sr.totalAmount amount, 
        sr.narration, 
        a.openingBalance, 
        CONCAT(aty.name,'_RETURN') name  FROM purchase s
        LEFT JOIN purchaseReturn sr ON s.id = sr.invoiceId AND sr.deleted = 0
        LEFT JOIN department d ON s.departmentId = d.Id
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN accountType aty ON aty.id = a.typeId
        where 
        s.accountId = :accountId
        AND s.deleted = 0
        AND sr.totalAmount IS NOT NULL
        
        ORDER BY DATE ASC
        ";	
        
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        
	    $stmt->execute();	 	
	    return $stmt;	
    }
	
}

?>