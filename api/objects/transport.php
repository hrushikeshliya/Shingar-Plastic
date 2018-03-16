<?php

class Transport{

    // database connection and table name
    private $conn;
    private $table_name = "transport";
 
    // object properties
    public $id;
    public $name;
    public $shortName;
    public $contactPerson;
    public $mobile;
    public $mobile2;

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
                    shortName = :shortName,
                    contactPerson = :contactPerson,
                    mobile = :mobile,
                    mobile2 = :mobile2
                    
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->shortName=htmlspecialchars(strip_tags($this->shortName));
        $this->contactPerson=htmlspecialchars(strip_tags($this->contactPerson));
        $this->mobile=htmlspecialchars(strip_tags($this->mobile));
        $this->mobile2=htmlspecialchars(strip_tags($this->mobile2));
        $this->id=htmlspecialchars(strip_tags($this->id));
        
        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':shortName', $this->shortName);
        $stmt->bindParam(':contactPerson', $this->contactPerson);
        $stmt->bindParam(':mobile', $this->mobile);
        $stmt->bindParam(':mobile2', $this->mobile2);
        $stmt->bindParam(':id', $this->id);

        try {
            $stmt->execute();
            return true;
        }catch(PDOException $e) {
            echo "Internal Server Error : " . $e->getMessage();
            return false;
        }
    
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
                       shortName = :shortName,
                       contactPerson = :contactPerson,
                       mobile = :mobile,
                       mobile2 = :mobile2 ";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->shortName=htmlspecialchars(strip_tags($this->shortName));
        $this->contactPerson=htmlspecialchars(strip_tags($this->contactPerson));
        $this->mobile=htmlspecialchars(strip_tags($this->mobile));
        $this->mobile2=htmlspecialchars(strip_tags($this->mobile2));
        
        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':shortName', $this->shortName);
        $stmt->bindParam(':contactPerson', $this->contactPerson);
        $stmt->bindParam(':mobile', $this->mobile);
        $stmt->bindParam(':mobile2', $this->mobile2);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>