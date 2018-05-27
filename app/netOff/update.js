$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){  // Change Needed HERE
 
		 var id = data.id;
		 var name = data.name;
		 var rawType = data.rawType;
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

		 var raw_options_html = "";
		 raw_options_html+="<select name='rawType' class='form-control'>";
		 		 raw_options_html+="<option value='"+rawType+"'>"+rawType+"</option>";
				 raw_options_html+="<option value=''></option>";
				 raw_options_html+="<option value='RAW_MAT'>RAW_MAT</option>";
				 raw_options_html+="<option value='SEMI_FINISHED'>SEMI_FINISHED</option>";
				 raw_options_html+="<option value='FINISHED'>FINISHED</option>";                      
		 raw_options_html+="</select>";

		var update_html="";
		 
		update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_html+="</div>";
		
		update_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Item Group Name</td>";
					update_html+="<td><input value=\"" + name + "\" type='text' name='name' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Raw Type</td>";
					update_html+="<td>"+raw_options_html+"</td>";
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
		changePageTitle("Edit Item");  // Change Needed HERE
				
		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/item/update.php",  // Change Needed HERE
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