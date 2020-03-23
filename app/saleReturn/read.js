$(document).ready(function(){
    show($.cookie("startDate"),$.cookie("endDate"),"","","");

    $(document).on('click', '.search-button', function(){
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var departmentId = $("#departmentId").val();
        var accountId = $("#accountId").val();
        var itemId = $("#itemId").val();
        show(startDate, endDate, departmentId, accountId, itemId);
    });
});

function show(startDate, endDate, departmentId, accountId, itemId){

    var params = "";
    var totalQty = 0;
    var totalAmt = 0;
    
    if(startDate != undefined) {
        params += "&startDate="+startDate;
    }
    
    if(endDate != undefined) {
        params += "&endDate="+endDate;
    }
    
    if(departmentId != undefined) {
        params += "&departmentId="+departmentId;
    }
    
    if(accountId != undefined) {
        params += "&accountId="+accountId;
    }
    
    if(itemId != undefined) {
        params += "&itemId="+itemId;
    }
    

$.getJSON(apiURL+"/saleReturn/read.php?type=saleReturn"+params, function(data){    // Change Needed HERE
 
read_html="";

read_html+="<div class='row readOnlyContent'>";

    read_html+="<div class='col-lg-2'>";
    read_html+="From : ";
    read_html+="<input type='date' id='startDate' name='startDate' value='"+startDate+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="To : ";
    read_html+="<input type='date' id='endDate' name='endDate' value='"+endDate+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="Department Name :";
    read_html+="<select id='departmentId' name='departmentId' class='form-control pull-left m-b-15px'>";
    read_html+="<option></option>";

    $.getJSON(apiURL+"/department/read.php", function(data2){    
        $.each(data2.department, function(key2, val2){
            if(departmentId == val2.Id) {
                read_html += "<option value="+val2.Id+" selected>"+val2.name+"</option>";
            } else {
                read_html += "<option value="+val2.Id+">"+val2.name+"</option>";
            }
            
        });

    read_html+="</select>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="Account Name :";
    read_html+="<select id='accountId' name='accountId' class='form-control pull-left m-b-15px'>";
    read_html+="<option></option>";

    $.getJSON(apiURL+"/account/read.php?type=DEBTORS", function(data3){    
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

    $.getJSON(apiURL+"/item/read.php", function(data4){    
        $.each(data4.item, function(key4, val4){
            if(itemId == val4.id) {
                read_html += "<option value="+val4.id+" selected>"+val4.name+"</option>";
            } else {
                read_html += "<option value="+val4.id+">"+val4.name+"</option>";
            }
            
        });

    read_html+="</select>";
    read_html+="</div>";

    read_html+="<div class='col-lg-1'><br>";
    read_html+="<div id='search' class='btn btn-success pull-left m-b-15px search-button'>";
    read_html+="<span class='glyphicon glyphicon-search'></span>";
    read_html+="</div>";
    read_html+="</div>";

    read_html+="<div class='col-lg-1'><br>";
    read_html+="<div id='print' class='btn btn-primary pull-right m-b-15px print-button'>";
    read_html+="<span class='glyphicon glyphicon-print'></span> Print";
    read_html+="</div>";
    read_html+="</div>";

read_html+="</div>";

read_html+="<table class='table table-bordered table-hover' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Return Invoice ID</th>";
        read_html+="<th class='text-align-center'>Sale Invoice ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Account Name (Alias)</th>";
        read_html+="<th class='text-align-center'>Invoice Details</th>";
        read_html+="<th class='text-align-center readOnlyContent'>Action</th>";
    read_html+="</tr>";
     

$.each(data.saleReturn, function(key, val) {   // Change Needed HERE
    
    var d = new Date(val.date);
    var n = d.getFullYear();

    challanLimit = 0;
    read_html+="<tr>";
        read_html+="<td>" + val.id + "</td>"; 
        read_html+="<td>" + val.billCode + "/"+val.returnId+"/"+ n +"/"+(n+1) + "</td>";
        read_html+="<td>" + val.billCode + "/"+val.saleInvoiceId+"/"+ n +"/"+(n+1) + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.aliasName + "</td>";
        read_html+="<td>";

        read_html+="<table class='table table-bordered table-hover'>";
        read_html+="<tr>";
        read_html+="<td>Sr.No</td>";
        read_html+="<td>Item Name</td>";
        read_html+="<td>Rate</td>";
        read_html+="<td>Quantity</td>";
        read_html+="<td>Amount</td>";
        read_html+="</tr>";

        count = 1;
        $.each(val.invoiceDetail, function(key2, val2) {

            narration = val2.saleNarration == null ? "" : val2.saleNarration;
            read_html+="<tr>";
            read_html+="<td>"+count+"</td>";
            read_html+="<td>"+val2.itemName+"   "+narration+"</td>";
            read_html+="<td class='text-right'>"+parseFloat(val2.rate).toFixed(2)+"</td>";
            read_html+="<td class='text-center'>"+val2.quantity+"</td>";
            read_html+="<td class='text-right'>"+parseFloat(val2.amount).toFixed(2)+"</td>";
            read_html+="</tr>";
            
            totalQty += +val2.quantity;
            count++;
        });


        totalAmt += +val.totalAmount;

        read_html+="<tr>";
        read_html+="<td></td>";
        read_html+="<td></td>";
        read_html+="<td>Total</td>";
        read_html+="<td></td>";
        read_html+="<td class='text-right'>"+parseFloat(val.totalAmount).toFixed(2)+"</td>";
        read_html+="</tr>";
        read_html+="<tr class='text-info'><td colspan=5>Narration : "+val.narration+"</td></tr>";
        read_html+="</table>";
        read_html+="</td>";

        read_html+="<td align='center' class='readOnlyContent'>";   

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

read_html+="<h5 class='text-danger m-l-15px'>Total Quantity : <span id='totalQty'></span> &nbsp;&nbsp;&nbsp;Total Amount : <span id='totalAmt'></span></h5>";
read_html+="<HR>";

$("#page-content").html(read_html);
$("#totalQty").html(totalQty);
$("#totalAmt").html(parseFloat(totalAmt).toFixed(2));

changePageTitle("Sale Return Register");  // Change Needed HERE

$.getJSON(apiURL+"/account/read.php?type=DEBTORS", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.aliasName);
        dataList.append(opt);
    });
});

});
});
});
}); 
}

