<?php

class AccountType{

    // database connection and table name
    private $conn;
    private $table_name = "accountType";
 
    // object properties
    public $id;
    public $name;
    public $description;
    public $active;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	
	    $query = "SELECT * FROM " . $this->table_name . " where deleted = 0 ORDER BY name ASC";	
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
                    description = :description,
                    active = :active                          
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':active', $this->active);
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
                       description = :description";
        
           $stmt = $this->conn->prepare($query);
        
           // sanitize
           $this->name=htmlspecialchars(strip_tags($this->name));
           $this->description=htmlspecialchars(strip_tags($this->description));     
           // bind values
           $stmt->bindParam(":name", $this->name);
           $stmt->bindParam(':description', $this->description);
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>