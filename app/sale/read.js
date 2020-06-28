$(document).ready(function(){
    show($.cookie("endDate"),$.cookie("endDate"),"","","");

    $(document).on('click', '.read-button', function(){
        show($.cookie("startDate"),$.cookie("endDate"),"","","");
    });
    
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
    var subTotal = 0;
    var totalAmt = 0;
    var totalTax = 0;
    var totalAmtSub = 0;

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

$.getJSON(apiURL+"/sale/read.php?type=sale"+params, function(data){    // Change Needed HERE
  
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

read_html+="<table class='table table-bordered table-condensed' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Invoice ID</th>";
        read_html+="<th class='text-align-center'>Date<BR>(YYYY-MM-DD)</th>";
        read_html+="<th class='text-align-center'>Account Name (Alias)</th>";
        read_html+="<th class='text-align-center'>Invoice Details</th>";
        read_html+="<th class='text-align-center'>Transport</th>";
        read_html+="<th class='text-align-center readOnlyContent'></th>";
    read_html+="</tr>";


$.each(data.sale, function(key, val) {   // Change Needed HERE
     
    var d = new Date(val.date);
    var n = d.getFullYear();
    
    var y1 = 0;
    var y2 = 0;
    var fy = "";

    var compare_dates = function(date1,date2){
        if (date1>date2) return false;
        else if (date1<date2) return true;
        else return true; 
    }

    if(compare_dates(d,new Date('2019-03-31'))){
        y1 = n 
        y2 = n+1
    } else {
        fy = "FY"
        console.log(d)
        console.log(d.getMonth())
        if(d.getMonth()<3){
            y1 = n-1
            y2 = n
        } else {
            y1 = n
            y2 = n+1
        }
    }

    subTotal = 0;
    read_html+="<tr>";
 
        read_html+="<td>"+ val.billCode + "/"+val.invoiceId+"/"+fy+ y1 +"-"+y2+"</td>";
        read_html+="<td>" + val.date + "</td>";

        if(val.accountId == val.billNameId) {
            read_html+="<td>" + val.aliasName + "</td>";
        } else {
            read_html+="<td>" + val.aliasName + "<HR>"+val.baAliasName+"</td>";
        }
        
        read_html+="<td>";

        read_html+="<table class='table table-bordered table-hover table-condensed'>";
        read_html+="<tr>";
        read_html+="<td>Sr.No</td>";
        read_html+="<td>Item Name</td>";
        read_html+="<td>Rate</td>";
        read_html+="<td>Quantity</td>";
        read_html+="<td>Amount</td>";
        read_html+="</tr>";

        count = 1;
        quantityTotal = 0;
        $.each(val.invoiceDetail, function(key2, val2) {

            if(itemId == "" || val2.itemId == itemId) {
                var narration = val2.narration == null ? '' : val2.narration;

                read_html+="<tr>";
                read_html+="<td>"+count+"</td>";
                read_html+="<td>"+val2.itemName+"&nbsp;&nbsp<small>"+narration+"</small></td>";
                read_html+="<td class='text-right'>"+parseFloat(val2.rate).toFixed(3)+"</td>";
                read_html+="<td class='text-center'>"+val2.quantity+"</td>";
                read_html+="<td class='text-right'>"+parseFloat(val2.amount).toFixed(2)+"</td>";
                read_html+="</tr>";
                
                quantityTotal += parseFloat(val2.quantity);
                subTotal += parseFloat(val2.amount);
                count++;
            }
        });

        totalQty += +quantityTotal;
        totalAmt += +subTotal;
        totalTax += +val.taxAmount

        read_html+="<tr>";
        read_html+="<td colspan=3 class='text-right'>Sub Total</td>";
        read_html+="<td class='text-center'>"+quantityTotal+"</td>";
        read_html+="<td class='text-right'>"+parseFloat(subTotal).toFixed(2)+"</td>";
        read_html+="</tr>";
        read_html+="<tr>";
        read_html+="<td colspan=3 class='text-right'>Tax @ "+parseFloat(val.tax).toFixed(2)+" %</td>";
        read_html+="<td></td>";
        read_html+="<td class='text-right'>"+parseFloat(val.taxAmount).toFixed(2)+"</td>";
        read_html+="</tr>";
        read_html+="<tr>";
        read_html+="<td colspan=3 class='text-right'>Grand Total</td>";
        read_html+="<td></td>";
        read_html+="<td class='text-right'>"+parseFloat(val.grandTotal).toFixed(2)+"</td>";
        read_html+="</tr>";

        read_html+="<tr class='text-info'><td colspan=5>Narration : "+val.narration+"</td></tr>";
        read_html+="<tr class='text-info'><td colspan=5>Department : "+val.departmentName+"</td></tr>";
        read_html+="</table>";
        read_html+="</td><td class='text-center'>";

        if(val.departmentName != "MUMBAI"){
            read_html+=val.transportName ;
            var lrNo = val.lrNo == null ? '' : val.lrNo;
            read_html+="<form id='update-form' action='#' method='post'>";
            read_html+="<input type='hidden' name='id' value='"+val.id+"' required>"
            read_html+="<input type='text' name='lrNo' value='"+lrNo+"' class='m-r-10px m-t-10px m-b-10px form-control readOnlyContent' required>"
            read_html+="<button type='submit' class='btn btn-info readOnlyContent'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span> Update LR No";
            read_html+="</button>";
            read_html+="</form>";
        

        }
        read_html+="</td>";
 
        read_html+="<td class='readOnlyContent'>";   

        read_html+="<a class='btn btn-warning m-r-10px m-b-10px' href='"+siteURL+"saleChallan.php?type=challan&id=" + val.id + "' target='_blank'>";
            read_html+="<span class='glyphicon glyphicon-envelope'></span>";
        read_html+="</a>";

        read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
            read_html+="<span class='glyphicon glyphicon-remove'></span>";
        read_html+="</button><BR>";

        if(val.hasReturn == '0') {
            read_html+="<button class='btn btn-info m-r-10px  m-b-10px update-button-2' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span>";
            read_html+="</button>";
        }

        if(val.departmentName != "MUMBAI"){
            read_html+="<a class='btn btn-success m-b-10px' href='"+siteURL+"saleInvoice.php?type=invoice&id=" + val.id + "' target='_blank'>";
                read_html+="<span class='glyphicon glyphicon-print'></span>";
            read_html+="</a>";
        }

        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";

read_html+="<h5 class='text-danger m-l-15px'>Total Quantity : <span id='totalQty'></span> &nbsp;&nbsp;&nbsp;Total Amount : <span id='totalAmt'></span> &nbsp;&nbsp;&nbsp;Total Tax : <span id='totalTax'></span></h5>";
read_html+="<HR>";

$("#page-content").html(read_html);
$("#totalQty").html(totalQty);
$("#totalAmt").html(parseFloat(totalAmt).toFixed(2));
$("#totalTax").html(parseFloat(totalTax).toFixed(2));

changePageTitle("Sale Register");  // Change Needed HERE

});
});
});
});


}

 
$(document).on('submit', '#update-form', function(){
	
    var form_data=JSON.stringify($(this).serializeObject());
    
    $.ajax({
        url: apiURL+"/sale/update.php?type=DEBTORS",  // Change Needed HERE
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            alert('LR No Updated');
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
    return false;
});
