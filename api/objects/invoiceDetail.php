<?php

class InvoiceDetail{

    // database connection and table name
    private $conn;
    private $table_name = "invoiceDetail";
 
    // object properties
    public $id;
    public $invoiceId;
    public $detailId;
    public $type;
    public $itemId;
    public $itemName;
    public $narration;
    public $quantity;
    public $rate;
    public $amount;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}
    
    function readOneSale(){	
        $query = "
        SELECT id.*,s.billLimit,COALESCE(ir.returnQuantity,0) returnQuantity,
        d.id departmentId ,d.billSeriesSales, d.billSeriesSalesReturn, billSeriesPurchase, billSeriesPurchaseReturn,i.hsnSac, i.hsnSacException 
        FROM invoiceDetail id 
        LEFT JOIN sale s ON id.invoiceId = s.id 
        LEFT JOIN department d ON s.departmentId = d.id 
        LEFT JOIN item i ON id.itemId = i.id 
        LEFT JOIN (select i.detailId, sr.invoiceId, SUM(i.quantity) returnQuantity from invoiceDetail i 
        LEFT JOIN saleReturn sr ON i.invoiceId = sr.id
        where i.type = 'saleReturn' and i.deleted = 0 group by i.detailId) ir 
        ON id.invoiceId = ir.invoiceId AND id.id = ir.detailId
        WHERE 
        id.invoiceId = :invoiceId
        AND type='sale' AND id.deleted=0
        ";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(":invoiceId", $this->invoiceId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readOnePurchase(){	
        $query = "
        SELECT id.*,p.billLimit,COALESCE(ir.returnQuantity,0) returnQuantity,
        d.id departmentId ,d.billSeriesSales, d.billSeriesSalesReturn, billSeriesPurchase, billSeriesPurchaseReturn,i.hsnSac, i.hsnSacException 
        FROM invoiceDetail id 
        LEFT JOIN purchase p ON id.invoiceId = p.id 
        LEFT JOIN department d ON p.departmentId = d.id 
        LEFT JOIN item i ON id.itemId = i.id 
        LEFT JOIN (select i.detailId, pr.invoiceId, SUM(i.quantity) returnQuantity from invoiceDetail i 
        LEFT JOIN purchaseReturn pr ON i.invoiceId = pr.id
        where i.type = 'purchaseReturn' and i.deleted = 0 group by i.detailId) ir 
        ON id.invoiceId = ir.invoiceId AND id.id = ir.detailId
        WHERE 
        id.invoiceId = :invoiceId
        AND type='purchase' AND id.deleted=0
        ";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(":invoiceId", $this->invoiceId);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readOneSaleReturn(){	
        $query = "
        SELECT idd.narration saleNarration,id.*,s.billLimit,
        d.id departmentId ,d.billSeriesSales, d.billSeriesSalesReturn, billSeriesPurchase, billSeriesPurchaseReturn,i.hsnSac, i.hsnSacException 
        FROM invoiceDetail id 
        LEFT JOIN invoiceDetail idd ON idd.id = id.detailId
		LEFT JOIN saleReturn sr ON id.invoiceId = sr.id
        LEFT JOIN sale s ON sr.invoiceId = s.id 
        LEFT JOIN department d ON s.departmentId = d.id 
        LEFT JOIN item i ON id.itemId = i.id 
        WHERE 
        id.invoiceId = :invoiceId
        AND id.type='saleReturn' AND id.deleted=0
        ";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(":invoiceId", $this->invoiceId);

        $stmt->execute();	 	
	    return $stmt;	
    }  
    
    function readOnePurchaseReturn(){	
        $query = "
        SELECT idd.narration purchaseNarration,id.*,p.billLimit,
        d.id departmentId ,d.billSeriesSales, d.billSeriesSalesReturn, billSeriesPurchase, billSeriesPurchaseReturn,i.hsnSac, i.hsnSacException 
        FROM invoiceDetail id 
        LEFT JOIN invoiceDetail idd ON idd.id = id.detailId
		LEFT JOIN purchaseReturn pr ON id.invoiceId = pr.id
        LEFT JOIN purchase p ON pr.invoiceId = p.id 
        LEFT JOIN department d ON p.departmentId = d.id 
        LEFT JOIN item i ON id.itemId = i.id 
        WHERE 
        id.invoiceId = :invoiceId
        AND id.type='purchaseReturn' AND id.deleted=0
        ";	
	    $stmt = $this->conn->prepare($query);	
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

    function hardDelete(){
    
        $query = "DELETE FROM " . $this->table_name . " WHERE invoiceId = :invoiceId AND type=:type"; 
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
                   detailId = :detailId,
                   itemName = :itemName,
                   narration = :narration,
                   quantity = :quantity,
                   rate = :rate,
                   amount = :amount
                       "
                       ;
        
           $stmt = $this->conn->prepare($query);
        
           $this->itemName=htmlspecialchars(strip_tags($this->itemName));

        // bind new values
        $stmt->bindParam(':invoiceId', $this->invoiceId);
        $stmt->bindParam(':detailId', $this->detailId);
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':itemId', $this->itemId);
        $stmt->bindParam(':itemName', $this->itemName);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':rate', $this->rate);
        $stmt->bindParam(':amount', $this->amount);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

function read_summary_by_hsn(){
     $query = "select invoiceId, id.`type`,sum(amount) amount, 
            case when lsc.summaryName is null then 'Net' else lsc.summaryName end as summary_name from invoiceDetail id 
            left join item i2 on id.itemId = i2.id
            left join ledger_summary_category lsc on lsc.hsnSac = i2.hsnSac  and i2.hsnSacException = lsc.hsnSacException
            where id.deleted = 0 group by id.invoiceId, id.`type`, case when lsc.summaryName is null then 'Net' else lsc.summaryName end
            order by id.`type`, id.invoiceId";

        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
        return $stmt;   
}	
}

?>