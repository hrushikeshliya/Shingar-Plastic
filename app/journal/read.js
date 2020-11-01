show($.cookie('startDate'),$.cookie('endDate'));
$(document).on('click', '.read-button', function(){
    show($.cookie('startDate'),$.cookie('endDate'));
});

$(document).on('click', '.search-button', function(){
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    show(startDate, endDate);
});

function show(startDate, endDate){
var params = "";

if(startDate != "") {
    params += "&startDate="+startDate;
}

if(endDate != "") {
    params += "&endDate="+endDate;
}

$.getJSON(apiURL+"/account/read.php?ts="+Math.random(), function(data){ 

    var accountList = "<option>All</option>"
    $.each(data.account, function(key, val){
        accountList += `<option value='${val.aliasName}'>${val.aliasName}</option>`
    });

$.getJSON(apiURL+"/transaction/read.php?type=JOU"+params+"&ts="+Math.random(), function(data){  // Change Needed HERE
 
    
read_html=`

<div class='row readOnlyContent'>

<div class='col-lg-2'>From : <input type='date' id='startDate' name='startDate' value='${startDate}' min='${$.cookie('startDate')}' max='${$.cookie('endDate')}' class='form-control pull-left m-b-15px'/></div>

<div class='col-lg-2'>To : <input type='date' id='endDate' name='endDate' value='${endDate}'  min='${$.cookie('startDate')}' max='${$.cookie('endDate')}' class='form-control pull-left m-b-15px'/></div>

<div class='col-lg-2'><br>
<div id='search' class='btn btn-success pull-leftm-b-15px search-button'>
<span class='glyphicon glyphicon-search'></span> Search
</div>
</div>

    <div class='col-md-4'> Select Account : 
        <select type='text' id='myInput' class='form-control pull-left m-b-15px' onchange='search()' placeholder='Search'>${accountList}</select>
    </div>

    <div class='col-lg-2'><br>
        <div id='print' class='btn btn-primary pull-right m-b-15px print-button'>
            <span class='glyphicon glyphicon-print'></span> Print
        </div>
    </div>
</div>`;

read_html+="<table class='table table-striped table-hover' id='myTable'>";
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Id</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Debit A/c</th>";
        read_html+="<th class='text-align-center'>Credit A/c</th>";
        read_html+="<th class='text-align-center'>Amount</th>";
        read_html+="<th class='text-align-center'>Username</th>";
        read_html+="<th class='text-align-center'>Narration</th>";
        read_html+="<th class='text-align-center readOnlyContent'>Action</th>";
    read_html+="</tr>";
     

$.each(data.transaction, function(key, val) {  // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.type +"_"+ val.id + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.debitAccount + "</td>";
        read_html+="<td>" + val.creditAccount + "</td>";
        read_html+="<td>" + parseFloat(val.amount).toFixed(2) + "</td>";
        read_html+="<td>" + val.username + "</td>";
        read_html+="<td>" + val.narration + "</td>";

        read_html+="<td class='text-align-center readOnlyContent'>";

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

});


});
 
}