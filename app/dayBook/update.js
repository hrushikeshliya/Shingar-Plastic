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
		
		if(data.type == 'REC'){
			update_html+="<h4 class='text-danger'>Payment Recieved / JAMA</h4><HR>";
		} else {
			update_html+="<h4 class='text-danger'>Payment Made</h4><HR>";
		}

		update_html+="<form id='update-form' action='#' method='post'>";

		update_html+="<input type='hidden' name='username' value='"+username+"'>";
		update_html+="<input type='hidden' name='type' value='"+data.type+"'>";
		update_html+="<input type='hidden' name='id' value='"+id+"'>";
		
		update_html+="<table class='table' id='myTable' border='all'>";
		
			update_html+="<tr>";
				update_html+="<th class='text-align-center'>Date</th>";
				update_html+="<th class='text-align-center'>Account Name (Alias)</th>";
				update_html+="<th class='text-align-center'>Amount</th>";
			update_html+="</tr>";
			 
			update_html+="<tr>";
				update_html+="<td><input type='date' name='date' id='date' value='"+data.date+"' class='form-control'></td>";
				
				if(data.type == 'REC'){
					update_html+="<td><input list='accountNameList' id='debitAcccount' name='debitAccount' value='"+data.debitAccount+"' class='form-control pull-left m-b-15px' required/></td>";
					update_html+="<input type='hidden' name='creditAccount' value='CASH A/C'>";
				} else {
					update_html+="<input type='hidden' name='debitAccount' value='CASH A/C'>";
					update_html+="<td><input list='accountNameList' id='creditAcccount' name='creditAccount' value='"+data.creditAccount+"' class='form-control pull-left m-b-15px' required/></td>";
				}

				update_html+="<td><input type='number' id='amount' min='0.001' step='0.001' name='amount' value='"+data.amount+"' class='form-control pull-left m-b-15px' required></td>";
			update_html+="</tr>";
		
			update_html+="<tr>";
				update_html+="<td colspan='2'>Narration : <input id='narration' name='narration' value='"+data.narration+"' class='form-control pull-left m-b-15px'/></td>";
				update_html+="<td class='text-right'>"; 
				update_html+="<button type='submit' class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + data.id + "'>";
					update_html+="<span class='glyphicon glyphicon-edit'> Update</span>";
				update_html+="</button>";
	 
				update_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + data.id + "'>";
					update_html+="<span class='glyphicon glyphicon-remove'> Delete</span>";
				update_html+="</button>";
			update_html+="</td>";

			update_html+="</tr>";
		
		update_html+="</table>";
		update_html+="</form>";

		$("#page-content").html(update_html);
		changePageTitle("Edit Day Book Entry");  // Change Needed HERE
		

		$.getJSON("http://shingarplastic.com/api/account/read.php", function(data){

			var dataList = $("#accountNameList");
			dataList.empty();
				
			$.each(data.account, function(key, val){
				var opt = $("<option></option>").attr("value", val.aliasName);
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