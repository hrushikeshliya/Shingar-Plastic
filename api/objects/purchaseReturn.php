<?php

class PurchaseReturn{

    // database connection and table name
    private $conn;
    private $table_name = "purchaseReturn";
 
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
        $query = "SELECT pr.*,p.invoiceId purchaseInvoiceId,d.billCode,a.name accountName,a.aliasName FROM ". $this->table_name . " pr
        LEFT JOIN purchase p ON p.id = pr.invoiceId
        LEFT JOIN department d ON p.departmentId = d.id
        LEFT JOIN account a ON pr.accountId = a.id  
        WHERE pr.deleted = 0 ORDER BY pr.date desc, pr.id desc";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
        $query = "SELECT pr.*,p.invoiceId purchaseInvoiceId,d.billCode,a.name accountName,a.aliasName FROM ". $this->table_name . " pr
        LEFT JOIN purchase p ON p.id = pr.invoiceId
        LEFT JOIN department d ON p.departmentId = d.id
        LEFT JOIN account a ON pr.accountId = a.id  
        WHERE 
        pr.deleted = 0 
        AND pr.id = :id
        ORDER BY pr.date desc, pr.id desc";	
        $stmt = $this->conn->prepare($query);	
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readAmountTillDate(){	
        $query = "
        select 
        COALESCE(SUM(totalAmount),0) amount 
        from purchaseReturn
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
        $stmt->bindParam(':totalAmount', $this->totalAmount);
        $stmt->bindParam(':returnId', $this->returnId);
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