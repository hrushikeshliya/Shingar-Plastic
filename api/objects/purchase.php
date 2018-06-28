<?php

class Purchase{

    // database connection and table name
    private $conn;
    private $table_name = "purchase";
 
    // object properties
    public $id;
    public $date;
    public $departmentId;
    public $accountId;
    public $discount;
    public $tax;
    public $refNo;
    public $narration;
    public $username;
    
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
	    $query = "SELECT p.*,d.name departmentName,a.name accountName,a.aliasName FROM " . $this->table_name . " p LEFT JOIN department d ON p.departmentId = d.id LEFT JOIN account a ON p.accountId = a.id WHERE p.deleted = 0";	
	    $stmt = $this->conn->prepare($query);	
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

    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET

                   date = :date,
                   departmentId = :departmentId,
                   accountId = :accountId,
                   discount = :discount,
                   tax = :tax,
                   refNo = :refNo,
                   narration = :narration,
                   username = :username,
                   total = :total,
                   discountAmount = :discountAmount,
                   taxableAmount = :taxableAmount,
                   taxAmount = :taxAmount,
                   totalAmount = :totalAmount
                       ";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values

        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':departmentId', $this->departmentId);
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->bindParam(':discount', $this->discount);
        $stmt->bindParam(':tax', $this->tax);
        $stmt->bindParam(':refNo', $this->refNo);
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