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
    public $tax;
    public $showName;
    public $isFake;
    public $narration;
    public $username;
    public $lrNo;

    public $subTotal;
    public $taxableAmount;
    public $taxAmount;
    public $grandTotal;
    public $billLimit;
    
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	
        $query = "SELECT s.*,d.name departmentName,d.billName,d.billCode,d.bankDetails,d.contactDetails, d.billAddress, d.others, a.name accountName,a.aliasName,t.name transportName FROM ". $this->table_name . " s 
         LEFT JOIN department d ON s.departmentId = d.id 
         LEFT JOIN account a ON s.accountId = a.id 
         LEFT JOIN transport t ON s.transportId = t.id 
         WHERE s.deleted = 0 ORDER BY s.id DESC";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readAmountTillDate(){	
        $query = "
        select COALESCE(SUM(grandTotal),0) amount 
        from sale
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

	function readOne(){	
        $query = "SELECT s.*,d.id departmentId,d.name departmentName,d.billName,d.billCode,d.bankDetails,d.contactDetails, d.billAddress, d.others, a.name accountName,a.aliasName,a.address1, a.address2, a.state, a.city, a.pincode, a.phone, a.email, a.mobile, a.mobile2 , a.gstNo,t.name transportName FROM ". $this->table_name . " s 
         LEFT JOIN department d ON s.departmentId = d.id 
         LEFT JOIN account a ON s.accountId = a.id 
         LEFT JOIN transport t ON s.transportId = t.id 
         WHERE s.deleted = 0
         AND s.id = ?";	
        $stmt = $this->conn->prepare($query);	
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readSaleReport(){
        $query = "
        select s.date, i.itemName, (i.quantity-COALESCE(ir.quantity,0)) quantity , i.rate, (i.amount-COALESCE(ir.amount,0)) amount from sale s
        LEFT JOIN invoiceDetail i ON s.id = i.invoiceId AND i.type = 'sale'
        LEFT JOIN invoiceDetail ir ON i.id = ir.detailId
        WHERE s.deleted = 0
        ORDER BY i.itemName, s.date DESC, i.rate
        ";
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
        $query = "SELECT s.id,s.invoiceId,s.date,d.id departmentId, d.billCode,d.billSeriesSales, d.billSeriesSalesReturn, billSeriesPurchase, billSeriesPurchaseReturn FROM " . $this->table_name . " s 
        LEFT JOIN department d ON s.departmentId = d.id
        where s.deleted = 0 AND s.accountId = ?";	
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
                   tax = :tax,
                   showName = :showName,
                   isFake = :isFake,
                   narration = :narration,
                   username = :username,
                   subTotal = :subTotal,
                   taxableAmount = :taxableAmount,
                   taxAmount = :taxAmount,
                   grandTotal = :grandTotal,
                   billLimit = :billLimit,
                   invoiceId = :invoiceId
                   
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
        $stmt->bindParam(':tax', $this->tax);
        $stmt->bindParam(':showName', $this->showName);
        $stmt->bindParam(':isFake', $this->isFake);
        $stmt->bindParam(':subTotal', $this->subTotal);
        $stmt->bindParam(':taxableAmount', $this->taxableAmount);
        $stmt->bindParam(':taxAmount', $this->taxAmount);
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