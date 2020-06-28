$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON(apiURL+"/account/readOne.php?id=" + id, function(data){    // Change Needed HERE
		
		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered table-hover'>";
		 

		    read_one_html+="<tr>";
		        read_one_html+="<td>Id</td>";
		        read_one_html+="<td>" + data.id + "</td>";
		        read_one_html+="<td>Account Name</td>";
		        read_one_html+="<td>" + data.name + "</td>";
		    read_one_html+="</tr>";			
			
		    read_one_html+="<tr>";
		        read_one_html+="<td>Alias Name</td>";
		        read_one_html+="<td>" + data.aliasName + "</td>";
		        read_one_html+="<td>Account Type</td>";
		        read_one_html+="<td>" + data.accountType + "</td>";
		    read_one_html+="</tr>";
									
		    read_one_html+="<tr>";
		        read_one_html+="<td>Initial Opening Balance</td>";
				read_one_html+="<td>" + data.openingBalance + "</td>";
		        read_one_html+="<td>Current Balance</td>";
				read_one_html+="<td>" + data.currentBalance + "</td>";
		    read_one_html+="</tr>";
			
		    read_one_html+="<tr>";
		        read_one_html+="<td>Address Line 1</td>";
		        read_one_html+="<td>" + data.address1 + "</td>";
		        read_one_html+="<td>Address Line 2</td>";
		        read_one_html+="<td>" + data.address2 + "</td>";
		    read_one_html+="</tr>";
			
		    read_one_html+="<tr>";
		        read_one_html+="<td>City</td>";
		        read_one_html+="<td>" + data.city + "</td>";
		        read_one_html+="<td>State</td>";
		        read_one_html+="<td>" + data.state + "</td>";
		    read_one_html+="</tr>";
			
		    read_one_html+="<tr>";
		        read_one_html+="<td>Pincode</td>";
		        read_one_html+="<td>" + data.pincode + "</td>";
		        read_one_html+="<td>Landline</td>";
		        read_one_html+="<td>" + data.phone + "</td>";
		    read_one_html+="</tr>";
			
		    read_one_html+="<tr>";
		        read_one_html+="<td>Mobile</td>";
		        read_one_html+="<td>" + data.mobile + "</td>";
		        read_one_html+="<td>Mobile 2</td>";
		        read_one_html+="<td>" + data.mobile2 + "</td>";
		    read_one_html+="</tr>";
			
		    read_one_html+="<tr>";
		        read_one_html+="<td>Email</td>";
		        read_one_html+="<td>" + data.email + "</td>";
		        read_one_html+="<td>GST No</td>";
		        read_one_html+="<td>" + data.gstno + "</td>";
		    read_one_html+="</tr>";
					
			read_one_html+="<tr>";
			read_one_html+="<td>Bill Limit</td>";
			read_one_html+="<td>" + data.billLimit + "</td>";
			read_one_html+="<td>Transport</td>";
			read_one_html+="<td>" + data.transportName + "</td>";
			
		read_one_html+="</tr>";
		    read_one_html+="<tr>";
		      read_one_html+="<td>Status</td>";
				if(data.active == 0){
					read_one_html+="<td class='text-danger'>InActive</td>"; 
				}else{
					read_one_html+="<td class='text-success'>Active</td>"; 
				} 
			read_one_html+="</tr>";

		read_one_html+="</table>";
		
		
		$("#page-content").html(read_one_html);
		 
		changePageTitle("Account Details");   // Change Needed HERE
	});

    });
 
});