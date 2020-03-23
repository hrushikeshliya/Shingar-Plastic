<?php

class MaterialReceive{

    // database connection and table name
    private $conn;
    private $table_name = "materialReceive";
 
    // object properties
    public $id;
    public $issueId;
    public $date;
    public $quantity;
    public $narration;
    public $username;
    public $itemId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	

        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND mr.date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND mr.date<='".$this->endDate."'";
        }

        if($this->accountId != "") {
            $whereClause = $whereClause." AND m.jobberId=".$this->accountId;
        }

        if($this->itemId != "") {
            $whereClause = $whereClause." AND m.itemId = ".$this->itemId;
        }


        $query = "SELECT
        m.date issueDate,
        m.processId,
        m.jobberId,
        m.itemId,
        m.quantity issuedQuantity,
        m.narration issueNarration, 
        mr.*,
        mrr.receivedQuantity,
        m.quantity - mrr.receivedQuantity pendingQuantity,
        i.name itemName, 
        a.aliasName, 
        p.name processName,
        summary.quantitySummary,
        summary.jobChargeSummary 
        FROM " . $this->table_name . " mr 
        LEFT JOIN materialIssue m ON m.id=mr.issueId  
        LEFT JOIN process p ON p.id=m.processId 
        LEFT JOIN account a ON m.jobberId=a.id 
        LEFT JOIN item i ON m.itemId=i.id 
        LEFT JOIN (select issueId, SUM(quantity) receivedQuantity from materialReceive WHERE deleted = 0 group by issueId) mrr ON mr.issueId = mrr.issueId
        LEFT JOIN (select mi.jobberId, SUM(mr.quantity) quantitySummary, SUM(mr.jobCharge) jobChargeSummary from materialReceive mr
        LEFT JOIN materialIssue mi ON mi.id = mr.issueId
        WHERE 
        mi.deleted = 0
        AND mr.deleted = 0
        GROUP BY mi.jobberId) summary ON summary.jobberId = a.id
        where m.deleted = 0 AND mr.deleted = 0 ".$whereClause." order by mr.id desc";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

	function readByIssueId(){	
        $query = "SELECT
        m.date issueDate,
        m.processId,
        m.jobberId,
        m.itemId,
        m.quantity issuedQuantity,
        mrr.receivedQuantity,
        m.quantity - mrr.receivedQuantity pendingQuantity,
        m.narration issueNarration, 
        mr.*,
        i.name itemName, 
        a.aliasName, 
        p.name processName 
        FROM " . $this->table_name . " mr 
        LEFT JOIN materialIssue m ON m.id=mr.issueId  
        LEFT JOIN process p ON p.id=m.processId 
        LEFT JOIN account a ON m.jobberId=a.id 
        LEFT JOIN item i ON m.itemId=i.id 
        LEFT JOIN (select issueId, SUM(quantity) receivedQuantity from materialReceive WHERE deleted = 0 group by issueId) mrr ON mr.issueId = mrr.issueId
        where m.deleted = 0 AND mr.deleted = 0 AND m.id = ? order by mr.id desc";	
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->issueId);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
	    $query = "SELECT 
        m.date issueDate,
        m.processId,
        m.jobberId,
        m.itemId,
        mr.*,
        m.quantity issuedQuantity,
        mrr.receivedQuantity,
        m.quantity - mrr.receivedQuantity pendingQuantity,
        i.name itemName, 
        a.aliasName, 
        p.name processName 
        FROM " . $this->table_name . " mr 
        LEFT JOIN materialIssue m ON m.id=mr.issueId  
        LEFT JOIN process p ON p.id=m.processId 
        LEFT JOIN account a ON m.jobberId=a.id 
        LEFT JOIN item i ON m.itemId=i.id  
        LEFT JOIN (select issueId, SUM(quantity) receivedQuantity from materialReceive WHERE deleted = 0 group by issueId) mrr ON mr.issueId = mrr.issueId
        where m.deleted = 0 AND mr.deleted = 0 AND mr.id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
	function readJobberReport(){
        
        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND mr.date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND mr.date<='".$this->endDate."'";
        }

        if($this->itemId != "") {
            $whereClause = $whereClause." AND mi.itemId = ".$this->itemId;
        }

        $query = "
        SELECT mr.date, i.name, SUM(mr.quantity) quantity, mr.rate, SUM(mr.jobCharge) jobCharge
        FROM materialReceive mr
        LEFT JOIN materialIssue mi ON mr.issueId = mi.id AND mi.deleted = 0
        LEFT JOIN item i ON i.id = mi.itemId
        WHERE mr.deleted = 0".$whereClause."
        GROUP BY i.id, mr.date, mr.rate
        ORDER BY i.name, mr.date DESC, mr.rate
        ";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;		
    }

    function readAmountTillDate(){	
        $query = "
        select COALESCE(SUM(mr.jobCharge),0) amount 
        from materialReceive mr
        LEFT JOIN materialIssue mi ON mr.issueId = mi.id
        where 
        mr.deleted = 0 
        AND mi.deleted = 0 
        AND mr.date <= :date
        AND mi.jobberId = :id
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

    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                date=:date,
                jobCharge = :jobCharge,
                rate = :rate,
                quantity = :quantity,
                narration = :narration,
                username = :username                         
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':jobCharge', $this->jobCharge);
        $stmt->bindParam(':rate', $this->rate);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET
                       date=:date,
                       issueId = :issueId,
                       quantity = :quantity,
                       rate = :rate,
                       jobCharge = :jobCharge,
                       narration = :narration,
                       username = :username
                       "
                       ;
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':issueId', $this->issueId);
        $stmt->bindParam(':rate', $this->rate);
        $stmt->bindParam(':jobCharge', $this->jobCharge);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':username', $this->username);

           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>