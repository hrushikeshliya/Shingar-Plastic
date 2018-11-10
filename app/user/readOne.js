$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON("http://shingarplastic.com/api/user/readOne.php?id=" + id, function(data){   // Change Needed HERE

		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered'>";
		 
		    read_one_html+="<tr>";
		        read_one_html+="<td>Username</td>";
		        read_one_html+="<td>" + data.username + "</td>";
			read_one_html+="</tr>";

			read_one_html+="<tr>";
				read_one_html+="<td>Password</td>";
				read_one_html+="<td>" + data.password+ "</td>";
			read_one_html+="</tr>";
		    
		    read_one_html+="<tr>";
		        read_one_html+="<td>Role</td>";
		        read_one_html+="<td>" + data.roleName + "</td>";
		    read_one_html+="</tr>";
		    
		    read_one_html+="<tr>";
		        read_one_html+="<td class='w-30-pct'>First Name</td>";
		        read_one_html+="<td class='w-70-pct'>" + data.firstName + "</td>";
		    read_one_html+="</tr>";
		 		    
		    read_one_html+="<tr>";
		        read_one_html+="<td class='w-30-pct'>Middle Name</td>";
		        read_one_html+="<td class='w-70-pct'>" + data.middleName + "</td>";
		    read_one_html+="</tr>";
		    
		    read_one_html+="<tr>";
		        read_one_html+="<td class='w-30-pct'>Last Name</td>";
		        read_one_html+="<td class='w-70-pct'>" + data.lastName + "</td>";
		    read_one_html+="</tr>";

		    read_one_html+="<tr>";
		        read_one_html+="<td>Email</td>";
		        read_one_html+="<td>" + data.email + "</td>";
		    read_one_html+="</tr>";
		 

		    read_one_html+="<tr>";
		        read_one_html+="<td>Mobile</td>";
		        read_one_html+="<td>" + data.mobile + "</td>";
		    read_one_html+="</tr>";
		 
			read_one_html+="<tr>";
			read_one_html+="<td>Account Status</td>";
			if(data.active == 0){
				read_one_html+="<td class='text-danger'>DeActivated</td>"; 
			}else{
				read_one_html+="<td class='text-success'>Active</td>"; 
			} 
		read_one_html+="</tr>";

		read_one_html+="</table>";
		
		$("#page-content").html(read_one_html);
		 
		changePageTitle("User Details");   // Change Needed HERE
	});

    });
 
});