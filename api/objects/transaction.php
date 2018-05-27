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
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function readJournal(){	
	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 AND type = 'JOU' ORDER BY date asc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
	    return $stmt;	
    }
    
	function readDayBook(){	
	    $query = "SELECT * FROM " . $this->table_name . " t LEFT JOIN openingBalance o ON t.date = o.date where deleted = 0 AND (type = 'REC' OR type = 'PAY') ORDER BY t.date asc";	
        $stmt = $this->conn->prepare($query);	
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
    
    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET

                debitAccount = :debitAccount,
                creditAccount = :creditAccount,
                amount = :amount,
                narration = :narration,
                username = :username 
                    
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->debitAccount=htmlspecialchars(strip_tags($this->debitAccount));
        $this->crediAccount=htmlspecialchars(strip_tags($this->creditAccount));
        $this->narration=htmlspecialchars(strip_tags($this->narration));
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':debitAccount', $this->debitAccount);
        $stmt->bindParam(':creditAccount', $this->creditAccount);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':amount', $this->amount);
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

	
}

?>