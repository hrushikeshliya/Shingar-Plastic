$(document).ready(function(){

    var username = $.cookie('username');
    var jobber_options_html = "";
    var issues_options_html = "<select id='issueId' name='issueId' class='form-control' onchange=getStats() required>";
    issues_options_html+="<option value=''>Id => Date | Quantity (Psc) | Item Name</option></select>";

    $.getJSON("http://shingarplastic.com/api/account/read.php?type=JOBBER", function(data){ 
            
        jobber_options_html+="<select id='jobberId' name='jobberId' class='form-control' onchange=getIssues()>";
        jobber_options_html+="<option value=''></option>";
        $.each(data.account, function(key, val){
            jobber_options_html+="<option value='" + val.id + "'>" + val.aliasName + "</option>";
        });
        jobber_options_html+="</select>";

        create();
        });

    function create() {

	var create_html="";
	 
	create_html+="<a class='btn btn-primary pull-right m-b-15px' href = './materialReceiveRegister.php'>";
	    create_html+="<span class='glyphicon glyphicon-th'></span> Material Receive Register";
	create_html+="</a>";
	
	create_html+="<form id='createForm' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";
 
        create_html+="<tr>";
            create_html+="<td>Date</td>";
            create_html+="<td><input type='date' name='date' class='form-control' required /></td>";
            create_html+="<td>Jobber</td>";
            create_html+="<td>"+jobber_options_html+"</td>";
        create_html+="</tr>";
 
        create_html+="<tr>";
            create_html+="<td>Item</td>";
            create_html+="<td colspan ='3'>"+issues_options_html+"</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Issued Quantity (Psc)</td>";
            create_html+="<td><input type='number' id='issuedQuantity' name='issuedQuantity' min = '1' class='form-control' disabled /></td>";
            create_html+="<td>Pending Quantiy (Psc)</td>";
            create_html+="<td><input type='number' id='pendingQuantity' name='pendingQuantity' min = '1' class='form-control' disabled /></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Issue Id</td>";
            create_html+="<td><input type='text' id = 'selectedIssue' name='selectedIssueId'  class='form-control' disabled /></td>";
            create_html+="<td>Received Quantity (Psc)</td>";
            create_html+="<td><input type='number' id='quantity' name='quantity' min = '1' class='form-control' onkeyup=getJobCharge() required/></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Rate</td>";
            create_html+="<td><input type='text' id='rate' min = 0 step=0.001 name='rate'  onkeyup=getJobCharge() class='form-control' required/></td>";
            create_html+="<td>Job Charge</td>";
            create_html+="<td><input type='text' id='jobCharge' name='jobCharge' class='form-control' required readOnly/></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Narration</td>";
            create_html+="<td colspan = '3'><input type='text' name='narration' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan='4' align='center'>";
                create_html+="<button type='submit' class='btn btn-success'>";
                    create_html+="Submit";
                create_html+="</button>";
                create_html+="<input type='hidden' name='username' value='"+username+"'>";
            create_html+="</td>";
        create_html+="</tr>";
 
    create_html+="</table>";
create_html+="</form>";

$("#page-content").html(create_html);
changePageTitle("Material Receive"); // Change Needed HERE
    }

});

$(document).on('submit', '#createForm', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: "http://shingarplastic.com/api/materialReceive/create.php",   // Change Needed HERE
    type : "POST",
    contentType : 'multipart/form-data',
    data : form_data,
    success : function(result) {
        location.reload();
    },
    error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
    }
});
 
return false;

});
