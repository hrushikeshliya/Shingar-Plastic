$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON("http://shingarplastic.com/api/user/readOne.php?id=" + id, function(data){  // Change Needed HERE
 
 	     var firstName = data.firstName;
	     var middleName = data.middleName;
	     var lastName = data.lastName;
	     var email = data.email;
	     var mobile = data.mobile;
	     var roleId = data.roleId;
	     var username = data.username;
		 var id = data.id;
		 var active = data.active;

	     
	    $.getJSON("http://shingarplastic.com/api/roles/read.php", function(data){
		var roles_options_html=""; 
		roles_options_html+="<select name='roleId' class='form-control'>";
		$.each(data.roles, function(key, val){
				if (roleId == val.id) {
					roles_options_html+="<option value='" + val.id + "' selected>" + val.name + "</option>";
				} else {
					roles_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
				}
		});
		roles_options_html+="</select>";
		
		var status_options_html = "";
		status_options_html+="<select name='active' class='form-control'>";
		if (active == 0) {	
			status_options_html+="<option value='1'>Active</option>";
			status_options_html+="<option value='0' selected>InActive</option>";
		} else {
			status_options_html+="<option value='1' selected>Active</option>";
			status_options_html+="<option value='0'>InActive</option>";
		}

		status_options_html+="</select>";

		var update_html="";
		 
		update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_html+="</div>";
		
		update_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_html+="<table class='table table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Username</td>";
					update_html+="<td>" + username + "</td>";
				update_html+="</tr>";

		        update_html+="<tr>";
		            update_html+="<td>First Name</td>";
		            update_html+="<td><input value=\"" + firstName + "\" type='text' name='firstName' class='form-control' required /></td>";
		        update_html+="</tr>";

		        update_html+="<tr>";
		            update_html+="<td>Middle Name</td>";
		            update_html+="<td><input value=\"" + middleName + "\" type='text' name='middleName' class='form-control' required /></td>";
		        update_html+="</tr>";
		        
		        update_html+="<tr>";
		            update_html+="<td>Last Name</td>";
		            update_html+="<td><input value=\"" + lastName + "\" type='text' name='lastName' class='form-control' required /></td>";
				update_html+="</tr>";
			
				update_html+="<tr>";
					update_html+="<td>Role</td>";
					update_html+="<td>" + roles_options_html + "</td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Email</td>";
					update_html+="<td><input value=\"" + email + "\" type='text' name='email' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Mobile</td>";
					update_html+="<td><input value=\"" + mobile + "\" type='text' name='mobile' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Account Status</td>";
					update_html+="<td>" + status_options_html + "</td>";
				update_html+="</tr>";
				
		        update_html+="<tr>";
		 
		            update_html+="<td><input value=\"" + id + "\" name='id' type='hidden' /></td>";
		 
		            update_html+="<td>";
		                update_html+="<button type='submit' class='btn btn-info'>";
		                    update_html+="<span class='glyphicon glyphicon-edit'></span> Update";
		                update_html+="</button>";
		            update_html+="</td>";
		 
		        update_html+="</tr>";
		 
		    update_html+="</table>";
		update_html+="</form>";

		$("#page-content").html(update_html);
		changePageTitle("Edit User");   // Change Needed HERE
				
		});
	     	     
	});
    });
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/user/update.php",   // Change Needed HERE
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