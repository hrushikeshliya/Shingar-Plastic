$(document).ready(function(){
 
    $(document).on('click', '.create-button', function(){
          
    var raw_options_html = "";
    raw_options_html+="<select name='rawType' class='form-control'>";
            raw_options_html+="<option value=''></option>";
            raw_options_html+="<option value='RAW_MAT'>RAW_MAT</option>";
            raw_options_html+="<option value='SEMI_FINISHED'>SEMI_FINISHED</option>";
            raw_options_html+="<option value='FINISHED'>FINISHED</option>";                      
	raw_options_html+="</select>";
        
	var create_html="";
	 
	create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
	    create_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
	create_html+="</div>";
	
	create_html+="<form id='createForm' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";
 
        create_html+="<tr>";
            create_html+="<td>Item Group Name</td>";
            create_html+="<td><input type='text' name='name' class='form-control' required /></td>";
        create_html+="</tr>";
 
        create_html+="<tr>";
            create_html+="<td>Raw Type</td>";
            create_html+="<td>"+raw_options_html+"</td>";
        create_html+="</tr>";
        
        create_html+="<tr>";
            create_html+="<td></td>";
            create_html+="<td>";
                create_html+="<button type='submit' class='btn btn-success'>";
                    create_html+="Submit";
                create_html+="</button>";
            create_html+="</td>";
        create_html+="</tr>";
 
    create_html+="</table>";
create_html+="</form>";

$("#page-content").html(create_html);
changePageTitle("Create Item Group"); // Change Needed HERE
    
});
 
$(document).on('submit', '#createForm', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: apiURL+"/itemGroup/create.php",   // Change Needed HERE
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