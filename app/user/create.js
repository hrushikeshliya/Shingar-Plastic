$(document).ready(function(){
 
    $(document).on('click', '.create-button', function(){
	      
	$.getJSON("http://shingarplastic.com/api/roles/read.php", function(data){
		var roles_options_html=""; 
		roles_options_html+="<select name='roleId' class='form-control'>";
		$.each(data.roles, function(key, val){
		    	roles_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
		});
		roles_options_html+="</select>";

	var create_user_html="";
	 
	create_user_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
	    create_user_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
	create_user_html+="</div>";
	
	create_user_html+="<form id='createUserForm' action='#' method='post' border='0'>";
	
    create_user_html+="<table class='table table-hover table-responsive table-bordered'>";
 
        create_user_html+="<tr>";
            create_user_html+="<td>Username</td>";
            create_user_html+="<td><input type='text' name='username' class='form-control' required /></td>";
        create_user_html+="</tr>";

        create_user_html+="<tr>";
            create_user_html+="<td>Role</td>";
            create_user_html+="<td>"+roles_options_html+"</td>";
        create_user_html+="</tr>";
 
        create_user_html+="<tr>";
            create_user_html+="<td>First Name</td>";
            create_user_html+="<td><input type='text' name='firstName' class='form-control' required /></td>";
        create_user_html+="</tr>";
        
        create_user_html+="<tr>";
            create_user_html+="<td>Middle Name</td>";
            create_user_html+="<td><input type='text' name='middleName' class='form-control' required /></td>";
        create_user_html+="</tr>";
 
        create_user_html+="<tr>";
            create_user_html+="<td>Last Name</td>";
            create_user_html+="<td><input type='text' name='lastName' class='form-control' required /></td>";
        create_user_html+="</tr>";

        create_user_html+="<tr>";
            create_user_html+="<td>Email</td>";
            create_user_html+="<td><input type='text' name='email' class='form-control' required /></td>";
        create_user_html+="</tr>";
         
        create_user_html+="<tr>";
            create_user_html+="<td>Password</td>";
            create_user_html+="<td><input type='password' name='password' class='form-control' required /></td>";
        create_user_html+="</tr>";

        create_user_html+="<tr>";
            create_user_html+="<td>Confirm Password</td>";
            create_user_html+="<td><input type='password' name='cpassword' class='form-control' required /></td>";
        create_user_html+="</tr>";

 
        create_user_html+="<tr>";
            create_user_html+="<td></td>";
            create_user_html+="<td>";
                create_user_html+="<button type='submit' class='btn btn-success'>";
                    create_user_html+="Submit";
                create_user_html+="</button>";
            create_user_html+="</td>";
        create_user_html+="</tr>";
 
    create_user_html+="</table>";
create_user_html+="</form>";

$("#page-content").html(create_user_html);
changePageTitle("Create User");
        
});

 
    });
 
$(document).on('submit', '#createUserForm', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: "http://shingarplastic.com/api/user/create.php",
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