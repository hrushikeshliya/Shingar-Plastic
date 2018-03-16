$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON("http://shingarplastic.com/api/transport/readOne.php?id=" + id, function(data){   // Change Needed HERE

		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered table-hover'>";
		 
		    read_one_html+="<tr>";
		        read_one_html+="<td>Id</td>";
		        read_one_html+="<td>" + data.id + "</td>";
		    read_one_html+="</tr>";
		    
		    read_one_html+="<tr>";
		        read_one_html+="<td>Transport Name</td>";
		        read_one_html+="<td>" + data.name + "</td>";
		    read_one_html+="</tr>";

		    read_one_html+="<tr>";
				read_one_html+="<td>Transport Short Name</td>";
				read_one_html+="<td>" + data.shortName + "</td>";
			read_one_html+="</tr>";			

			read_one_html+="<tr>";
				read_one_html+="<td>Contact Person</td>";
				read_one_html+="<td>" + data.contactPerson + "</td>";
			read_one_html+="</tr>";		

			read_one_html+="<tr>";
				read_one_html+="<td>Mobile</td>";
				read_one_html+="<td>" + data.mobile + "</td>";
			read_one_html+="</tr>";

			read_one_html+="<tr>";
				read_one_html+="<td>Mobile 2</td>";
				read_one_html+="<td>" + data.mobile2+ "</td>";
			read_one_html+="</tr>";
			
		read_one_html+="</table>";
		
		$("#page-content").html(read_one_html);
		 
		changePageTitle("Transport Details");   // Change Needed HERE
	});

    });
 
});