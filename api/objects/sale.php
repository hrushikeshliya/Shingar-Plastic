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
        $query = "SELECT s.*,
        d.name departmentName,d.billName,d.billCode,d.bankDetails,d.contactDetails, d.billAddress, d.others, 
        a.name accountName,a.aliasName,t.name transportName, 
        ba.name baAccountName, ba.aliasName baAliasName, COALESCE(hr.hasReturn,0) hasReturn
        FROM sale s 
        LEFT JOIN department d ON s.departmentId = d.id 
        LEFT JOIN account a ON s.accountId = a.id
        LEFT JOIN account ba ON s.billNameId = ba.id 
        LEFT JOIN transport t ON s.transportId = t.id 
        LEFT JOIN (select invoiceId, true hasReturn from saleReturn  where deleted = 0 group by invoiceId) hr ON hr.invoiceId = s.id
        WHERE s.deleted = 0 ORDER BY s.id DESC";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readMonthlySummary(){	
        $query = "select 
        MAX(d.name) departmentName, 
        (COALESCE(SUM(s.subTotal+(s.taxableAmount*s.billLimit*tax/10000)),0)-COALESCE(SUM(sr.totalAmount),0)) netSale 
        from 
        department d 
        LEFT JOIN sale s ON d.Id = s.departmentId AND s.deleted = 0 AND s.date>= '2018-11-07' AND s.date <= '2019-11-06' AND month(s.date) = month(CURRENT_DATE)
        LEFt JOIN saleReturn sr ON s.id = sr.invoiceId AND sr.deleted = 0
        where 
        d.deleted = 0
        GROUP BY d.Id
        ORDER BY d.name";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readYearlySummary(){	
        $query = "select MAX(d.name) departmentName, 
        (COALESCE(SUM(s.subTotal+(s.taxableAmount*s.billLimit*tax/10000)),0)-COALESCE(SUM(sr.totalAmount),0)) netSale 
        from 
        department d 
        LEFT JOIN sale s ON d.Id = s.departmentId AND s.deleted = 0 AND s.date>= '2018-11-07' AND s.date <= '2019-11-06'
        LEFt JOIN saleReturn sr ON s.id = sr.invoiceId AND sr.deleted = 0
        where 
        d.deleted = 0
        GROUP BY d.Id
        ORDER BY d.name";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readAmountTillDate(){	
        $query = "
        select COALESCE(SUM((s.subTotal+(s.taxableAmount*s.billLimit*tax/10000)) ),0) amount 
        from sale s
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
        $query = "SELECT s.*,
         d.id departmentId,d.name departmentName,d.billName,d.billCode,d.bankDetails,d.contactDetails, d.billAddress, d.others, 
         a.name accountName,a.aliasName,a.address1, a.address2, a.state, a.city, a.pincode, a.phone, a.email, a.mobile, a.mobile2 , a.gstNo,
         ba.name baAccountName,ba.aliasName baAliasName ,ba.address1 baAddress1, ba.address2 baAddress2 , ba.state baState, ba.city baCity, ba.pincode baPincode, ba.phone baPhone, ba.email baEmail, ba.mobile baMobile, ba.mobile2 baMobile2, ba.gstNo baGstNo,
         t.name transportName FROM ". $this->table_name . " s 
         LEFT JOIN department d ON s.departmentId = d.id 
         LEFT JOIN account a ON s.accountId = a.id
         LEFT JOIN account ba ON s.billNameId = ba.id 
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
        select s.date, i.itemName, SUM((i.quantity-COALESCE(ir.quantity,0))) quantity , i.rate, 
        SUM((i.amount-COALESCE(ir.amount,0))) amount from sale s
        LEFT JOIN invoiceDetail i ON s.id = i.invoiceId AND i.type = 'sale'
        LEFT JOIN invoiceDetail ir ON i.id = ir.detailId
        WHERE s.deleted = 0
        GROUP BY i.itemName, s.date, i.rate
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
                   billNameId = :billNameId,
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
        $stmt->bindParam(':billNameId', $this->billNameId);
        $stmt->bindParam(':invoiceId', $this->invoiceId);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':narration', $this->narration);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

       function updateSale(){
        
        $query = "UPDATE
                   " . $this->table_name . "
               SET

               date = :date,
               departmentId = :departmentId,
               transportId = :transportId,
               accountId = :accountId,
               tax = :tax,
               showName = :showName,
               narration = :narration,
               username = :username,
               subTotal = :subTotal,
               taxableAmount = :taxableAmount,
               taxAmount = :taxAmount,
               grandTotal = :grandTotal,
               billLimit = :billLimit,
               billNameId = :billNameId,
               invoiceId = :invoiceId

               WHERE 
                Id = :id
               
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
    $stmt->bindParam(':departmentId', $this->departmentId);
    $stmt->bindParam(':transportId', $this->transportId);
    $stmt->bindParam(':accountId', $this->accountId);
    $stmt->bindParam(':tax', $this->tax);
    $stmt->bindParam(':showName', $this->showName);
    $stmt->bindParam(':subTotal', $this->subTotal);
    $stmt->bindParam(':taxableAmount', $this->taxableAmount);
    $stmt->bindParam(':taxAmount', $this->taxAmount);
    $stmt->bindParam(':grandTotal', $this->grandTotal);
    $stmt->bindParam(':billLimit', $this->billLimit);
    $stmt->bindParam(':billNameId', $this->billNameId);
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