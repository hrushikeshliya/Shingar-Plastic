<?php

class Account{

    // database connection and table name
    private $conn;
    private $table_name = "account";
 
    // object properties
    public $id;
    public $name;
    public $aliasName;
    public $typeId;
    public $openingBalance;
    public $currentBalance;
    public $address1;
    public $address2;
    public $city;
    public $state;
    public $pincode;
    public $phone;
    public $mobile;
    public $mobile2;
    public $email;
    public $gstno;
    public $transportId;
    public $billLimit;
    public $deleted;
    public $active;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}

	function read(){	
	    $query = "SELECT a.*, t.name transportName, at.name accountType, at.description FROM " . $this->table_name . " a LEFT JOIN transport t ON a.transportId = t.id LEFT JOIN accountType at ON a.typeId = at.id where a.deleted = 0 order by a.aliasName";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }
    
	function readByType($type){	
	    $query = "SELECT a.*, t.name transportName, at.name accountType, at.description FROM " . $this->table_name . " a LEFT JOIN transport t ON a.transportId = t.id LEFT JOIN accountType at ON a.typeId = at.id where a.deleted = 0 AND at.name LIKE '%".$type."%' order by at.id, a.name";	
	    $stmt = $this->conn->prepare($query);	
	    $stmt->execute();	 	
	    return $stmt;	
    }

    function readOne(){	
        $query = "SELECT a.*, t.name transportName, at.name accountType, at.description FROM " . $this->table_name . " a LEFT JOIN transport t ON a.transportId = t.id LEFT JOIN accountType at ON a.typeId = at.id where a.deleted = 0 AND a.id = ?";		
	    $stmt = $this->conn->prepare($query);	
        $stmt->bindParam(1, $this->id);
        $stmt->execute();	 	
	    return $stmt;	
    }
    
    function update(){
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                name=:name,
                aliasName=:aliasName,
                typeId=:typeId,
                openingBalance=:openingBalance,
                address1=:address1,
                address2=:address2,
                city=:city,
                state=:state,
                pincode=:pincode,
                phone=:phone,
                mobile=:mobile,
                mobile2=:mobile2,
                email=:email,
                transportId=:transportId,
                billLimit=:billLimit,
                gstno=:gstno,
                active=:active

                WHERE
                    id = :id";
    
        $stmt = $this->conn->prepare($query);
    
           // sanitize
           $this->name=htmlspecialchars(strip_tags($this->name));
           $this->aliasName=htmlspecialchars(strip_tags($this->aliasName));
           $this->address1=htmlspecialchars(strip_tags($this->address1));
           $this->address2=htmlspecialchars(strip_tags($this->address2));
           $this->city=htmlspecialchars(strip_tags($this->city));
           $this->state=htmlspecialchars(strip_tags($this->state));
           $this->email=htmlspecialchars(strip_tags($this->email));
           $this->id=htmlspecialchars(strip_tags($this->id));

           // bind values
           $stmt->bindParam(":name", $this->name);
           $stmt->bindParam(":aliasName", $this->aliasName);
           $stmt->bindParam(":typeId", $this->typeId);
           $stmt->bindParam(":openingBalance", $this->openingBalance);
           $stmt->bindParam(":address1", $this->address1);
           $stmt->bindParam(":address2", $this->address2);
           $stmt->bindParam(":city", $this->city);
           $stmt->bindParam(":state", $this->state);
           $stmt->bindParam(":pincode", $this->pincode);
           $stmt->bindParam(":phone", $this->phone);
           $stmt->bindParam(":mobile", $this->mobile);
           $stmt->bindParam(":mobile2", $this->mobile2);
           $stmt->bindParam(":email", $this->email);
           $stmt->bindParam(":transportId", $this->transportId);
           $stmt->bindParam(":billLimit", $this->billLimit);
           $stmt->bindParam(":gstno", $this->gstno);
           $stmt->bindParam(":active", $this->active);
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
                       aliasName=:aliasName,
                       typeId=:typeId,
                       openingBalance=:openingBalance,
                       currentBalance=:openingBalance,
                       address1=:address1,
                       address2=:address2,
                       city=:city,
                       state=:state,
                       pincode=:pincode,
                       phone=:phone,
                       mobile=:mobile,
                       mobile2=:mobile2,
                       email=:email,
                       transportId=:transportId,
                       billLimit=:billLimit,
                       gstno=:gstno,
                       active=:active
                       ";
        
           $stmt = $this->conn->prepare($query);
        
           // sanitize
           $this->name=htmlspecialchars(strip_tags($this->name));
           $this->aliasName=htmlspecialchars(strip_tags($this->aliasName));
           $this->address1=htmlspecialchars(strip_tags($this->address1));
           $this->address2=htmlspecialchars(strip_tags($this->address2));
           $this->city=htmlspecialchars(strip_tags($this->city));
           $this->state=htmlspecialchars(strip_tags($this->state));
           $this->email=htmlspecialchars(strip_tags($this->email));
                
           // bind values
           $stmt->bindParam(":name", $this->name);
           $stmt->bindParam(":aliasName", $this->aliasName);
           $stmt->bindParam(":typeId", $this->typeId);
           $stmt->bindParam(":openingBalance", $this->openingBalance);
           $stmt->bindParam(":address1", $this->address1);
           $stmt->bindParam(":address2", $this->address2);
           $stmt->bindParam(":city", $this->city);
           $stmt->bindParam(":state", $this->state);
           $stmt->bindParam(":pincode", $this->pincode);
           $stmt->bindParam(":phone", $this->phone);
           $stmt->bindParam(":mobile", $this->mobile);
           $stmt->bindParam(":mobile2", $this->mobile2);
           $stmt->bindParam(":email", $this->email);
           $stmt->bindParam(":transportId", $this->transportId);
           $stmt->bindParam(":billLimit", $this->billLimit);
           $stmt->bindParam(":gstno", $this->gstno);
           $stmt->bindParam(":active", $this->active);

           if($stmt->execute()){
               return true;
           }else{
               return false;
           }
       }

	
}

?>