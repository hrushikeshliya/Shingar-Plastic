$(document).ready(function(){
 
    var city_options_html=""; 
    var state_options_html=""; 
    var accountType_options_html=""; 
    var transport_options_html=""; 
    var status_options_html = "";

    status_options_html+="<select name='active' class='form-control'>";
    status_options_html+="<option value='1'>Active</option>";
    status_options_html+="<option value='0'>InActive</option>";
    status_options_html+="</select>";
    
        $.getJSON(apiURL+"/city/readCity.php", function(data){ 
            
            city_options_html+="<select name='city' class='form-control'>";
            city_options_html+="<option value=''>---</option>";
            $.each(data.records, function(key, val){
                    city_options_html+="<option value='" + val.cityName + "'>" + val.cityName + "</option>";
            });
            city_options_html+="</select>";  
        });   

        $.getJSON(apiURL+"/city/readState.php", function(data){ 
            
            state_options_html+="<select name='state' class='form-control'>";
            state_options_html+="<option value=''>---</option>";
            $.each(data.records, function(key, val){
                    state_options_html+="<option value='" + val.stateName + "'>" + val.stateName + "</option>";
            });
            state_options_html+="</select>";  
        }); 

        $.getJSON(apiURL+"/accountType/read.php", function(data){ 
            
            accountType_options_html+="<select name='typeId' class='form-control' required>";
            $.each(data.accountType, function(key, val){
                    accountType_options_html+="<option value='" + val.Id + "'>" + val.name + "&nbsp&nbsp&nbsp"+val.description+"</option>";
            });
            accountType_options_html+="</select>";  
        });          

        $.getJSON(apiURL+"/transport/read.php", function(data){ 
            
            transport_options_html+="<select name='transportId' class='form-control'>";
            transport_options_html+="<option value=''>---</option>";
            $.each(data.transport, function(key, val){
                    transport_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
            });
            transport_options_html+="</select>";  
        }); 

    $(document).on('click', '.create-button', function(){
          
	var create_html="";
	 
	create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
	    create_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
	create_html+="</div>";
	
	create_html+="<form id='create-form' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";
 
        create_html+="<tr>";
            create_html+="<td>Account Name</td>";
            create_html+="<td><input type='text' name='name' class='form-control' required /></td>";
            create_html+="<td>Alias Name</td>";
            create_html+="<td><input type='text' name='aliasName' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Account Type</td>";
            create_html+="<td>"+accountType_options_html+"</td>";
            create_html+="<td>Transport</td>";
            create_html+="<td>"+transport_options_html+"</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Opening Balance";
            create_html+="</td>";
            create_html+="<td><input type='number' value=0 min=0 step='0.001' name='openingBalance' class='form-control' required />";
            create_html+="<select name='openingDirection' class='form-control'>";
            create_html+="<option value='-1'>(Credit With Us) / (Money To Be Given)</option>";
            create_html+="<option value='1'>(Debit With Us) / (Money To Be Taken)</option>";
            create_html+="</select>";
            create_html+="</td>";
            create_html+="<td>GST No</td>";
            create_html+="<td><input type='text' name='gstno' class='form-control' /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Address Line 1</td>";
            create_html+="<td><input type='text' name='address1' class='form-control' /></td>";
            create_html+="<td>Address Line 2</td>";
            create_html+="<td><input type='text' name='address2' class='form-control' /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>State</td>";
            create_html+="<td>"+state_options_html+"</td>";
            create_html+="<td>City</td>";
            create_html+="<td>"+city_options_html+"</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Pincode</td>";
            create_html+="<td><input type='number' name='pincode' class='form-control'/></td>";
            create_html+="<td>Landline</td>";
            create_html+="<td><input type='text' name='phone' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Mobile</td>";
            create_html+="<td><input type='text' name='mobile' class='form-control'/></td>";
            create_html+="<td>Mobile 2</td>";
            create_html+="<td><input type='text' name='mobile2' class='form-control'/></td>";
        create_html+="</tr>";


        create_html+="<tr>";
            create_html+="<td>Email</td>";
            create_html+="<td><input type='text' name='email' class='form-control' /></td>";
            create_html+="<td>Bill Limit</td>";
            create_html+="<td><input type='text' value='25' name='billLimit' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Status</td>";
            create_html+="<td>"+status_options_html+"</td>";
            create_html+="<td colspan=2>";
                create_html+="<button type='submit' class='btn btn-success'>";
                    create_html+="Submit";
                create_html+="</button>";
            create_html+="</td>";
        create_html+="</tr>";
 
    create_html+="</table>";
create_html+="</form>";

$("#page-content").html(create_html);
changePageTitle("Create Account");  // Change Needed HERE
});
 
$(document).on('submit', '#create-form', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: apiURL+"/account/create.php",  // Change Needed HERE
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