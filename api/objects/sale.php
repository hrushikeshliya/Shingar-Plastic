<?php

class Sale{

    // database connection and table name
    private $conn;
    private $table_name = "sale";
 
    // object properties
    public $id;
    public $date;
    public $departmentId;
    public $transportId;
    public $accountId;
    public $discount;
    public $tax;
    public $showDiscount;
    public $showName;
    public $isFake;
    public $narration;
    public $username;
    public $lrNo;
    public $total;
    public $discountAmount;
    public $taxableAmount;
    public $taxAmount;
    public $totalAmount;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	
        $query = "SELECT s.*,d.name departmentName,a.name accountName,a.aliasName,t.name transportName FROM ". $this->table_name . " s 
         LEFT JOIN department d ON s.departmentId = d.id 
         LEFT JOIN account a ON s.accountId = a.id 
         LEFT JOIN transport t ON s.transportId = t.id 
         WHERE s.deleted = 0";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readDistinctAccount(){	
        $query = "SELECT DISTINCT s.accountId,a.name accountName,a.aliasName FROM ". $this->table_name . " s 
         LEFT JOIN account a ON s.accountId = a.id 
         WHERE s.deleted = 0";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readInvoiceIdByAccount(){	
	    $query = "SELECT s.id FROM " . $this->table_name . " s where s.deleted = 0 AND s.accountId = ?";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->accountId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
	    $query = "SELECT i.*,ig.name as itemGroup FROM " . $this->table_name . " i LEFT JOIN itemGroup ig ON i.itemGroupId = ig.id  where i.deleted = 0 AND i.id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    function delete(){
    
        $query = "UPDATE " . $this->table_name . " SET deleted = 1  WHERE Id = ?"; 
        $stmt = $this->conn->prepare($query);
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                lrNo = :lrNo                        
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->lrNo=htmlspecialchars(strip_tags($this->lrNo));
        // bind new values
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':lrNo', $this->lrNo);
        
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET

                   date = :date,
                   departmentId = :departmentId,
                   transportId = :transportId,
                   accountId = :accountId,
                   discount = :discount,
                   tax = :tax,
                   showDiscount = :showDiscount,
                   showName = :showName,
                   isFake = :isFake,
                   narration = :narration,
                   username = :username,
                   
                   total = :total,
                   discountAmount = :discountAmount,
                   taxableAmount = :taxableAmount,
                   taxAmount = :taxAmount,
                   totalAmount = :totalAmount
                   
                       "
                       ;
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values

        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':departmentId', $this->departmentId);
        $stmt->bindParam(':transportId', $this->transportId);
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->bindParam(':discount', $this->discount);
        $stmt->bindParam(':tax', $this->tax);
        $stmt->bindParam(':showDiscount', $this->showDiscount);
        $stmt->bindParam(':showName', $this->showName);
        $stmt->bindParam(':isFake', $this->isFake);
        $stmt->bindParam(':total', $this->total);
        $stmt->bindParam(':discountAmount', $this->discountAmount);
        $stmt->bindParam(':taxableAmount', $this->taxableAmount);
        $stmt->bindParam(':taxAmount', $this->taxAmount);
        $stmt->bindParam(':totalAmount', $this->totalAmount);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':narration', $this->narration);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>