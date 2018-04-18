<?php

class Query{

    // database connection and table name
    private $conn;
    private $table_name = "query";
 
    // object properties
    public $id;
    public $name;
    public $api;
    public $parameter;

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
    	
}

?>