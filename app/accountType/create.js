$(document).ready(function(){
 
    $(document).on('click', '.create-button', function(){
	      
	var create_html="";
	 
	create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
	    create_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
	create_html+="</div>";
	
	create_html+="<form id='create-form' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";
 
        create_html+="<tr>";
            create_html+="<td>Account Type</td>";
            create_html+="<td><input type='text' name='name' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Description</td>";
            create_html+="<td><input type='text' name='description' class='form-control' /></td>";
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
changePageTitle("Create Account Type");  // Change Needed HERE
});
 
$(document).on('submit', '#create-form', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: "http://shingarplastic.com/api/accountType/create.php",  // Change Needed HERE
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