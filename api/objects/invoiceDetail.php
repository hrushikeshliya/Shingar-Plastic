<?php

class InvoiceDetail{

    // database connection and table name
    private $conn;
    private $table_name = "invoiceDetail";
 
    // object properties
    public $id;
    public $invoiceId;
    public $type;
    public $itemId;
    public $itemName;
    public $quantity;
    public $rate;
    public $amount;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}
    
    function readOne(){	
	    $query = "SELECT * FROM " . $this->table_name . " WHERE invoiceId = :invoiceId AND type=:type AND deleted=0";	
	    $stmt = $this->conn->prepare($query);	
        $this->type=htmlspecialchars(strip_tags($this->type));
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":invoiceId", $this->invoiceId);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    function delete(){
    
        $query = "UPDATE " . $this->table_name . " SET deleted = 1  WHERE invoiceId = :invoiceId AND type=:type"; 
        $stmt = $this->conn->prepare($query);
        $this->type=htmlspecialchars(strip_tags($this->type));
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":invoiceId", $this->invoiceId);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET
                
                   invoiceId = :invoiceId,
                   type = :type,                   
                   itemId = :itemId,
                   itemName = :itemName,
                   quantity = :quantity,
                   rate = :rate,
                   amount = :amount
                       "
                       ;
        
           $stmt = $this->conn->prepare($query);
        
           $this->itemName=htmlspecialchars(strip_tags($this->itemName));

        // bind new values
        $stmt->bindParam(':invoiceId', $this->invoiceId);
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':itemId', $this->itemId);
        $stmt->bindParam(':itemName', $this->itemName);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':rate', $this->rate);
        $stmt->bindParam(':amount', $this->amount);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>