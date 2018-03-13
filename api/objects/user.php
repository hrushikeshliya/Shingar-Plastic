<?php
class User{
 
    private $conn;
    private $table_name = "user";
 
    public $id;
    public $firstName;
    public $middleName;
    public $lastName;
    public $email;
    public $mobile;
    public $username;
    public $password;
    public $roleId; 
    public $deleted;
    public $active;
    
    public function __construct($db){
        $this->conn = $db;
    }
    
function read(){
 
    $query = "SELECT u.*,r.name AS roleName FROM " . $this->table_name . " u LEFT JOIN roles r ON u.roleId = r.Id WHERE u.deleted = 0 ORDER BY firstName ";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}

function readOne(){
 
    $query = "SELECT u.*,r.name AS roleName FROM " . $this->table_name . " u LEFT JOIN roles r ON u.roleId = r.Id WHERE u.deleted = 0 AND u.Id = ?";
    $stmt = $this->conn->prepare( $query );
    $stmt->bindParam(1, $this->id);
    $stmt->execute();
    return $stmt;    
}


function authenticate(){
 
    $query = "SELECT * FROM user WHERE username=:username and password=:password and deleted = 0 AND active = 1";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":username",$this->username);
    $stmt->bindParam(":password",$this->password); 	
    $stmt->execute();
    return $stmt;
}


function changePassword($opwd){
    $query = "UPDATE
                " . $this->table_name . "
            SET
                password = :npwd
            WHERE
                username = :username
                AND password = :opwd";
                
    $stmt = $this->conn->prepare($query);
    
     // sanitize
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->password=htmlspecialchars(strip_tags($this->password));
    
    // bind new values
    $stmt->bindParam(':username', $this->username);
    $stmt->bindParam(':npwd', $this->password);
    $stmt->bindParam(':opwd', $opwd);
    
    if($stmt->execute()){
        return true;
    }
    return false;
}

function create(){
 
     $query = "INSERT INTO
                " . $this->table_name . "
            SET
                username=:username, password=:password, email=:email, roleId=:roleId, firstName=:firstName, middleName=:middleName, lastName=:lastName";
 
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->password=htmlspecialchars(strip_tags($this->password));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->roleId=htmlspecialchars(strip_tags($this->roleId));
    $this->firstName=htmlspecialchars(strip_tags($this->firstName));
    $this->middleName=htmlspecialchars(strip_tags($this->middleName));
    $this->lastName=htmlspecialchars(strip_tags($this->lastName));
         
    // bind values
    $stmt->bindParam(":username", $this->username);
    $stmt->bindParam(":password", $this->password);
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":roleId", $this->roleId);
    $stmt->bindParam(":firstName", $this->firstName);
    $stmt->bindParam(":middleName", $this->middleName);
    $stmt->bindParam(":lastName", $this->lastName);
 
    if($stmt->execute()){
        return true;
    }else{
        return false;
    }
}

function update(){
    $query = "UPDATE
                " . $this->table_name . "
            SET
                firstName = :firstName,
                middleName = :middleName,
                lastName = :lastName,
                email = :email,
                mobile = :mobile,
                roleId = :roleId,
                active = :active                               
            WHERE
                Id = :id";
 
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->firstName=htmlspecialchars(strip_tags($this->firstName));
    $this->middleName=htmlspecialchars(strip_tags($this->middleName));
    $this->lastName=htmlspecialchars(strip_tags($this->lastName));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->mobile=htmlspecialchars(strip_tags($this->mobile));
    //$this->roleId=htmlspecialchars(strip_tags($this->roleId));
    //$this->roleId=htmlspecialchars(strip_tags($this->active));
    $this->id=htmlspecialchars(strip_tags($this->id));
     
    // bind new values
    $stmt->bindParam(':firstName', $this->firstName);
    $stmt->bindParam(':middleName', $this->middleName);
    $stmt->bindParam(':lastName', $this->lastName);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':mobile', $this->mobile);
    $stmt->bindParam(':roleId', $this->roleId);
    $stmt->bindParam(':active', $this->active);
    $stmt->bindParam(':id', $this->id);
     
    if($stmt->execute()){
        return true;
    }
 
    return false;
}

function delete(){
 
    $query = "UPDATE " . $this->table_name . " SET deleted = 1 AND active = 0 WHERE Id = ?"; 
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

}

?>