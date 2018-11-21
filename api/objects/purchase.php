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
        $query = "SELECT p.*,
        d.name departmentName,d.billName,d.billCode,d.bankDetails,d.contactDetails, d.billAddress, d.others, 
        a.name accountName,a.aliasName, COALESCE(hr.hasReturn,0) hasReturn FROM " . $this->table_name . " p 
        LEFT JOIN department d ON p.departmentId = d.id 
        LEFT JOIN account a ON p.accountId = a.id 
        LEFT JOIN (select invoiceId, true hasReturn from purchaseReturn  where deleted = 0 group by invoiceId) hr ON hr.invoiceId = p.id
        WHERE p.deleted = 0 ORDER BY p.id DESC";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readOne(){	
        $query = "SELECT p.*,
        d.id departmentId,d.name departmentName,d.billName,d.billCode,d.bankDetails,d.contactDetails, d.billAddress, 
        d.others, a.name accountName,a.aliasName,a.address1, a.address2, a.state, a.city, a.pincode, 
        a.phone, a.email, a.mobile, a.mobile2 , a.gstNo FROM ". $this->table_name . " p
         LEFT JOIN department d ON p.departmentId = d.id 
         LEFT JOIN account a ON p.accountId = a.id 
         WHERE p.deleted = 0
         AND p.id = ?";	
        $stmt = $this->conn->prepare($query);	
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readAmountTillDate(){	
        $query = "
        select COALESCE(SUM(grandTotal),0) amount 
        from purchase
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
    
    function readPurchaseReport(){
        $query = "
        select 

        p.date, i.itemName, 
        SUM((i.quantity-COALESCE(r.quantity,0))) quantity , 
        i.rate, 
        SUM((i.amount-COALESCE(r.amount,0))) amount
        
        from purchase p 
        LEFT JOIN invoiceDetail i ON p.id = i.invoiceId
        LEFT JOIN (
        
        select i.detailId ,SUM(quantity) quantity, SUM(amount) amount from 
        purchaseReturn pr 
        LEFT JOIN invoiceDetail i ON i.invoiceId = pr.id
        where pr.deleted=0 
        GROUP BY i.detailId) r ON i.id = r.detailId
        WHERE p.deleted = 0
        GROUP BY i.itemName, p.date, i.rate
        ORDER BY i.itemName, p.date DESC, i.rate
        ";
        $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;
    }

    function readDistinctAccount(){	
        $query = "SELECT DISTINCT p.accountId,a.name accountName,a.aliasName FROM ". $this->table_name . " p 
         LEFT JOIN account a ON p.accountId = a.id 
         WHERE p.deleted = 0";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readInvoiceIdByAccount(){	
        $query = "SELECT p.id,p.invoiceId,p.date,d.id departmentId, d.billCode,d.billSeriesSales, d.billSeriesSalesReturn, billSeriesPurchase, 
        billSeriesPurchaseReturn FROM " . $this->table_name . " p 
        LEFT JOIN department d ON p.departmentId = d.id
        where p.deleted = 0 AND p.accountId = ?";	
        $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->accountId);
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
                   refNo = :refNo,
                   narration = :narration,
                   username = :username,
                   grandTotal = :grandTotal,
                   billLimit = :billLimit,
                   invoiceId = :invoiceId
                       ";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values

        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':departmentId', $this->departmentId);
        $stmt->bindParam(':accountId', $this->accountId);
        $stmt->bindParam(':refNo', $this->refNo);
        $stmt->bindParam(':grandTotal', $this->grandTotal);
        $stmt->bindParam(':billLimit', $this->billLimit);
        $stmt->bindParam(':invoiceId', $this->invoiceId);
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
               departmentId = :departmentId,
               accountId = :accountId,
               refNo = :refNo,
               narration = :narration,
               username = :username,
               grandTotal = :grandTotal,
               billLimit = :billLimit,
               invoiceId = :invoiceId
               WHERE
               Id = :id   ";
    
       $stmt = $this->conn->prepare($query);
    
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->narration=htmlspecialchars(strip_tags($this->narration));

    // bind new values
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':date', $this->date);
    $stmt->bindParam(':departmentId', $this->departmentId);
    $stmt->bindParam(':accountId', $this->accountId);
    $stmt->bindParam(':refNo', $this->refNo);
    $stmt->bindParam(':grandTotal', $this->grandTotal);
    $stmt->bindParam(':billLimit', $this->billLimit);
    $stmt->bindParam(':invoiceId', $this->invoiceId);
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