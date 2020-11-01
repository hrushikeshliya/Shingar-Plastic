<?php

class Transaction{

    // database connection and table name
    private $conn;
    private $table_name = "transaction";
 
    // object properties
    public $id;
    public $type;
    public $date;
    public $debitAccount;
    public $creditAccount;
    public $debitAccountId;
    public $creditAccountId;
    public $amount;
    public $narration;
    public $username;
    public $deleted;

    public $accountId;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

    // checked    
	function readJournal(){	
        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND t.date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND t.date<='".$this->endDate."'";
        }

        $query = "
        SELECT t.*, da.aliasName debitAccount, ca.aliasName creditAccount FROM " . $this->table_name . " t 
        LEFT JOIN account da ON da.id = t.debitAccountId
        LEFT JOIN account ca ON ca.id = t.creditAccountId
        where t.deleted = 0 AND t.type = 'JOU' ".$whereClause."  ORDER BY t.date desc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    //checked
	function readDayBook(){	
        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND t.date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND t.date<='".$this->endDate."'";
        }


        $query = "SELECT t.*, da.aliasName debitAccount, ca.aliasName creditAccount FROM " . $this->table_name . " t 
        LEFT JOIN account da ON da.id = t.debitAccountId
        LEFT JOIN account ca ON ca.id = t.creditAccountId
        where t.deleted = 0 AND t.type IN ('PAY', 'REC') ".$whereClause." ORDER BY t.date asc";	
        
        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
	    return $stmt;	
    }

    //checked
    function readOne(){	
	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 AND id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    //checked
    function readNetOffDate(){	
        $query = "
        select COALESCE(MAX(date),0) netOffDate from transaction t
        LEFT JOIN account a ON t.creditAccountId = a.id OR t.debitAccountId = a.id
        where a.id = :id AND t.type = 'JOU'
        AND t.deleted = 0
        ";	

        $stmt = $this->conn->prepare($query);	

        $this->id=htmlspecialchars(strip_tags($this->id));
        // bind new values
        $stmt->bindParam(':id', $this->accountId);
        
	    $stmt->execute();	 	
	    return $stmt;	
    }

    //checked
    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET

                debitAccountName = :debitAccount,
                creditAccountName = :creditAccount,
                debitAccountId = :debitAccountId,
                creditAccountId = :creditAccountId,
                amount = :amount,
                narration = :narration,
                username = :username,
                date = :date,
                updatedDate = SYSDATE() 
                    
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->debitAccount=htmlspecialchars(strip_tags($this->debitAccount));
        $this->crediAccount=htmlspecialchars(strip_tags($this->creditAccount));
        $this->narration=htmlspecialchars(strip_tags($this->narration));
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':debitAccount', $this->debitAccount);
        $stmt->bindParam(':creditAccount', $this->creditAccount);
        $stmt->bindParam(':debitAccountId', $this->debitAccountId);
        $stmt->bindParam(':creditAccountId', $this->creditAccountId);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':amount', $this->amount);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':id', $this->id);

        try {
            $stmt->execute();
            return true;
        }catch(PDOException $e) {
            echo "Internal Server Error : " . $e->getMessage();
            return false;
        }
    
    }

    //checked
    function delete(){
    
        $query = "UPDATE " . $this->table_name . " SET deleted = 1, updatedDate = SYSDATE() WHERE Id = ?"; 
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    //checked
    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET
                       type=:type,
                       date = :date,
                       debitAccountName = :debitAccount,
                       creditAccountName = :creditAccount,
                       debitAccountId = :debitAccountId,
                       creditAccountId = :creditAccountId,
                       amount = :amount,
                       narration = :narration,
                       username = :username ";
        
                       $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->type=htmlspecialchars(strip_tags($this->type));
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->debitAccount=htmlspecialchars(strip_tags($this->debitAccount));
        $this->crediAccount=htmlspecialchars(strip_tags($this->creditAccount));
        $this->narration=htmlspecialchars(strip_tags($this->narration));
        $this->username=htmlspecialchars(strip_tags($this->username));
        
        // bind new values
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':debitAccount', $this->debitAccount);
        $stmt->bindParam(':creditAccount', $this->creditAccount);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':amount', $this->amount);
        $stmt->bindParam(':debitAccountId', $this->debitAccountId);
        $stmt->bindParam(':creditAccountId', $this->creditAccountId);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
    }	

    //checked
    function readBalanceByDate($date, $type) {

        $condition = "";

        if($type == 'Closing'){
            $condition = "<='".$date."'";
        } else if ($type == 'Opening') {
            $condition = "<'".$date."'";
        }

        $query = "
        select a.id,aty.name,openingBalance initialOpeningBalance, 
        COALESCE(credit.amount,0) creditAmount, 
        COALESCE(debit.amount,0) debitAmount,
        COALESCE(job.amount,0) jobAmount,
        COALESCE(sale.amount,0) saleAmount,
        COALESCE(saleReturn.amount,0) saleReturnAmount,
        COALESCE(purchase.amount,0) purchaseAmount,
        COALESCE(purchaseReturn.amount,0) purchaseReturnAmount,
        CASE 
        WHEN aty.name = 'JOBBER' THEN (a.openingBalance+COALESCE(credit.amount,0)-COALESCE(job.amount,0))
        WHEN aty.name = 'DEBTORS' THEN (a.openingBalance-COALESCE(debit.amount,0)-COALESCE(credit.amount,0)+COALESCE(sale.amount,0)-COALESCE(saleReturn.amount,0))
        WHEN aty.name = 'CREDITORS' THEN (a.openingBalance+COALESCE(credit.amount,0)-COALESCE(purchase.amount,0)+COALESCE(purchaseReturn.amount,0))
        ELSE (a.openingBalance-COALESCE(debit.amount,0)+COALESCE(credit.amount,0))
        END balance
        from account a
        LEFT JOIN accountType aty ON aty.Id = a.typeId
        LEFT JOIN (
        select creditAccountId, SUM(amount) amount  
        from `transaction` t
        where t.deleted = 0 AND t.`date` ".$condition."
        GROUP BY creditAccountId
        ) credit ON a.id = creditAccountId
        LEFT JOIN (
        select debitAccountId, SUM(amount) amount 
        from `transaction` t
        where t.deleted = 0 AND t.`date` ".$condition."
        GROUP BY debitAccountId
        ) debit ON a.id = debitAccountId
        LEFT JOIN (
        select mi.jobberId, SUM(mr.jobCharge) amount 
        from materialIssue mi
        INNER JOIN materialReceive mr ON mi.id = mr.issueId
        where mi.deleted = 0 AND mr.deleted = 0 AND mr.`date` ".$condition."
        GROUP BY mi.jobberId
        ) job ON a.id = jobberId
        LEFT JOIN (
        select accountId, SUM(grandTotal) amount 
        from sale s 
        where s.deleted = 0 AND s.`date` ".$condition."
        GROUP BY accountId
        ) sale ON a.id = sale.accountId
        LEFT JOIN (
        select sr.accountId, SUM(totalAmount) amount 
        from saleReturn sr 
        INNER JOIN sale s ON s.id = sr.invoiceId AND s.deleted = 0 
        where sr.deleted = 0 AND sr.`date` ".$condition."
        GROUP BY accountId
        ) saleReturn ON a.id = saleReturn.accountId
        LEFT JOIN (
        select accountId, SUM(grandTotal) amount 
        from purchase p 
        where p.deleted = 0 AND p.`date` ".$condition."
        GROUP BY accountId
        ) purchase ON a.id = purchase.accountId
        LEFT JOIN (
        select pr.accountId, SUM(totalAmount) amount 
        from purchaseReturn pr 
        INNER JOIN purchase p ON p.id = pr.invoiceId AND p.deleted = 0
        where pr.deleted = 0 AND pr.`date` ".$condition."
        GROUP BY accountId
        ) purchaseReturn ON a.id = purchaseReturn.accountId   where a.id = :accountId";	

        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
	    $stmt->execute();	 	
	    return $stmt;
    }

    //checked
    function readBalanceByDate2($date, $type) {

            $condition = "";
    
            if($type == 'Closing'){
                $condition = "<='".$date."'";
            } else if ($type == 'Opening') {
                $condition = "<'".$date."'";
            }
    
            $query = "
            select a.id,aty.name,openingBalance initialOpeningBalance, 
            COALESCE(credit.amount,0) creditAmount, 
            COALESCE(debit.amount,0) debitAmount,
            COALESCE(job.amount,0) jobAmount,
            COALESCE(sale.amount,0) saleAmount,
            COALESCE(saleReturn.amount,0) saleReturnAmount,
            COALESCE(purchase.amount,0) purchaseAmount,
            COALESCE(purchaseReturn.amount,0) purchaseReturnAmount,
            CASE 
            WHEN aty.name = 'JOBBER' THEN (a.openingBalance+COALESCE(credit.amount,0)-COALESCE(job.amount,0))
            WHEN aty.name = 'DEBTORS' THEN (a.openingBalance-COALESCE(debit.amount,0)-COALESCE(credit.amount,0)+COALESCE(sale.amount,0)-COALESCE(saleReturn.amount,0))
            WHEN aty.name = 'CREDITORS' THEN (a.openingBalance+COALESCE(credit.amount,0)-COALESCE(purchase.amount,0)+COALESCE(purchaseReturn.amount,0))
            ELSE (a.openingBalance-COALESCE(debit.amount,0)+COALESCE(credit.amount,0))
            END balance
            from account a
            LEFT JOIN accountType aty ON aty.Id = a.typeId
            LEFT JOIN (
            select creditAccountId, SUM(amount) amount  
            from `transaction` t
            where t.deleted = 0 AND t.`date` ".$condition."
            GROUP BY creditAccountId
            ) credit ON a.id = creditAccountId
            LEFT JOIN (
            select debitAccountId, SUM(amount) amount 
            from `transaction` t
            where t.deleted = 0 AND t.`date` ".$condition."
            GROUP BY debitAccountId
            ) debit ON a.id = debitAccountId
            LEFT JOIN (
            select mi.jobberId, SUM(mr.jobCharge) amount 
            from materialIssue mi
            INNER JOIN materialReceive mr ON mi.id = mr.issueId
            where mi.deleted = 0 AND mr.deleted = 0 AND mr.`date` ".$condition."
            GROUP BY mi.jobberId
            ) job ON a.id = jobberId
            LEFT JOIN (
            select accountId, SUM(grandTotal) amount 
            from sale s 
            where s.deleted = 0 AND s.`date` ".$condition."
            GROUP BY accountId
            ) sale ON a.id = sale.accountId
            LEFT JOIN (
            select sr.accountId, SUM(totalAmount) amount 
            from saleReturn sr 
            INNER JOIN sale s ON s.id = sr.invoiceId AND s.deleted = 0 
            where sr.deleted = 0 AND sr.`date` ".$condition."
            GROUP BY accountId
            ) saleReturn ON a.id = saleReturn.accountId
            LEFT JOIN (
            select accountId, SUM(grandTotal) amount 
            from purchase p 
            where p.deleted = 0 AND p.`date` ".$condition."
            GROUP BY accountId
            ) purchase ON a.id = purchase.accountId
            LEFT JOIN (
            select pr.accountId, SUM(totalAmount) amount 
            from purchaseReturn pr 
            INNER JOIN purchase p ON p.id = pr.invoiceId AND p.deleted = 0
            where pr.deleted = 0 AND pr.`date` ".$condition."
            GROUP BY accountId
            ) purchaseReturn ON a.id = purchaseReturn.accountId";	
    
            $stmt = $this->conn->prepare($query);	
            $stmt->execute();	 	
            return $stmt;
    }

    //checked
    function readFiscalPayment($startDate, $endDate){
        $query = "
		select a.id, 0+COALESCE(SUM(t1.amount),0)+COALESCE(SUM(t2.amount),0) payment
		from 
        account a
		LEFT JOIN transaction t1 ON a.id = t1.debitAccountId AND a.deleted = 0 AND t1.deleted = 0 AND t1.date>='".$startDate."' AND t1.date<='".$endDate."' AND (t1.type = 'REC' OR (t1.type = 'JOU' AND t1.creditAccountId = 30)) 
        LEFT JOIN transaction t2 ON a.id = t2.creditAccountId AND a.deleted = 0 AND t2.deleted = 0 AND t2.date>='".$startDate."' AND t2.date<='".$endDate."' AND (t2.type = 'PAY' OR (t2.type = 'JOU' AND t2.debitAccountId = 30)) 
		GROUP BY a.id
        ";

        $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;
    }
    //checked
    function readSaleReport($startDate, $endDate){	
        $query = "select a.name,a.aliasName,s.*
        from (
            select
            a.id AS id,
            round(sum( if(( month( s.date )= 1 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `january`,
            round(sum( if(( month( s.date )= 2 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `february`,
            round(sum( if(( month( s.date )= 3 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `march`,
            round(sum( if(( month( s.date )= 4 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `april`,
            round(sum( if(( month( s.date )= 5 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `may`,
            round(sum( if(( month( s.date )= 6 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `june`,
            round(sum( if(( month( s.date )= 7 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `july`,
            round(sum( if(( month( s.date )= 8 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `august`,
            round(sum( if(( month( s.date )= 9 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `september`,
            round(sum( if(( month( s.date )= 10 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `october`,
            round(sum( if(( month( s.date )= 11 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `november`,
            round(sum( if(( month( s.date )= 12 ),( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* s.tax )/ 10000 )), 0 )),2) AS `december`,
            round(sum( coalesce(( s.subTotal-COALESCE(sr.totalAmount,0) +((( s.taxableAmount * s.billLimit )* `s`.`tax` )/ 10000 )), 0 )),2) AS `total`
        from account a 
        inner join accountType aty on a.typeId = aty.Id AND aty.name = 'DEBTORS'
        left join sale s on s.accountId = a.id and s.deleted = 0 and s.deleted = 0 AND s.date>='".$startDate."' AND s.date<='".$endDate."'
        left join saleReturn sr on sr.invoiceId = s.id AND sr.deleted = 0 AND sr.date>='".$startDate."' AND sr.date<='".$endDate."'
        where a.deleted = 0 and aty.deleted = 0
        group by a.id

        ) s
        LEFT JOIN account a ON a.id = s.id
        ORDER BY a.aliasName";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    //checked
    function readPurchaseReport($startDate, $endDate){	
        $query = "select a.name,a.aliasName,s.*
        from (
            select
            a.id AS id,
            round(sum( if(( month( s.date )= 1 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `january`,
            round(sum( if(( month( s.date )= 2 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `february`,
            round(sum( if(( month( s.date )= 3 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `march`,
            round(sum( if(( month( s.date )= 4 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `april`,
            round(sum( if(( month( s.date )= 5 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `may`,
            round(sum( if(( month( s.date )= 6 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `june`,
            round(sum( if(( month( s.date )= 7 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `july`,
            round(sum( if(( month( s.date )= 8 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `august`,
            round(sum( if(( month( s.date )= 9 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `september`,
            round(sum( if(( month( s.date )= 10 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `october`,
            round(sum( if(( month( s.date )= 11 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `november`,
            round(sum( if(( month( s.date )= 12 ),( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `december`,
            round(sum( coalesce(( s.grandTotal-COALESCE(sr.totalAmount,0) )*-1, 0 )),2) AS `total`
        from account a 
        inner join accountType aty on a.typeId = aty.Id AND aty.name = 'CREDITORS'
        left join purchase s on s.accountId = a.id and s.deleted = 0
        left join purchaseReturn sr on sr.invoiceId = s.id AND sr.deleted = 0 AND sr.date>='".$startDate."' AND sr.date<='".$endDate."'
        where a.deleted = 0 and aty.deleted = 0 and ((s.deleted = 0 AND s.date>='".$startDate."' AND s.date<='".$endDate."') or s.date is null)
        group by a.id

        ) s
        LEFT JOIN account a ON a.id = s.id
        ORDER BY a.aliasName";		
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    //checked
    function readFullLedger($startDate, $endDate){	
            $query = "
            
            select CONCAT('JOB_',mr.id) id, mr.date, 'JOB' account, mr.jobCharge amount, mr.narration,
            'CREDIT TRANSACTION' transactionType
            FROM materialReceive mr
            LEFT JOIN materialIssue mi ON mr.issueID = mi.id
            LEFT JOIN account a ON a.id = mi.jobberId
            LEFT JOIN accountType aty ON aty.id = a.typeId
            where 
            a.id = :accountId AND mi.deleted = 0 AND mr.deleted = 0 AND mr.date>='".$startDate."' AND mr.date<='".$endDate."'
    
            UNION
    
            SELECT  CONCAT('SAL_',d.billCode,'_',s.invoiceId ) id, s.date, 'SALES' account, (s.subTotal+(s.taxableAmount*s.billLimit*tax/10000)) amount, s.narration,
            'DEBIT TRANSACTION' transactionType 
            FROM sale s
            LEFT JOIN department d ON s.departmentId = d.Id
            LEFT JOIN account a ON s.accountId = a.id
            LEFT JOIN accountType aty ON aty.id = a.typeId
            where 
            s.accountId = :accountId AND s.deleted = 0 AND s.date>='".$startDate."' AND s.date<='".$endDate."'
    
            UNION
    
            SELECT  
            CONCAT('SAL_RET_',d.billCode,'_',sr.returnId ) id, sr.date, 'SALES RETURN' account, sr.totalAmount amount, sr.narration,
            'CREDIT TRANSACTION' transactionType 
            FROM sale s
            LEFT JOIN saleReturn sr ON s.id = sr.invoiceId and sr.deleted = 0
            LEFT JOIN department d ON s.departmentId = d.Id
            LEFT JOIN account a ON s.accountId = a.id
            LEFT JOIN accountType aty ON aty.id = a.typeId
            where 
            s.accountId = :accountId
            AND s.deleted = 0 AND sr.deleted = 0 AND sr.deleted = 0 AND sr.totalAmount IS NOT NULL AND sr.date>='".$startDate."' AND sr.date<='".$endDate."'
    
            UNION
    
            SELECT  
            CONCAT('PUR_',d.billCode,'_',s.invoiceId ) id, s.date, 'PURCHASE' account, s.grandTotal amount, s.narration,
            'CREDIT TRANSACTION' transactionType  
            FROM purchase s
            LEFT JOIN department d ON s.departmentId = d.Id
            LEFT JOIN account a ON s.accountId = a.id
            LEFT JOIN accountType aty ON aty.id = a.typeId
            where 
            s.accountId = :accountId AND s.deleted = 0 AND s.date>='".$startDate."' AND s.date<='".$endDate."'
    
            UNION
    
            SELECT  
            CONCAT('PUR_RET_',d.billCode,'_',sr.returnId ) id, sr.date, 'PURCHASE RETURN' account, sr.totalAmount amount, sr.narration,
            'DEBIT TRANSACTION' transactionType  
            FROM purchase s
            LEFT JOIN purchaseReturn sr ON s.id = sr.invoiceId AND sr.deleted = 0
            LEFT JOIN department d ON s.departmentId = d.Id
            LEFT JOIN account a ON s.accountId = a.id
            LEFT JOIN accountType aty ON aty.id = a.typeId
            where 
            s.accountId = :accountId AND s.deleted = 0 AND sr.deleted = 0 AND sr.totalAmount IS NOT NULL AND sr.date>='".$startDate."' AND sr.date<='".$endDate."'
            
            UNION
    
            select 
            CONCAT(t.type,'_',t.id) id, t.date, 
            CASE 
                WHEN ca.id = :accountId THEN da.aliasName
                WHEN da.id = :accountId THEN ca.aliasName
            END account,
            t.amount,t.narration,
                CASE 
                    WHEN t.creditAccountId IN (29,30) AND t.debitAccountId = :accountId THEN 'CREDIT TRANSACTION'
                    WHEN t.debitAccountId IN (29,30) AND t.creditAccountId = :accountId THEN 'DEBIT TRANSACTION'
                    ELSE 'TRANSACTION'
                END transactionType
            from transaction t
            LEFT JOIN account da ON t.debitAccountId = da.id
            LEFT JOIN account ca ON t.creditAccountId = ca.id
            WHERE 
            ((t.creditAccountId IN (29,30) AND t.debitAccountId = :accountId) OR
            (t.debitAccountId IN (29,30) AND t.creditAccountId = :accountId)) 
            AND t.deleted = 0 AND t.date>='".$startDate."' AND t.date<='".$endDate."'
    

            UNION

            select 
            CONCAT(t.type,'_',t.id) id, t.date, ca.aliasName account,  
            t.amount,
            t.narration,  
            'CREDIT TRANSACTION' transactionType
            from transaction t
            LEFT JOIN account da ON da.id = t.debitAccountId
            LEFT JOIN account ca ON ca.id = t.creditAccountId
            WHERE 
            (t.type = 'PAY' OR t.type = 'JOU') 
            AND da.id = :accountId
            AND t.deleted = 0 AND t.date>='".$startDate."' AND t.date<='".$endDate."'

            UNION

            select 
            CONCAT(t.type,'_',t.id) id, 
            t.date, 
            da.aliasName account,  
            t.amount, 
            t.narration, 
            'DEBIT TRANSACTION' transactionType
            from transaction t
            LEFT JOIN account da ON da.id = t.debitAccountId
            LEFT JOIN account ca ON ca.id = t.creditAccountId
            WHERE 
            (t.type = 'REC' OR t.type = 'JOU') 
            AND ca.id = :accountId
            AND t.deleted = 0 AND t.date>='".$startDate."' AND t.date<='".$endDate."'

            ORDER BY DATE ASC
            ";	
            
            $stmt = $this->conn->prepare($query);	
            $stmt->bindParam(':accountId', $this->accountId);
            
            $stmt->execute();	 	
            return $stmt;	
    }

    function checkForDuplicate(){
        $query = "select * from transaction where 
        type=:type AND
        date = :date AND
        debitAccountId = :debitAccountId AND
        creditAccountId = :creditAccountId AND
        amount = :amount AND
        deleted = 0";	

        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->type=htmlspecialchars(strip_tags($this->type));
        $this->date=htmlspecialchars(strip_tags($this->date));
                
        // bind new values
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':debitAccountId', $this->debitAccountId);
        $stmt->bindParam(':creditAccountId', $this->creditAccountId);
        $stmt->bindParam(':amount', $this->amount);

        $stmt->execute();	 	
	    return $stmt;
    }

    function readInvalid(){
        $query = "select * from transaction where (debitAccountId NOT IN (select id from account) OR creditAccountId NOT IN (select id from account)) AND deleted = 0";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readDayBookOpening() {

        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND date<'".$this->startDate."'";
        }

        $query = "
        select ROUND((openingBalance + COALESCE(rec,0) - COALESCE(pay,0)),3) AS openingBalance  from account a
        LEFT JOIN 
        (select SUM(amount) rec, creditAccountId from transaction where type = 'REC' and deleted=0 and creditAccountId = 29 ".$whereClause." ) r 
        ON a.id = r.creditAccountId
        LEFT JOIN 
        (select SUM(amount) pay, debitAccountId from transaction where type = 'PAY' and deleted=0  and debitAccountId = 29 ".$whereClause." ) p 
        ON a.id = p.debitAccountId
        where 
        a.id = 29
        AND a.deleted = 0
        ";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;
    }

    function readAmountTillDate(){	
        $query = "
        select 
        COALESCE(SUM(t.amount),0) amount
        from transaction t
        LEFT JOIN account a ON (t.debitAccountId= a.Id OR t.creditAccountId = a.Id) 
        where a.id = :id AND  t.date <= :date AND t.type IN ('REC','PAY','JOU') AND t.deleted = 0
        ";	

        $stmt = $this->conn->prepare($query);	

        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->date=htmlspecialchars(strip_tags($this->date));
        // bind new values
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':date', $this->date);
        
	    $stmt->execute();	 	
	    return $stmt;	
    }
}
?>