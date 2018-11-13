<?php

class Department{

    // database connection and table name
    private $conn;
    private $table_name = "department";
 
    // object properties
    public $id;
    public $name;
    public $billName;
    public $billCode;
    public $bankDetails;
    public $contactDetails;
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
                    billCode = :billCode,
                    bankDetails = :bankDetails,
                    contactDetails = :contactDetails,
                    active = :active                          
                WHERE
                    Id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->billName=htmlspecialchars(strip_tags($this->billName));
        $this->billCode=htmlspecialchars(strip_tags($this->billCode));
        $this->bankDetails=htmlspecialchars(strip_tags($this->bankDetails));
        $this->contactDetails=htmlspecialchars(strip_tags($this->contactDetails));
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':billName', $this->billName);
        $stmt->bindParam(':billCode', $this->billCode);
        $stmt->bindParam(':bankDetails', $this->bankDetails);
        $stmt->bindParam(':contactDetails', $this->contactDetails);
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
                    billSeriesSales = billSeriesSales+1                   
                WHERE
                    Id = :id ";
    
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

    function updateSeriesSalesReturn(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    billSeriesSalesReturn = billSeriesSalesReturn+1                   
                WHERE
                    Id = :id ";
    
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
                    billSeriesPurchase = billSeriesPurchase+1                     
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

    function updateSeriesPurchaseReturn(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    billSeriesPurchaseReturn = billSeriesPurchaseReturn+1                     
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
                       billCode = :billCode,
                       bankDetails = :bankDetails,
                       contactDetails = :contactDetails";
        
           $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->billName=htmlspecialchars(strip_tags($this->billName));
        $this->billCode=htmlspecialchars(strip_tags($this->billCode));
        $this->bankDetails=htmlspecialchars(strip_tags($this->bankDetails));
        $this->contactDetails=htmlspecialchars(strip_tags($this->contactDetails));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':billName', $this->billName);
        $stmt->bindParam(':billCode', $this->billCode);
        $stmt->bindParam(':bankDetails', $this->bankDetails);
        $stmt->bindParam(':contactDetails', $this->contactDetails);

           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>