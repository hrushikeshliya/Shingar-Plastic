$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON("http://shingarplastic.com/api/department/readOne.php?id=" + id, function(data){   // Change Needed HERE

		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered table-hover'>";
		 

		    read_one_html+="<tr>";
		        read_one_html+="<td>Id</td>";
		        read_one_html+="<td>" + data.Id + "</td>";
		    read_one_html+="</tr>";
		    
		    read_one_html+="<tr>";
		        read_one_html+="<td>Department Name</td>";
		        read_one_html+="<td>" + data.name + "</td>";
		    read_one_html+="</tr>";
			
			read_one_html+="<tr>";
				read_one_html+="<td>Bill Name</td>";
				read_one_html+="<td>" + data.billName + "</td>";
			read_one_html+="</tr>";

			read_one_html+="<tr>";
				read_one_html+="<td>Bill Code</td>";
				read_one_html+="<td>" + data.billCode + "</td>";
			read_one_html+="</tr>";

			read_one_html+="<tr>";
				read_one_html+="<td>Bank Details</td>";
				read_one_html+="<td>" + data.bankDetails + "</td>";
			read_one_html+="</tr>";

		read_one_html+="<tr>";
			read_one_html+="<td>Contact Details</td>";
			read_one_html+="<td>" + data.contactDetails+ "</td>";
		read_one_html+="</tr>";

		read_one_html+="<tr>";
			read_one_html+="<td>Next Sale Invoice</td>";
			read_one_html+="<td>" + data.billSeriesSales+ "</td>";
		read_one_html+="</tr>";

		read_one_html+="<tr>";
			read_one_html+="<td>Next Sale Return Invoice</td>";
			read_one_html+="<td>" + data.billSeriesSalesReturn+ "</td>";
		read_one_html+="</tr>";

		read_one_html+="<tr>";
			read_one_html+="<td>Next Purchase Invoice</td>";
			read_one_html+="<td>" + data.billSeriesPurchase+ "</td>";
		read_one_html+="</tr>";

		
		read_one_html+="<tr>";
			read_one_html+="<td>Next Purchase Return Invoice</td>";
			read_one_html+="<td>" + data.billSeriesPurchaseReturn+ "</td>";
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
		 
		changePageTitle("Department Details");  // Change Needed HERE
	});

    });
 
});