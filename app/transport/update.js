$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON("http://shingarplastic.com/api/roles/readOne.php?id=" + id, function(data){
 
		 var id = data.id;
		 var name = data.name;

		var update_product_html="";
		 
		update_product_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_product_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_product_html+="</div>";
		
		update_product_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_product_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_product_html+="<tr>";
					update_product_html+="<td>Role Name</td>";
					update_product_html+="<td><input value=\"" + name + "\" type='text' name='name' class='form-control' required /></td>";
				update_product_html+="</tr>";
				
		        update_product_html+="<tr>";
		 
		            update_product_html+="<td><input value=\"" + id + "\" name='id' type='hidden' /></td>";
		 
		            update_product_html+="<td>";
		                update_product_html+="<button type='submit' class='btn btn-info'>";
		                    update_product_html+="<span class='glyphicon glyphicon-edit'></span> Update";
		                update_product_html+="</button>";
		            update_product_html+="</td>";
		 
		        update_product_html+="</tr>";
		 
		    update_product_html+="</table>";
		update_product_html+="</form>";

		$("#page-content").html(update_product_html);
		changePageTitle("Edit Role");
				
		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/roles/update.php",
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