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
        $query = "SELECT sr.*,s.invoiceId saleInvoiceId,d.billCode,a.name accountName,a.aliasName FROM ". $this->table_name . " sr
         LEFT JOIN sale s ON s.id = sr.invoiceId
         LEFT JOIN department d ON s.departmentId = d.id
         LEFT JOIN account a ON sr.accountId = a.id  
         WHERE sr.deleted = 0 ORDER BY date desc, id desc";	
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

	
}

?>