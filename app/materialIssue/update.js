$(document).ready(function(){
 
	var username = $.cookie('username');
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
        
        $.getJSON("http://shingarplastic.com/api/materialIssue/readOne.php?id=" + id, function(data){  // Change Needed HERE

		var item_options_html = "";
		var process_options_html = "";
		var jobber_options_html = "";
	
		$.getJSON("http://shingarplastic.com/api/item/read.php", function(data1){ 
				
			item_options_html+="<select name='itemId' class='form-control'>";
			$.each(data1.item, function(key, val){
				if(val.id==data.itemId) {
					item_options_html+="<option value='" + val.id + "' selected>" + val.name + "</option>";
				} else {
					item_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
				}
			});
			item_options_html+="</select>";
	
			$.getJSON("http://shingarplastic.com/api/process/read.php", function(data1){ 
				
				process_options_html+="<select name='processId' class='form-control'>";
				$.each(data1.process, function(key, val){
					if(val.id==data.processId) {
						process_options_html+="<option value='" + val.id + "' selected>" + val.name + "</option>";
					} else {
						process_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
					}
				});
				process_options_html+="</select>";
	
				$.getJSON("http://shingarplastic.com/api/account/read.php?type=JOBBER", function(data1){ 
				
					jobber_options_html+="<select name='jobberId' class='form-control'>";
					$.each(data1.account, function(key, val){
						if(val.id==data.jobberId) {
							jobber_options_html+="<option value='" + val.id + "' selected>" + val.name + "</option>";
						} else {
							jobber_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
						}});
					jobber_options_html+="</select>";


		var update_html="";
		 
		update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_html+="</div>";
		
		update_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Id</td>";
					update_html+="<td>"+id+"</td>";
					update_html+="<td>date</td>";
					update_html+="<td><input type='date' value='"+data.date+"' name='date' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Process Name</td>";
					update_html+="<td>"+process_options_html+"</td>";
					update_html+="<td>Jobber Name</td>";
					update_html+="<td>"+jobber_options_html+"</td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Item Name</td>";
					update_html+="<td>"+item_options_html+"</td>";
					update_html+="<td>Quantity (Psc)</td>";
           			update_html+="<td><input type='number' name='quantity' value='"+data.quantity+"' min = '1' class='form-control' required /></td>";
				update_html+="</tr>";				

				update_html+="<tr>";
					update_html+="<td>Narration</td>";
					update_html+="<td colspan = '3'><input type='text' value='"+data.narration+"' name='narration' class='form-control' required /></td>";
				update_html+="</tr>";

		        update_html+="<tr>";
		 
					update_html+="<td colspan='4' align='center'><input value=\"" + id + "\" name='id' type='hidden' /><input value=\"" + username + "\" name='username' type='hidden' />";
					
		                update_html+="<button type='submit' class='btn btn-info'>";
		                    update_html+="<span class='glyphicon glyphicon-edit'></span> Update";
		                update_html+="</button>";
		            update_html+="</td>";
		 
		        update_html+="</tr>";
		 
		    update_html+="</table>";
		update_html+="</form>";

		$("#page-content").html(update_html);
		changePageTitle("Edit Material Issue");  // Change Needed HERE
	
	});

});
}); 
		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/materialIssue/update.php",  // Change Needed HERE
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