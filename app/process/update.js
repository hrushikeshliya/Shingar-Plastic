$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON(apiURL+"/process/readOne.php?id=" + id, function(data){   // Change Needed HERE
 
		 var id = data.id;
		 var name = data.name;
		 var active = data.active;

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
		    update_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Process Name</td>";
					update_html+="<td><input value=\"" + name + "\" type='text' name='name' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Status</td>";
					update_html+="<td>"+status_options_html+"</td>";
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
		changePageTitle("Edit Process");   // Change Needed HERE
				
		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: apiURL+"/process/update.php",   // Change Needed HERE
		    type : "POST",
		    contentType : 'multipart/form-data',
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