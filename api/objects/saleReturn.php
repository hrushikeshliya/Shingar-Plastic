<?php

class SaleReturn{

    // database connection and table name
    private $conn;
    private $table_name = "saleReturn";
 
    // object properties
    public $id;
    public $date;
    public $invoiceId;
    public $returnId;
    public $accountId;
    public $narration;
    public $username;
    public $totalAmount;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	

        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND sr.date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND sr.date<='".$this->endDate."'";
        }

        if($this->departmentId != "") {
            $whereClause = $whereClause." AND s.departmentId=".$this->departmentId;
        }

        if($this->accountId != "") {
            $whereClause = $whereClause." AND sr.accountId=".$this->accountId;
        }

        if($this->itemId != "") {
            $whereClause = $whereClause." AND s.id IN (select invoiceId from invoiceDetail where type='sale' AND itemId = ".$this->itemId.")";
        }

        $query = "SELECT sr.*,s.invoiceId saleInvoiceId,s.date saleDate,s.id saleId, d.billCode,a.name accountName,a.aliasName FROM ". $this->table_name . " sr
         LEFT JOIN sale s ON s.id = sr.invoiceId
         LEFT JOIN department d ON s.departmentId = d.id
         LEFT JOIN account a ON sr.accountId = a.id  
         WHERE sr.deleted = 0 ".$whereClause." ORDER BY date desc, id desc";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
        $query = "SELECT sr.*,s.invoiceId saleInvoiceId,s.date saleDate,s.id saleId, d.billCode,a.name accountName,a.aliasName FROM ". $this->table_name . " sr
         LEFT JOIN sale s ON s.id = sr.invoiceId
         LEFT JOIN department d ON s.departmentId = d.id
         LEFT JOIN account a ON sr.accountId = a.id  
         WHERE sr.deleted = 0  AND sr.id = ? ORDER BY date desc, id desc";	
        $stmt = $this->conn->prepare($query);	
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readAmountTillDate(){	
        $query = "
        select 
        COALESCE(SUM(totalAmount),0) amount 
        from saleReturn
        where 
        deleted = 0 
        AND date <= :date 
        AND accountId = :id
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
                   invoiceId = :invoiceId,
                   returnId = :returnId,
                   accountId = :accountId,
                   narration = :narration,
                   username = :username,
                   totalAmount = :totalAmount
                   
                       "
                       ;
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values

        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->bindParam(':invoiceId', $this->invoiceId);
        $stmt->bindParam(':returnId', $this->returnId);
        $stmt->bindParam(':totalAmount', $this->totalAmount);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':narration', $this->narration);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

       function update(){

        $query = "UPDATE
                   " . $this->table_name . "
               SET
               date = :date,
               narration = :narration,
               username = :username,
               totalAmount = :totalAmount
               WHERE
               id = :id
                   "
                   ;
    
       $stmt = $this->conn->prepare($query);
    
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->narration=htmlspecialchars(strip_tags($this->narration));

    // bind new values
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':date', $this->date);
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