<?php

class NavBar{

    // database connection and table name
    private $conn;
 
    // object properties
    public $id;
    public $groupId;
    public $heading;
    public $name;
    public $url;
    public $username;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    	}


	function read(){	
	    $query = "SELECT ng.name heading, n.* FROM navBar n LEFT JOIN navGroup ng ON n.groupId = ng.Id WHERE n.Id IN (select navId from rolesAccess where roleId = 			
 			(select roleId from user where username = :username))";	
	    $stmt = $this->conn->prepare($query);	
	    
	    $this->username=htmlspecialchars(strip_tags($this->username));
	    $stmt->bindParam(":username", $this->username);
	      
	    $stmt->execute();	 	
	    return $stmt;	
	}
	
}

?>