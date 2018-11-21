$(document).ready(function(){
    show();
    $(document).on('click', '.read-button', function(){
        show();
    });
});

function show(){
 
$.getJSON("http://shingarplastic.com/api/transaction/read.php?type=JOU", function(data){  // Change Needed HERE
 
 
read_html="";

read_html+="<div class='row'>";
read_html+="<div class='col-md-5'>";

read_html+="<input type='text' list='accountNameList' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search()' placeholder='Search'>";
read_html+="<datalist id='accountNameList'>";
read_html+="</datalist>";
read_html+="</div>";
read_html+="<div class='col-md-3'>";
read_html+="";
read_html+="</div>";
read_html+="<div class='col-md-4'>";
read_html+="";
read_html+="</div>";

read_html+="</div>";

read_html+="<table class='table table-striped table-hover' id='myTable'>";
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Id</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Debit A/c</th>";
        read_html+="<th class='text-align-center'>Credit A/c</th>";
        read_html+="<th class='text-align-center'>Amount</th>";
        read_html+="<th class='text-align-center'>Username</th>";
        read_html+="<th class='text-align-center'>Narration</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.transaction, function(key, val) {  // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.type +"_"+ val.id + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.debitAccount + "</td>";
        read_html+="<td>" + val.creditAccount + "</td>";
        read_html+="<td>" + val.amount + "</td>";
        read_html+="<td>" + val.username + "</td>";
        read_html+="<td>" + val.narration + "</td>";

        read_html+="<td class='text-align-center'>";

            read_html+="<button class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span>";
            read_html+="</button>";
 
            read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span>";
            read_html+="</button>";
        read_html+="</td>";

 
    read_html+="</tr>";
 
});

read_html+="</table>";

$("#page-content").html(read_html);
changePageTitle("Journal Register");  // Change Needed HERE

$.getJSON("http://shingarplastic.com/api/account/read.php", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.aliasName);
        dataList.append(opt);
    });
});


});
 
}