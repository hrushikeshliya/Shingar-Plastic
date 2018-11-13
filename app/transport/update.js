$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON("http://shingarplastic.com/api/transport/readOne.php?id=" + id, function(data){   // Change Needed HERE
 
		 var id = data.id;
		 var name = data.name;
		 var shortName = data.shortName;
		 var contactPerson = data.contactPerson;
		 var mobile = data.mobile;
		 var mobile2 = data.mobile2;

		var update_html="";
		 
		update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_html+="</div>";
		
		update_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Transport Name</td>";
					update_html+="<td><input value=\"" + name + "\" type='text' name='name' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Transport Short Name</td>";
					update_html+="<td><input value=\"" + shortName + "\" type='text' name='shortName' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Contact Person</td>";
					update_html+="<td><input value=\"" + contactPerson + "\" type='text' name='contactPerson' class='form-control'/></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Mobile</td>";
					update_html+="<td><input value=\"" + mobile + "\" type='text' name='mobile' class='form-control'/></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Mobile2</td>";
					update_html+="<td><input value=\"" + mobile2 + "\" type='text' name='mobile2' class='form-control'/></td>";
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
		changePageTitle("Edit Transport");   // Change Needed HERE
				
		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/transport/update.php",  // Change Needed HERE
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