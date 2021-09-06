<?php

class MaterialIssue{

    // database connection and table name
    private $conn;
    private $table_name = "materialIssue";
 
    // object properties
    public $id;
    public $date;
    public $jobberId;
    public $itemId;
    public $quantity;
    public $rate;
    public $narration;
    public $username;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	

        $whereClause = "";

        if($this->startDate != "") {
            $whereClause = $whereClause." AND m.date>='".$this->startDate."'";
        }

        if($this->endDate != "") {
            $whereClause = $whereClause." AND m.date<='".$this->endDate."'";
        }

        if($this->accountId != "") {
            $whereClause = $whereClause." AND m.jobberId=".$this->accountId;
        }

        if($this->itemId != "") {
            $whereClause = $whereClause." AND m.itemId = ".$this->itemId;
        }

        $query = "SELECT m.*,i.name itemName, a.aliasName,COALESCE(mr.receivedQuantity,0) receivedQuantity, m.quantity-COALESCE(mr.receivedQuantity,0) pendingQuantity  FROM " . $this->table_name . " m LEFT JOIN
        account a ON m.jobberId=a.id LEFT JOIN item i ON m.itemId=i.id LEFT JOIN (select issueId, SUM(quantity) receivedQuantity from materialReceive WHERE deleted = 0 group by issueId) mr ON m.id = mr.issueId
        where m.deleted = 0 ".$whereClause." order by m.id desc";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

	function readByJobber($jobberId){
        $query = "SELECT m.*,i.name itemName, a.aliasName, COALESCE(mr.receivedQuantity,0) receivedQuantity, m.quantity-COALESCE(mr.receivedQuantity,0) pendingQuantity  FROM " . $this->table_name . " m LEFT JOIN
        account a ON m.jobberId=a.id LEFT JOIN item i ON m.itemId=i.id LEFT JOIN (select issueId, SUM(quantity) receivedQuantity from materialReceive WHERE deleted = 0 group by issueId) mr ON m.id = mr.issueId
        where m.deleted = 0 AND m.jobberID=".$jobberId." order by m.id desc";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
	    $query = "SELECT m.*,i.name itemName,COALESCE(i.jobRate,0) jobRate , a.aliasName, COALESCE(mr.receivedQuantity,0) receivedQuantity, m.quantity-COALESCE(mr.receivedQuantity,0) pendingQuantity FROM " . $this->table_name . " m LEFT JOIN
        account a ON m.jobberId=a.id LEFT JOIN item i ON m.itemId=i.id LEFT JOIN (select issueId, SUM(quantity) receivedQuantity from materialReceive WHERE deleted = 0 group by issueId) mr ON m.id = mr.issueId
        where m.deleted = 0 AND m.id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
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
                jobberId = :jobberId,
                itemId = :itemId,
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
        $stmt->bindParam(':jobberId', $this->jobberId);
        $stmt->bindParam(':itemId', $this->itemId);
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
                       jobberId = :jobberId,
                       itemId = :itemId,
                       quantity = :quantity,
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
        $stmt->bindParam(':jobberId', $this->jobberId);
        $stmt->bindParam(':itemId', $this->itemId);
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