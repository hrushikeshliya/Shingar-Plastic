<?php

class City{

    // database connection and table name
    private $conn;
    private $table_name = "cities";
 
    // object properties
    public $id;
    public $cityName;
    public $stateName;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

    function read(){	
        $query = "SELECT * FROM cities order by stateName Asc,cityName ASC";	
        $stmt = $this->conn->prepare($query);	
        $stmt->execute();	 	
        return $stmt;	
    }

    function readOne(){	
	    $query = "SELECT * FROM " . $this->table_name . " where id = ?";	
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function readCity(){	
	    $query = "SELECT DISTINCT cityName FROM cities order by cityName";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
    function readState(){	
	    $query = "SELECT DISTINCT stateName FROM cities order by stateName";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readByState(){	
	    $query = "SELECT DISTINCT cityName FROM cities where stateName = :stateName ORDER BY cityName";		
        $stmt = $this->conn->prepare($query);	
        
        $this->stateName=htmlspecialchars(strip_tags($this->stateName));

        $stmt->bindParam(":stateName", $this->stateName);
        $stmt->execute();	 	
	    return $stmt;	
    }

    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                stateName = :stateName,
                cityName = :cityName                          
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->stateName=htmlspecialchars(strip_tags($this->stateName));
        $this->cityName=htmlspecialchars(strip_tags($this->cityName));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':stateName', $this->stateName);
        $stmt->bindParam(':cityName', $this->cityName);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function delete(){
    
        $query = "DELETE FROM  " . $this->table_name . " WHERE Id = ?"; 
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
                       stateName = :stateName,
                       cityName = :cityName";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->stateName=htmlspecialchars(strip_tags($this->stateName));
        $this->cityName=htmlspecialchars(strip_tags($this->cityName));

        // bind new values
        $stmt->bindParam(':stateName', $this->stateName);
        $stmt->bindParam(':cityName', $this->cityName);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }
    
}

?>