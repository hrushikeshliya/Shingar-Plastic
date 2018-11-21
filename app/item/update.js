$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){  // Change Needed HERE
 
		 var id = data.id;
		 var name = data.name;
		 var rawType = data.rawType;
		 var active = data.active;

		 var itemGroup_options_html = "";

		 $.getJSON("http://shingarplastic.com/api/itemGroup/read.php", function(data2){ 
				 
			 itemGroup_options_html+="<select name='itemGroup' class='form-control'>";
			 $.each(data2.itemGroup, function(key2, val2){
				 if(val2.name == data.itemGroup) {
				 	itemGroup_options_html+="<option value='" + val2.id + "' selected>" + val2.name + "</option>";
				 } else {
					itemGroup_options_html+="<option value='" + val2.id + "'>" + val2.name + "</option>";
				 }
			 });
			 itemGroup_options_html+="</select>";
		 

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

		update_html+="<table class='table table-bordered table-responsive table-hover'>";
		 

		update_html+="<tr>";
			update_html+="<td>Id</td>";
			update_html+="<td>" + data.id + "</td>";
			update_html+="<td>Item Name</td>";
			update_html+="<td><input type='text' class='form-control' name='itemName' value='" + data.name + "' required></td>";
		update_html+="</tr>";

		update_html+="<tr>";
			update_html+="<td>Item Group</td>";
			update_html+="<td>" + itemGroup_options_html + "</td>";
			update_html+="<td>Item Weight</td>";
			update_html+="<td><input type='number' class='form-control' step='0.001' name = 'itemWeight' value='" + data.itemWeight+ "' min=0></td>";
		update_html+="</tr>";			

		update_html+="<tr>";
			update_html+="<td>Purchase Rate</td>";
			update_html+="<td><input type='number' class='form-control' step='0.001' name = 'purchaseRate' value='" + data.purchaseRate+ "' min=0></td>";
			update_html+="<td>Sale Rate</td>";
			update_html+="<td><input type='number' class='form-control' step='0.001' name = 'saleRate' value='" + data.saleRate+ "' min=0.001 required></td>";
		update_html+="</tr>";			

		update_html+="<tr>";
			update_html+="<td>Job Rate</td>";
			update_html+="<td><input type='number' class='form-control' step='0.001' name = 'jobRate' value='" + data.jobRate+ "' min=0></td>";
			update_html+="<td>HSN / SAC</td>";
			update_html+="<td><input type='text' class='form-control' name='hsnSac' value='" + data.hsnSac + "' required></td>";
		update_html+="</tr>";			

		update_html+="<tr>";
		update_html+="<td>Narration</td>";
		update_html+="<td><input type='text' class='form-control' name='narration' value='" + data.narration + "'></td>";
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
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/item/update.php",  // Change Needed HERE
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