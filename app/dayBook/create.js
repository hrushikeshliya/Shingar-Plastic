$(document).ready(function(){
    show();
});

function show(){

var username = $.cookie('username');

create_html="";

create_html+="<div class='row'>";
create_html+="<div class='col-md-5'>";

create_html+="<datalist id='debtorAccountNameList'>";
create_html+="</datalist>";

create_html+="<datalist id='creditorAccountNameList'>";
create_html+="</datalist>";

create_html+="<datalist id='jobberAccountNameList'>";
create_html+="</datalist>";

create_html+="</div>";
create_html+="<div class='col-md-3'>";
create_html+="";
create_html+="</div>";
create_html+="<div class='col-md-4'>";
create_html+="";
create_html+="</div>";

create_html+="</div>";

create_html+="Payment Recieved / JAMA<HR>";

create_html+="<form id='create-form' action='#' method='post'>";

create_html+="<input type='hidden' name='username' value='"+username+"'>";
create_html+="<input type='hidden' name='type' value='REC'>";
create_html+="<input type='hidden' name='creditAccount' value='CASH A/C'>";

//Date : <input type='date' name='date' id='date' required>
create_html+="<table class='table' id='myTable' border='all'>";

    create_html+="<tr>";
		create_html+="<th class='text-align-center'>Date</th>";
		create_html+="<th class='text-align-center'>Buyer</th>";
        //create_html+="<th class='text-align-center'>Balance</th>";
        create_html+="<th class='text-align-center'>Amount</th>";
    create_html+="</tr>";
     
    create_html+="<tr>";
        create_html+="<td><input type='date' name='date' id='date' class='form-control'></td>";
        create_html+="<td><input list='debtorAccountNameList' id='debitAcccount' name='debitAccount' class='form-control pull-left m-b-15px' required/></td>";
		//create_html+="<td><input type='number' id='currentDebitAmt' name='currentDebitAmt' class='form-control pull-left m-b-15px' required disabled></td>";
        create_html+="<td><input type='number' id='amount' name='amount' class='form-control pull-left m-b-15px' required></td>";
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

create_html+="Payment Made <HR>";

create_html+="<form id='create-form' action='#' method='post'>";

create_html+="<input type='hidden' name='username' value='"+username+"'>";
create_html+="<input type='hidden' name='type' value='PAY'>";
create_html+="<input type='hidden' name='debitAccount' value='CASH A/C'>";

create_html+="<table class='table' id='myTable' border='all'>";

    create_html+="<tr>";
		create_html+="<th class='text-align-center'>Date</th>";
		create_html+="<th class='text-align-center'>Supplier</th>";
        //create_html+="<th class='text-align-center'>Balance</th>";
        create_html+="<th class='text-align-center'>Amount</th>";
    create_html+="</tr>";
     
    create_html+="<tr>";
        create_html+="<td><input type='date' name='date' id='date' class='form-control'></td>";
		create_html+="<td><input list='creditorAccountNameList' id='creditAccount' name='creditAccount' class='form-control pull-left m-b-15px' required/></td>";
        //create_html+="<td><input type='number' id='currentCreditAmt' name='currentCreditAmt' class='form-control pull-left m-b-15px' required disabled></td>";
        create_html+="<td><input type='number' id='amount' name='amount' class='form-control pull-left m-b-15px' required></td>";
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

create_html+="<form id='create-form' action='#' method='post'>";

create_html+="<input type='hidden' name='username' value='"+username+"'>";
create_html+="<input type='hidden' name='type' value='PAY'>";
create_html+="<input type='hidden' name='debitAccount' value='CASH A/C'>";

create_html+="<table class='table' id='myTable' border='all'>";

    create_html+="<tr>";
		create_html+="<th class='text-align-center'>Date</th>";
		create_html+="<th class='text-align-center'>Jobber</th>";
        //create_html+="<th class='text-align-center'>Balance</th>";
        create_html+="<th class='text-align-center'>Amount</th>";
    create_html+="</tr>";
     
    create_html+="<tr>";
        create_html+="<td><input type='date' name='date' id='date' class='form-control'></td>";
		create_html+="<td><input list='jobberAccountNameList' id='creditAccount' name='creditAccount' class='form-control pull-left m-b-15px' required/></td>";
        //create_html+="<td><input type='number' id='currentCreditAmt' name='currentCreditAmt' class='form-control pull-left m-b-15px' required disabled></td>";
        create_html+="<td><input type='number' id='amount' name='amount' class='form-control pull-left m-b-15px' required></td>";
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

$.getJSON("http://shingarplastic.com/api/account/read.php?type=DEBTORS", function(data){

    var dataList = $("#debtorAccountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.name);
        dataList.append(opt);
    });
});

$.getJSON("http://shingarplastic.com/api/account/read.php?type=CREDITORS", function(data){

    var dataList = $("#creditorAccountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.name);
        dataList.append(opt);
    });
});

$.getJSON("http://shingarplastic.com/api/account/read.php?type=JOBBER", function(data){

    var dataList = $("#jobberAccountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.name);
        dataList.append(opt);
    });
});


$(document).on('submit', '#create-form', function(){
	
    var form_data=JSON.stringify($(this).serializeObject());
    
    $.ajax({
        url: "http://shingarplastic.com/api/transaction/create.php",   // Change Needed HERE
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
 
}