$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	
	$.getJSON(apiURL+"/accountType/readOne.php?id=" + id+"&ts="+Math.random(), function(data){    // Change Needed HERE

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
		        read_one_html+="<td>Account Type</td>";
		        read_one_html+="<td>" + data.name + "</td>";
			read_one_html+="</tr>";
			
			read_one_html+="<tr>";
			read_one_html+="<td>DESCRIPTION</td>";
			read_one_html+="<td>" + data.description + "</td>";
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
		 
		changePageTitle("Account Type Details");   // Change Needed HERE
	});

    });
 
});