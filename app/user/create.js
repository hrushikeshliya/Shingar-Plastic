$(document).ready(function(){
 
    $(document).on('click', '.create-button', function(){
	      
	$.getJSON("http://shingarplastic.com/api/roles/read.php", function(data){ 
		var roles_options_html=""; 
		roles_options_html+="<select name='roleId' class='form-control'>";
		$.each(data.roles, function(key, val){
		    	roles_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
		});
		roles_options_html+="</select>";

	var create_html="";
	 
	create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
	    create_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
	create_html+="</div>";
	
	create_html+="<form id='create-form' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-responsive table-bordered'>";
 
        create_html+="<tr>";
            create_html+="<td>Username</td>";
            create_html+="<td><input type='text' name='username' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Role</td>";
            create_html+="<td>"+roles_options_html+"</td>";
        create_html+="</tr>";
 
        create_html+="<tr>";
            create_html+="<td>First Name</td>";
            create_html+="<td><input type='text' name='firstName' class='form-control' required /></td>";
        create_html+="</tr>";
        
        create_html+="<tr>";
            create_html+="<td>Middle Name</td>";
            create_html+="<td><input type='text' name='middleName' class='form-control' required /></td>";
        create_html+="</tr>";
 
        create_html+="<tr>";
            create_html+="<td>Last Name</td>";
            create_html+="<td><input type='text' name='lastName' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Email</td>";
            create_html+="<td><input type='text' name='email' class='form-control' required /></td>";
        create_html+="</tr>";
         
        create_html+="<tr>";
            create_html+="<td>Password</td>";
            create_html+="<td><input type='password' name='password' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Confirm Password</td>";
            create_html+="<td><input type='password' name='cpassword' class='form-control' required /></td>";
        create_html+="</tr>";

 
        create_html+="<tr>";
            create_html+="<td></td>";
            create_html+="<td>";
                create_html+="<button type='submit' class='btn btn-success'>";
                    create_html+="Submit";
                create_html+="</button>";
            create_html+="</td>";
        create_html+="</tr>";
 
    create_html+="</table>";
create_html+="</form>";

$("#page-content").html(create_html);
changePageTitle("Create User");   // Change Needed HERE
        
});

 
    });
 
$(document).on('submit', '#create-form', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: "http://shingarplastic.com/api/user/create.php",   // Change Needed HERE
    type : "POST",
    contentType : 'application/json',
    data : form_data,
    success : function(result) {
        show();
    },
    error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
    }
});
 
return false;

});
});