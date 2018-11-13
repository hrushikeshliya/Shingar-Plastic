$(document).ready(function(){
 
	var city_options_html=""; 
	var state_options_html=""; 
	var accountType_options_html=""; 
	var transport_options_html=""; 

	$.getJSON("http://shingarplastic.com/api/city/readCity.php", function(data){ 
		$.each(data.records, function(key, val){
				city_options_html+="<option value='" + val.cityName + "'>" + val.cityName + "</option>";
		});
	});   

	$.getJSON("http://shingarplastic.com/api/city/readState.php", function(data){ 
		$.each(data.records, function(key, val){
				state_options_html+="<option value='" + val.stateName + "'>" + val.stateName + "</option>";
		});
	}); 

	$.getJSON("http://shingarplastic.com/api/accountType/read.php", function(data){ 
		$.each(data.accountType, function(key, val){
				accountType_options_html+="<option value='" + val.Id + "'>" + val.name + "</option>";
		});
	});          

	$.getJSON("http://shingarplastic.com/api/transport/read.php", function(data){ 
		$.each(data.transport, function(key, val){
				transport_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
		});
	}); 

    $(document).on('click', '.update-button', function(){
        
		var id = $(this).attr('data-id');
		var update_html="";
		var openingDirection_options_html = "";
		var status_options_html = "";

        $.getJSON("http://shingarplastic.com/api/account/readOne.php?id=" + id, function(data){   // Change Needed HERE
	 

		openingDirection_options_html+="<select name='openingDirection' class='form-control'>";
		if(data.openingBalance >= 0) {
			openingDirection_options_html+="<option value='-1'>(Credit With Us) / (Money To Be Given)</option>";
			openingDirection_options_html+="<option value='1' selected>(Debit With Us) / (Money To Be Taken)</option>";
		} else {
			openingDirection_options_html+="<option value='-1' selected>(Credit With Us) / (Money To Be Given)</option>";
			openingDirection_options_html+="<option value='1'>(Debit With Us) / (Money To Be Taken)</option>";
		}
		openingDirection_options_html+="</select>";

		 status_options_html+="<select name='active' class='form-control'>";
		 if (data.active == 0) {	
			 status_options_html+="<option value='1'>Active</option>";
			 status_options_html+="<option value='0' selected>InActive</option>";
		 } else {
			 status_options_html+="<option value='1' selected>Active</option>";
			 status_options_html+="<option value='0'>InActive</option>";
		 }
 
		 status_options_html+="</select>";
		 
		update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    update_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		update_html+="</div>";
		
		update_html+="<form id='update-form' action='#' method='post' border='0'>";
		    update_html+="<table class='table table-hover table-responsive table-bordered'>";

				update_html+="<tr>";
					update_html+="<td>Account Name</td>";
					update_html+="<td><input value=\"" + data.name + "\" type='text' name='name' class='form-control' required /></td>";
					update_html+="<td>Alias Name</td>";
					update_html+="<td><input value=\"" + data.aliasName + "\" type='text' name='aliasName' class='form-control' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Opening Balance</td>";
					update_html+="<td><input value=\"" + Math.abs(data.openingBalance) + "\" type='number' step='0.01' name='openingBalance' class='form-control col-md-6' min='0' required />"+openingDirection_options_html+"</td>";
					update_html+="<td>Current Balance</td>";
					update_html+="<td><input value=\"" + data.currentBalance + "\" type='number' step='0.01' name='currentBalance' class='form-control' disabled/></td>";
				update_html+="</tr>";
				
				update_html+="<tr>";
					update_html+="<td>Address Line 1</td>";
					update_html+="<td><input value=\"" + data.address1 + "\" type='text' name='address1' class='form-control'/></td>";
					update_html+="<td>Address Line 2</td>";
					update_html+="<td><input value=\"" + data.address2 + "\" type='text' name='address2' class='form-control'/></td>";
				update_html+="</tr>";
				
				update_html+="<tr>";
					update_html+="<td>State</td>";
					update_html+="<td>";
					update_html+="<select id='state' name='state' class='form-control' onchange='reloadCity()'>";
					update_html+="<option value='" + data.state + "'>" + data.state + "</option>";
					update_html+=state_options_html+"</select></td>";
					update_html+="<td>City</td>";
					update_html+="<td>";
					update_html+="<select id='city' name='city' class='form-control'>";
					update_html+="<option value='" + data.city + "'>" + data.city + "</option>";
					update_html+=city_options_html+"</select></td>";
				update_html+="</tr>";
				
				update_html+="<tr>";
					update_html+="<td>Pincode</td>";
					update_html+="<td><input value=\"" + data.pincode + "\" type='number' name='pincode' class='form-control'/></td>";
					update_html+="<td>Landline</td>";
					update_html+="<td><input value=\"" + data.phone + "\" type='text' name='phone' class='form-control'/></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Mobile </td>";
					update_html+="<td><input value=\"" + data.mobile + "\" type='text' name='mobile' class='form-control'/></td>";
					update_html+="<td>Mobile 2</td>";
					update_html+="<td><input value=\"" + data.mobile2 + "\" type='text' name='mobile2' class='form-control'/></td>";
				update_html+="</tr>";
				
				update_html+="<tr>";
					update_html+="<td>Email</td>";
					update_html+="<td><input value=\"" + data.email + "\" type='email' name='email' class='form-control'/></td>";
					update_html+="<td>GST No</td>";
					update_html+="<td><input value=\"" + data.gstno + "\" type='text' name='gstno' class='form-control'/></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Transport Name</td>";
					update_html+="<td>";
					update_html+="<select name='transportId' class='form-control'>";
					update_html+="<option value='" + data.transportId + "'>" + data.transportName + "</option>";
					update_html+=transport_options_html+"</select></td>";
					update_html+="</td>";
					update_html+="<td>billLimit</td>";
					update_html+="<td><input value=\"" + data.billLimit + "\" type='number' name='billLimit' step='0.01' class='form-control' min = '0' max = '100' required /></td>";
				update_html+="</tr>";

				update_html+="<tr>";
					update_html+="<td>Status</td>";
					update_html+="<td>"+status_options_html+"</td>";
					update_html+="<td>Account Type</td>";
					update_html+="<td>";
					update_html+="<select name='typeId' class='form-control'>";
					update_html+="<option value='" + data.typeId + "'>" + data.accountType + "</option>";
					update_html+=accountType_options_html+"</select></td>";
					update_html+="</td>";
				update_html+="</tr>";

		        update_html+="<tr>";
		 
		            update_html+="<td colspan='4' class='align-centre'><input value=\"" + data.id + "\" name='id' type='hidden' />";
		 
		                update_html+="<button type='submit' class='btn btn-info'>";
		                    update_html+="<span class='glyphicon glyphicon-edit'></span> Update";
		                update_html+="</button>";
		            update_html+="</td>";
		 
		        update_html+="</tr>";
		 
		    update_html+="</table>";
		update_html+="</form>";

		$("#page-content").html(update_html);
		changePageTitle("Edit Account");   // Change Needed HERE		
		});
	     	     
	});
     
	$(document).on('submit', '#update-form', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/account/update.php",   // Change Needed HERE
		    type : "POST",
		    contentType : 'multipart/form-data',
		    data : form_data,
		    success : function(result) {
				show();
				//window.location.assign("http://shingarplastic.com/account.php")
		    },
		    error: function(xhr, resp, text) {
		        console.log(xhr, resp, text);
		    }
		});
	    return false;
	});
});