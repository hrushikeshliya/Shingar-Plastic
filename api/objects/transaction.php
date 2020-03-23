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
    public $amount;
    public $narration;
    public $username;
    public $deleted;

    public $accountId;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function readJournal(){	
        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND date<='".$this->endDate."'";
        }

	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 AND type = 'JOU' ".$whereClause." ORDER BY date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
	    return $stmt;	
    }
    
	function readDayBook(){	
        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND date<='".$this->endDate."'";
        }


        $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 AND type IN ('PAY', 'REC') ".$whereClause." ORDER BY date asc";	
        
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
        (select SUM(amount) rec, creditAccount from transaction where type = 'REC' and deleted=0 and creditAccount = 'CASH A/C' ".$whereClause." ) r 
        ON a.aliasName = r.creditAccount OR a.name = r.creditAccount
        LEFT JOIN 
        (select SUM(amount) pay, debitAccount from transaction where type = 'PAY' and deleted=0  and debitAccount = 'CASH A/C' ".$whereClause." ) p 
        ON a.aliasName = p.debitAccount OR a.name = p.debitAccount
        where 
        a.name = 'CASH A/C'
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
        LEFT JOIN account a ON (t.debitAccount= a.name OR t.creditAccount = a.name OR t.debitAccount= a.aliasName OR t.creditAccount = a.aliasName) 
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

    function readCreditTransaction(){	
        $query = "    
        select CONCAT(t.type,'_',t.id) id, t.date, t.creditAccount account,  t.narration, t.amount from transaction t
        LEFT JOIN account a ON (a.name = t.debitAccount OR a.aliasName = t.debitAccount)
        WHERE 
        (t.type = 'REC' OR (t.type = 'JOU' AND t.creditAccount = 'DISCOUNT A/C')) 
        AND a.id = :accountId
        AND t.deleted = 0
        ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readRECTransaction(){	
        $query = "    
        select 
        CONCAT(t.type,'_',t.id) id, 
        t.date, 
        t.creditAccount account,  
        t.narration, 
        t.amount 
        from transaction t
        LEFT JOIN account a ON a.name = t.debitAccount OR a.aliasName = t.debitAccount 
        WHERE 
        (t.type = 'REC' OR t.type = 'JOU') 
        AND a.id = :accountId
        AND t.deleted = 0
        ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readPAYTransaction(){	
        $query = "    
        select 
        CONCAT(t.type,'_',t.id) id, 
        t.date, 
        t.debitAccount account,  
        t.narration, 
        t.amount 
        from transaction t
        LEFT JOIN account a ON a.name = t.creditAccount OR a.aliasName = t.creditAccount
        WHERE 
        (t.type = 'PAY' OR t.type = 'JOU') 
        AND a.id = :accountId
        AND t.deleted = 0
        ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readRECCashTransaction(){	
        $query = "    
        select 
        CONCAT(t.type,'_',t.id) id, 
        t.date, 
        t.debitAccount account,  
        t.narration, 
        t.amount 
        from transaction t
        LEFT JOIN account a ON a.name = t.creditAccount OR a.aliasName = t.creditAccount
        WHERE 
        (t.type = 'REC' OR t.type = 'JOU') 
        AND a.id = :accountId
        AND t.deleted = 0
        ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readPAYCashTransaction(){	
        $query = "    
        select 
        CONCAT(t.type,'_',t.id) id, 
        t.date, 
        t.creditAccount account,  
        t.narration, 
        t.amount 
        from transaction t
        LEFT JOIN account a ON a.name = t.debitAccount OR a.aliasName = t.debitAccount
        WHERE 
        (t.type = 'PAY' OR t.type = 'JOU') 
        AND a.id = :accountId
        AND t.deleted = 0
        ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readDebitTransaction(){	
        $query = "    
        select CONCAT(t.type,'_',t.id) id, t.date, t.debitAccount account, t.narration, t.amount 
        from transaction t
        LEFT JOIN account a ON (a.name = t.creditAccount OR a.aliasName = t.creditAccount)
        WHERE 
        (t.type = 'PAY' OR (t.type = 'JOU' AND t.debitAccount = 'DISCOUNT A/C')) 
        AND a.id = :accountId
        AND t.deleted = 0
        ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 AND id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readNetOffDate(){	
        $query = "
        select COALESCE(MAX(date),0) netOffDate from transaction t
        LEFT JOIN account a ON t.creditAccount = a.name OR t.creditAccount = a.aliasName OR t.debitAccount = a.aliasName OR t.debitAccount = a.name
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

    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET

                debitAccount = :debitAccount,
                creditAccount = :creditAccount,
                amount = :amount,
                narration = :narration,
                username = :username,
                date = :date 
                    
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

    function delete(){
    
        $query = "UPDATE " . $this->table_name . " SET deleted = 1  WHERE Id = ?"; 
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

    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET
                       type=:type,
                       date = :date,
                       debitAccount = :debitAccount,
                       creditAccount = :creditAccount,
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
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }	

       function checkForDuplicate(){
        $query = "select * from transaction where 
        type=:type AND
        date = :date AND
        debitAccount = :debitAccount AND
        creditAccount = :creditAccount AND
        amount = :amount AND
        deleted = 0";	

        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->type=htmlspecialchars(strip_tags($this->type));
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->debitAccount=htmlspecialchars(strip_tags($this->debitAccount));
        $this->crediAccount=htmlspecialchars(strip_tags($this->creditAccount));
                
        // bind new values
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':debitAccount', $this->debitAccount);
        $stmt->bindParam(':creditAccount', $this->creditAccount);
        $stmt->bindParam(':amount', $this->amount);

        $stmt->execute();	 	
	    return $stmt;
       }

       function readInvalid(){
        $query = "select * from transaction where (debitAccount NOT IN (select aliasName from account) OR creditAccount NOT IN (select aliasName from account)) AND deleted = 0";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
	    return $stmt;	
    }
}
?>