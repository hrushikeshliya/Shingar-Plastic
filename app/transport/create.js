$(document).ready(function(){
 
    $(document).on('click', '.create-button', function(){
	      
	var create_html="";
	 
	create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
	    create_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
	create_html+="</div>";
	
	create_html+="<form id='create-form' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";
 
        create_html+="<tr>";
            create_html+="<td>Transport Name</td>";
            create_html+="<td><input type='text' name='name' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Transport Short Name</td>";
            create_html+="<td><input type='text' name='shortName' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Contact Person</td>";
            create_html+="<td><input type='text' name='contactPerson' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Mobile</td>";
            create_html+="<td><input type='text' name='mobile' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Mobile 2</td>";
            create_html+="<td><input type='text' name='mobile2' class='form-control'/></td>";
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
    changePageTitle("Create Transport"); //Change Needed Here
        
    });
 
$(document).on('submit', '#create-form', function(){

    var form_data=JSON.stringify($(this).serializeObject());

    $.ajax({
        url: apiURL+"/transport/create.php", //Change Needed Here
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