$(document).ready(function(){
 
    $(document).on('click', '.update-button', function(){
        
        var id = $(this).attr('data-id');
		var username = $.cookie('username');
		
        $.getJSON("http://shingarplastic.com/api/transaction/readOne.php?id=" + id, function(data){  // Change Needed HERE

		var update_html = "";
		
		update_html+="<datalist id='accountNameList'>";
		update_html+="</datalist>";

		update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_html+="</div>";
		
		update_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Id</td>";
					update_html+="<td>"+data.type+"_"+data.id+"</td>";
				update_html+="</tr>";
				update_html+="<tr>";
					update_html+="<td>Date</td>";
					update_html+="<td>"+data.date+"</td>";
				update_html+="</tr>";
				update_html+="<tr>";
					update_html+="<td>Debit Account</td>";
					update_html+="<td><input list='accountNameList' type='text' name='debitAccount' id='debitAccount' value='"+data.debitAccount+"' class='form-control pull-left m-b-15px' required></td>";
				update_html+="</tr>";
				update_html+="<tr>";
					update_html+="<td>Credit Account</td>";
					update_html+="<td><input list='accountNameList' type='text' name='creditAccount' id='creditAccount' value='"+data.creditAccount+"' class='form-control pull-left m-b-15px' required></td>";
				update_html+="</tr>";
		        update_html+="<tr>";
				update_html+="<tr>";
					update_html+="<td>Amount</td>";
					update_html+="<td><input type='number' min=0.001 step=0.001 name='amount' id='amount' value='"+data.amount+"' class='form-control pull-left m-b-15px' required></td>";
				update_html+="</tr>";
				update_html+="<tr>";
					update_html+="<td>Narration</td>";
					update_html+="<td><input type='text' name='narration' id='narration' value='"+data.narration+"' class='form-control pull-left m-b-15px' required></td>";
				update_html+="</tr>";		 
		            update_html+="<td><input value=\"" + id + "\" name='id' type='hidden' />";
					update_html+="<input value=\"" + username+ "\" name='username' type='hidden' required/></td>";
		 
		            update_html+="<td>";
		                update_html+="<button type='submit' class='btn btn-info'>";
		                    update_html+="<span class='glyphicon glyphicon-edit'></span> Update";
		                update_html+="</button>";
		            update_html+="</td>";
		 
		        update_html+="</tr>";
		 
		    update_html+="</table>";
		update_html+="</form>";

		$("#page-content").html(update_html);
		changePageTitle("Edit Journal Entry");  // Change Needed HERE
		
		$.getJSON("http://shingarplastic.com/api/account/read.php", function(data){

    	var dataList = $("#accountNameList");
    	dataList.empty();
		$.each(data.account, function(key, val){
			var opt = $("<option></option>").attr("value", val.name);
			dataList.append(opt);
		});
		});

		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/transaction/update.php",  // Change Needed HERE
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