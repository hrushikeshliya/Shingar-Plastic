$(document).ready(function(){
    show($.cookie('startDate'),$.cookie('endDate'),"","");

    $(document).on('click', '.read-button', function(){
        show($.cookie('startDate'),$.cookie('endDate'),"","");
    });

    $(document).on('click', '.search-button', function(){
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var departmentId = $("#departmentId").val();
        var accountId = $("#accountId").val();
        var itemId = $("#itemId").val();
        show(startDate, endDate, accountId, itemId);
    });     
});

function show(startDate, endDate, accountId, itemId){

    var params = "";
    var totalQty = 0;
    
    if(startDate != "") {
        params += "&startDate="+startDate;
    }
    
    if(endDate != "") {
        params += "&endDate="+endDate;
    }
        
    if(accountId != "") {
        params += "&accountId="+accountId;
    }
    
    if(itemId != "") {
        params += "&itemId="+itemId;
    }
 
$.getJSON(apiURL+"/materialIssue/read.php?temp=temp"+params+"&ts="+Math.random(), function(data){    // Change Needed HERE
 
read_html="";

read_html+="<div class='row readOnlyContent'>";

    read_html+="<div class='col-lg-2'>";
    read_html+="From : ";
    read_html+="<input type='date' id='startDate' name='startDate' value='"+startDate+"'  min='"+$.cookie('startDate')+"' max='"+$.cookie('endDate')+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="To : ";
    read_html+="<input type='date' id='endDate' name='endDate' value='"+endDate+"'  min='"+$.cookie('startDate')+"' max='"+$.cookie('endDate')+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="Account Name :";
    read_html+="<select id='accountId' name='accountId' class='form-control pull-left m-b-15px'>";
    read_html+="<option></option>";

    $.getJSON(apiURL+"/account/read.php?type=JOBBER"+"&ts="+Math.random(), function(data3){    
        $.each(data3.account, function(key3, val3){
            if(accountId == val3.id) {
                read_html += "<option value="+val3.id+" selected>"+val3.aliasName+"</option>";
            } else {
                read_html += "<option value="+val3.id+">"+val3.aliasName+"</option>";
            }
            
        });

    read_html+="</select>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="Item Name :";
    read_html+="<select id='itemId' name='itemId' class='form-control pull-left m-b-15px'>";
    read_html+="<option></option>";

    $.getJSON(apiURL+"/item/read.php?ts="+Math.random(), function(data4){    
        $.each(data4.item, function(key4, val4){
            if(itemId == val4.id) {
                read_html += "<option value="+val4.id+" selected>"+val4.name+"</option>";
            } else {
                read_html += "<option value="+val4.id+">"+val4.name+"</option>";
            }
            
        });

    read_html+="</select>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'><br>";
    read_html+="<div id='search' class='btn btn-success pull-left m-b-15px search-button'>";
    read_html+="<span class='glyphicon glyphicon-search'></span>";
    read_html+="</div>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'><br>";
    read_html+="<div id='print' class='btn btn-primary pull-right m-b-15px print-button'>";
    read_html+="<span class='glyphicon glyphicon-print'></span> Print";
    read_html+="</div>";
    read_html+="</div>";

read_html+="</div>";

read_html+="<table class='table table-bordered table-hover' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Jobber Name</th>";
        read_html+="<th class='text-align-center'>Item Name</th>";
        read_html+="<th class='text-align-center'>Issued Quantity</th>";
        read_html+="<th class='text-align-center'>Pending Quantity</th>";
        read_html+="<th class='text-align-center'>Narration</th>";
        read_html+="<th class='text-align-center'>Entry By</th>";
        read_html+="<th class='text-align-center readOnlyContent'>Action</th>";
    read_html+="</tr>";
     

$.each(data.materialIssue, function(key, val) {   // Change Needed HERE
     

    if(val.pendingQuantity != "0") {
        rowClass = "class='danger'";
    } else {
        rowClass = "class='success'";
    }

        read_html+="<tr "+rowClass+">";
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.aliasName + "</td>";
        read_html+="<td>" + val.itemName + "</td>";
        read_html+="<td>" + val.quantity + "</td>";
        read_html+="<td>" + val.pendingQuantity + "</td>";
        read_html+="<td>" + val.narration + "</td>";
        read_html+="<td>" + val.username + "</td>";

        read_html+="<td align='center' class='readOnlyContent'>";

            read_html+="<button class='btn btn-primary m-r-10px m-b-10px read-one-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-eye-open'></span>";
            read_html+="</button>";
 
            read_html+="<button class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span>";
            read_html+="</button>";
 
            read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span>";
            read_html+="</button>";
        read_html+="</td>";
 
    read_html+="</tr>";

    totalQty += +val.quantity;
 
});

read_html+="</table>";

read_html+="<h5 class='text-danger m-l-15px'>Total Quantity : <span id='totalQty'></span></h5>";
read_html+="<HR>";

$("#page-content").html(read_html);
$("#totalQty").html(totalQty);
changePageTitle("Material Issue Register");  // Change Needed HERE


});
});
});
}