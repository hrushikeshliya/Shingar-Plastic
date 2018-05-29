$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON("http://shingarplastic.com/api/materialIssue/readOne.php?id=" + id, function(data){   // Change Needed HERE

		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered table-hover'>";
		 

		    read_one_html+="<tr>";
		        read_one_html+="<td>Id</td>";
		        read_one_html+="<td>" + data.id + "</td>";
		        read_one_html+="<td>Date</td>";
		        read_one_html+="<td>" + data.date + "</td>";
		    read_one_html+="</tr>";

		    read_one_html+="<tr>";
		        read_one_html+="<td>Process Name</td>";
		        read_one_html+="<td>" + data.processName + "</td>";
		        read_one_html+="<td>Jobber Name</td>";
		        read_one_html+="<td>" + data.aliasName + "</td>";
		    read_one_html+="</tr>";			

		    read_one_html+="<tr>";
		        read_one_html+="<td>Item Name</td>";
		        read_one_html+="<td>" + data.itemName + "</td>";
		        read_one_html+="<td>Quantity</td>";
		        read_one_html+="<td>" + data.quantity + "</td>";
		    read_one_html+="</tr>";			

		    read_one_html+="<tr>";
		        read_one_html+="<td>Entry By</td>";
		        read_one_html+="<td  colspan='3'>" + data.username+ "</td>";
		    read_one_html+="</tr>";			

			read_one_html+="<tr>";
			read_one_html+="<td>Narration</td>";
			read_one_html+="<td colspan='3'>" + data.narration + "</td>";
			read_one_html+="</tr>";

		read_one_html+="</table>";
		
		
		$("#page-content").html(read_one_html);
		 
		changePageTitle("Material Issue Details");  // Change Needed HERE
	});

    });
 
});