$(document).ready(function(){
    show("","","","");

    $(document).on('click', '.read-button', function(){
        show("","","","");
    });

    $(document).on('click', '.search-button', function(){
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var accountId = $("#accountId").val();
        var itemId = $("#itemId").val();
        show(startDate, endDate, accountId, itemId);
    }); 

    $(document).on('click', '.print-button', function(){
        $("#read").hide();
        $("#print").hide();
        $("#page-title").hide();
        $(".readOnlyContent").hide();
        window.print();
        $("#read").show();
        $("#print").show();
        $("#page-title").show();
        $(".readOnlyContent").show();
	});
});

function show(startDate, endDate, accountId, itemId){

    var params = "";
    var totalQty = 0;
    var totalAmt = 0;
    
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
 
$.getJSON("http://shingarplastic.com/api/materialReceive/read.php?temp=temp"+params, function(data){    // Change Needed HERE
 
 
read_html="";
 
read_html+="<div class='row readOnlyContent' id='read'>";

    read_html+="<div class='col-lg-2'>";
    read_html+="From : ";
    read_html+="<input type='date' id='startDate' name='startDate' value='"+startDate+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="To : ";
    read_html+="<input type='date' id='endDate' name='endDate' value='"+endDate+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="Account Name :";
    read_html+="<select id='accountId' name='accountId' class='form-control pull-left m-b-15px'>";
    read_html+="<option></option>";

    $.getJSON("http://shingarplastic.com/api/account/read.php?type=JOBBER", function(data3){    
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

    $.getJSON("http://shingarplastic.com/api/item/read.php", function(data4){    
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
        read_html+="<th class='text-align-center'>Issue ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Jobber Name</th>";
        read_html+="<th class='text-align-center'>Item Name</th>";
        read_html+="<th class='text-align-center'>Received Quantity</th>";
        read_html+="<th class='text-align-center'>Job Rate</th>";
        read_html+="<th class='text-align-center'>Job Charge</th>";
        read_html+="<th class='text-align-center'>Narration</th>";
        read_html+="<th class='text-align-center readOnlyContent'>Action</th>";
    read_html+="</tr>";
     

$.each(data.materialReceive, function(key, val) {   // Change Needed HERE
 	
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.issueId + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.aliasName + "</td>";
        read_html+="<td>" + val.itemName + "</td>";
        read_html+="<td>" + val.quantity + "</td>";
        read_html+="<td>" + val.rate+ "</td>";
        read_html+="<td>" + val.jobCharge + "</td>";
        read_html+="<td>" + val.narration + "</td>";
        read_html+="<td align='center' class='readOnlyContent'>";

            read_html+="<button class='btn btn-primary m-r-10px m-b-10px read-one-button' data-id='" + val.issueId + "'>";
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
    totalAmt += +val.jobCharge;
});

read_html+="</table>";

read_html+="<h5 class='text-danger m-l-15px'>Total Quantity : <span id='totalQty'></span>&nbsp;&nbsp;&nbsp; Total Amount : <span id='totalAmt'></span></h5>";
read_html+="<HR>";

$("#page-content").html(read_html);
$("#totalQty").html(totalQty);
$("#totalAmt").html(parseFloat(totalAmt).toFixed(3));
changePageTitle("Material Receive Register");  // Change Needed HERE

});
});
});
}