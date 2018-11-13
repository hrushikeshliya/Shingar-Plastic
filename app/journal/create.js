$(document).ready(function(){
    show();
});

function show(){
var username = $.cookie('username');

create_html="";

create_html+="<div class='row'>";
create_html+="<div class='col-md-5'>";

create_html+="<datalist id='accountNameList'>";
create_html+="</datalist>";
create_html+="</div>";
create_html+="<div class='col-md-3'>";
create_html+="";
create_html+="</div>";
create_html+="<div class='col-md-4'>";
create_html+="";
create_html+="</div>";

create_html+="</div>";

create_html+="<form id='update-form' action='#' method='post'>";

create_html+="<table class='table' id='myTable' border='all'>";

create_html+="<tr>";
create_html+="<td colspan=5> Date : <input type='date' name='date' id='date' required>";
create_html+="<input type='hidden' name='type' id='type' value='JOU'>";
create_html+="<input type='hidden' name='username' id='username' value='"+username+"'></td>";
create_html+="</tr>";
    create_html+="<tr>";
        create_html+="<th class='text-align-center'>Debit A/c</th>";
        create_html+="<th class='text-align-center'>Balance</th>";
        create_html+="<th class='text-align-center'>Credit A/c</th>";
        create_html+="<th class='text-align-center'>Balance</th>";
        create_html+="<th class='text-align-center'>Amount</th>";
    create_html+="</tr>";
     
    create_html+="<tr>";
        create_html+="<td><input list='accountNameList' id='debitAccount' name='debitAccount' class='form-control pull-left m-b-15px' required/></td>";
        create_html+="<td><input type='number' id='currentDebitAmt' name='currentDebitAmt' class='form-control pull-left m-b-15px' required disabled></td>";
        create_html+="<td><input list='accountNameList' id='creditAccount' name='creditAccount' class='form-control pull-left m-b-15px' required/></td>";
        create_html+="<td><input type='number' id='currentCreditAmt' name='currentCreditAmt' class='form-control pull-left m-b-15px' required disabled></td>";
        create_html+="<td><input type='number' id='amount' name='amount' required></td>";
    create_html+="</tr>";

    create_html+="<tr>";
        create_html+="<td colspan='4'>Narration : <input id='narration' name='narration' class='form-control pull-left m-b-15px'/></th>";
        create_html+="<td class='text-align-center'><BR>";
        create_html+="<button type='submit' class='btn btn-info'>";
        create_html+="<span class='glyphicon glyphicon-edit'></span> Submit";
    create_html+="</button></th>";
    create_html+="</tr>";

create_html+="</table>";
create_html+="</form>";
$("#page-content").html(create_html);
changePageTitle("Journal Entry");  // Change Needed HERE

$.getJSON("http://shingarplastic.com/api/account/read.php", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.name);
        dataList.append(opt);
    });
});


$(document).on('submit', '#update-form', function(){
	
    var form_data=JSON.stringify($(this).serializeObject());
    
    $.ajax({
        url: "http://shingarplastic.com/api/transaction/create.php",   // Change Needed HERE
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
 
}