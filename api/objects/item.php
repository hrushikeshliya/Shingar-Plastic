<?php

class Item{

    // database connection and table name
    private $conn;
    private $table_name = "item";
 
    // object properties
    public $id;
    public $name;
    public $itemGroupId;
    public $itemGroup;
    public $purchaseRate;
    public $saleRate;
    public $jobRate;
    public $itemWeight;
    public $hsnSac;
    public $narration;
    public $active;
    public $hsnSacException;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	
	    $query = "SELECT i.*,ig.name as itemGroup FROM " . $this->table_name . " i LEFT JOIN itemGroup ig ON i.itemGroupId = ig.id where i.deleted = 0 ORDER BY i.name asc";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readOne(){	
	    $query = "SELECT i.*,ig.name as itemGroup FROM " . $this->table_name . " i LEFT JOIN itemGroup ig ON i.itemGroupId = ig.id  where i.deleted = 0 AND i.id = ?";	
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
                name=:name,
                itemGroupId = :itemGroupId,
                purchaseRate = :purchaseRate,
                saleRate = :saleRate,
                jobRate = :jobRate,
                itemWeight = :itemWeight,
                hsnSac = :hsnSac,
                narration = :narration,
                active = :active                          
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':itemGroupId', $this->itemGroupId);
        $stmt->bindParam(':purchaseRate', $this->purchaseRate);
        $stmt->bindParam(':saleRate', $this->saleRate);
        $stmt->bindParam(':jobRate', $this->jobRate);
        $stmt->bindParam(':itemWeight', $this->itemWeight);
        $stmt->bindParam(':hsnSac', $this->hsnSac);
        $stmt->bindParam(':narration', $this->narration);
        $stmt->bindParam(':active', $this->active);
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
                       name=:name,
                       itemGroupId = :itemGroupId,
                       purchaseRate = :purchaseRate,
                       saleRate = :saleRate,
                       jobRate = :jobRate,
                       itemWeight = :itemWeight,
                       hsnSac = :hsnSac,
                       narration = :narration,
                       hsnSacException=0
                       "
                       ;
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->narration=htmlspecialchars(strip_tags($this->narration));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':itemGroupId', $this->itemGroupId);
        $stmt->bindParam(':purchaseRate', $this->purchaseRate);
        $stmt->bindParam(':saleRate', $this->saleRate);
        $stmt->bindParam(':jobRate', $this->jobRate);
        $stmt->bindParam(':itemWeight', $this->itemWeight);
        $stmt->bindParam(':hsnSac', $this->hsnSac);
        $stmt->bindParam(':narration', $this->narration);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>