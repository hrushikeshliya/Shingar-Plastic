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
    
}

?>