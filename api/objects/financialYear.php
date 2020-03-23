<?php

class FinancialYear{

    // database connection and table name
    private $conn;
    private $table_name = "financialYear";
 
    // object properties
    public $id;
    public $startDate;
    public $endDate;
    public $displayName;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

    function read(){	
        $query = "SELECT * FROM " . $this->table_name . " order by displayName desc";	
        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
        return $stmt;	
    }

    function readOne(){	
	    $query = "SELECT * FROM " . $this->table_name . " where displayName = :displayName";	
        $stmt = $this->conn->prepare($query);	
        $this->displayName=htmlspecialchars(strip_tags($this->displayName));
        $stmt->bindParam(':displayName', $this->displayName);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                startDate = :startDate,
                endDate = :endDate                          
                WHERE
                    id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->startDate=htmlspecialchars(strip_tags($this->startDate));
        $this->endDate=htmlspecialchars(strip_tags($this->endDate));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':startDate', $this->startDate);
        $stmt->bindParam(':endDate', $this->endDate);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function delete(){
    
        $query = "DELETE FROM  " . $this->table_name . " WHERE id = ?"; 
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    function create(){
        
            $query = "INSERT INTO
                       " . $this->table_name . "
                   SET
                       startDate = :startDate,
                       endDate = :endDate,
                       displayName = :displayName";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->stateName=htmlspecialchars(strip_tags($this->stateName));
        $this->cityName=htmlspecialchars(strip_tags($this->cityName));
        $this->displayName=htmlspecialchars(strip_tags($this->displayName));

        // bind new values
        $stmt->bindParam(':startDate', $this->startDate);
        $stmt->bindParam(':endDate', $this->endDate);
        $stmt->bindParam(':displayName', $this->displayName);

           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }
    
}

?>