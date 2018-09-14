<?php

class Department{

    // database connection and table name
    private $conn;
    private $table_name = "department";
 
    // object properties
    public $id;
    public $name;
    public $billName;
    public $billPercent;
    public $billSeriesSales;
    public $billSeriesPurchase;
    public $active;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	
	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 ";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readActive(){	
	    $query = "SELECT * FROM " . $this->table_name . " where active = 1 and deleted = 0 ";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readOne(){	
	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 AND id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    name = :name,
                    billName = :billName,
                    billPercent = :billPercent,
                    active = :active                          
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->billName=htmlspecialchars(strip_tags($this->billName));
        $this->billPercent=htmlspecialchars(strip_tags($this->billPercent));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':billName', $this->billName);
        $stmt->bindParam(':billPercent', $this->billPercent);
        $stmt->bindParam(':active', $this->active);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function updateSeriesSales(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    billSeriesSales = billSeriesSales+1,                      
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }


    function updateSeriesPurchase(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    billSeriesPurchase = billSeriesPurchase+1,                      
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function delete(){
    
        $query = "UPDATE " . $this->table_name . " SET deleted = 1  WHERE Id = ?"; 
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
                       name=:name,
                       billName = :billName,
                       billPercent = :billPercent,
                       billSeries = 1";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->billName=htmlspecialchars(strip_tags($this->billName));
        $this->billPercent=htmlspecialchars(strip_tags($this->billPercent));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':billName', $this->billName);
        $stmt->bindParam(':billPercent', $this->billPercent);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>