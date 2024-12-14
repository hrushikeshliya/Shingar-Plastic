$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){   // Change Needed HERE

		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered table-hover'>";
		 

		    read_one_html+="<tr>";
		        read_one_html+="<td>Id</td>";
		        read_one_html+="<td>" + data.id + "</td>";
		        read_one_html+="<td>Item Name</td>";
		        read_one_html+="<td>" + data.name + "</td>";
		    read_one_html+="</tr>";

		    read_one_html+="<tr>";
		        read_one_html+="<td>Item Group</td>";
		        read_one_html+="<td>" + data.itemGroup + "</td>";
		        read_one_html+="<td>Item Weight</td>";
		        read_one_html+="<td>" + data.itemWeight + "</td>";
		    read_one_html+="</tr>";			

		    read_one_html+="<tr>";
		        read_one_html+="<td>Purchase Rate</td>";
		        read_one_html+="<td>" + data.purchaseRate + "</td>";
		        read_one_html+="<td>Sale Rate</td>";
		        read_one_html+="<td>" + data.saleRate + "</td>";
		    read_one_html+="</tr>";			

		    read_one_html+="<tr>";
		        read_one_html+="<td>Job Rate</td>";
		        read_one_html+="<td>" + data.jobRate+ "</td>";
		        read_one_html+="<td>HSN / SAC</td>";
		        read_one_html+="<td>" + data.hsnSac + "</td>";
		    read_one_html+="</tr>";			

			read_one_html+="<tr>";
			read_one_html+="<td>Narration</td>";
			read_one_html+="<td>" + data.narration + "</td>";
				read_one_html+="<td>Status</td>";
				if(data.active == 0){
					read_one_html+="<td class='text-danger'>InActive</td>"; 
				}else{
					read_one_html+="<td class='text-success'>Active</td>"; 
				} 
			read_one_html+="</tr>";

		read_one_html+="</table>";
		
		
		$("#page-content").html(read_one_html);
		 
		changePageTitle("Item Details");  // Change Needed HERE
	});

    });
 
});