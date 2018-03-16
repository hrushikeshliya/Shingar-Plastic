<?php

class ItemGroup{

    // database connection and table name
    private $conn;
    private $table_name = "itemGroup";
 
    // object properties
    public $id;
    public $name;
    public $rawType;
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
                    rawType = :rawType,
                    active = :active                          
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->rawType=htmlspecialchars(strip_tags($this->rawType));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':rawType', $this->rawType);
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
                       rawType = :rawType";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->rawType=htmlspecialchars(strip_tags($this->rawType));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':rawType', $this->rawType);
        
           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>