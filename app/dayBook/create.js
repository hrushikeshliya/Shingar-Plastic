$(document).ready(function(){
    create();
});

function create(){

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

create_html+="<h4 class='text-danger'>Payment Recieved / JAMA</h4><HR>";

create_html+="<form id='create-form' action='#' method='post'>";

create_html+="<input type='hidden' name='username' value='"+username+"'>";
create_html+="<input type='hidden' name='type' value='REC'>";
create_html+="<input type='hidden' name='creditAccount' value='CASH A/C'>";

create_html+="<table class='table' id='myTable' border='all'>";

    create_html+="<tr>";
		create_html+="<th class='text-align-center'>Date</th>";
		create_html+="<th class='text-align-center'>Account Name (Alias)</th>";
        create_html+="<th class='text-align-center'>Amount</th>";
    create_html+="</tr>";
     
    create_html+="<tr>";
        create_html+="<td><input type='date' name='date' id='date' class='form-control'></td>";
        create_html+="<td><input list='accountNameList' id='debitAcccount' name='debitAccount' class='form-control pull-left m-b-15px' required/></td>";
		create_html+="<td><input type='number' id='amount' min='0.001' step='0.001' name='amount' class='form-control pull-left m-b-15px' required></td>";
    create_html+="</tr>";

    create_html+="<tr>";
        create_html+="<td colspan='2'>Narration : <input id='narration' name='narration' class='form-control pull-left m-b-15px'/></th>";
        create_html+="<td class='text-align-centre'><BR>";
        create_html+="<button type='submit' class='btn btn-info'>";
        create_html+="<span class='glyphicon glyphicon-edit'></span> Submit";
    create_html+="</button></th>";
    create_html+="</tr>";

create_html+="</table>";
create_html+="</form>";

create_html+="<h4 class='text-danger'>Payment Made</h4><HR>";

create_html+="<form id='create-form' action='#' method='post'>";

create_html+="<input type='hidden' name='username' value='"+username+"'>";
create_html+="<input type='hidden' name='type' value='PAY'>";
create_html+="<input type='hidden' name='debitAccount' value='CASH A/C'>";

create_html+="<table class='table' id='myTable' border='all'>";

    create_html+="<tr>";
		create_html+="<th class='text-align-center'>Date</th>";
		create_html+="<th class='text-align-center'>Account Name (Alias)</th>";
        create_html+="<th class='text-align-center'>Amount</th>";
    create_html+="</tr>";
     
    create_html+="<tr>";
        create_html+="<td><input type='date' name='date' id='date' class='form-control'></td>";
		create_html+="<td><input list='accountNameList' id='creditAccount' name='creditAccount' class='form-control pull-left m-b-15px' required/></td>";
        create_html+="<td><input type='number' id='amount' min='0.001' step='0.001'  name='amount' class='form-control pull-left m-b-15px' required></td>";
    create_html+="</tr>";

    create_html+="<tr>";
        create_html+="<td colspan='2'>Narration : <input id='narration' name='narration' class='form-control pull-left m-b-15px'/></th>";
        create_html+="<td class='text-align-centre'><BR>";
        create_html+="<button type='submit' class='btn btn-info'>";
        create_html+="<span class='glyphicon glyphicon-edit'></span> Submit";
    create_html+="</button></th>";
    create_html+="</tr>";

create_html+="</table>";
create_html+="</form>";

$("#page-content").html(create_html);
changePageTitle("Day Book Entry");  // Change Needed HERE

$.getJSON(apiURL+"/account/read.php", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();
    var parser = new DOMParser;
	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", parser.parseFromString(val.aliasName,'text/html').body.textContent);
        dataList.append(opt);
    });
});


$(document).on('submit', '#create-form', function(){
    
    var form_data = JSON.stringify($(this).serializeObject());
    var date = $(this).serializeObject().date;
    $.ajax({
        url: apiURL+"/transaction/create.php",   // Change Needed HERE
        type : "POST",
        contentType : 'multipart/form-data',
        data : form_data,
        success : function(result) {
            show(date,date);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
    return false;
});
 
}