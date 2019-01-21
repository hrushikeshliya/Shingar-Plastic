$(document).ready(function(){
    show("","","","","");

    $(document).on('click', '.read-button', function(){
        show("","","","","");
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

    if(startDate != "") {
        params += "&startDate="+startDate;
    }

    if(endDate != "") {
        params += "&endDate="+endDate;
    }

    if(departmentId != "") {
        params += "&departmentId="+departmentId;
    }

    if(accountId != "") {
        params += "&accountId="+accountId;
    }

    if(itemId != "") {
        params += "&itemId="+itemId;
    }

$.getJSON("http://shingarplastic.com/api/sale/read.php?type=sale"+params, function(data){    // Change Needed HERE
  
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

    $.getJSON("http://shingarplastic.com/api/department/read.php", function(data2){    
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

    $.getJSON("http://shingarplastic.com/api/account/read.php?type=DEBTORS", function(data3){    
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
    subTotal = 0;
    read_html+="<tr>";
 
        read_html+="<td>"+ val.billCode + "/"+val.invoiceId+"/"+ n +"-"+(n+1)+"</td>";
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
                read_html+="<td class='text-right'>"+parseFloat(val2.amount).toFixed(3)+"</td>";
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
        read_html+="<td class='text-right'>"+parseFloat(subTotal).toFixed(3)+"</td>";
        read_html+="</tr>";
        read_html+="<tr>";
        read_html+="<td colspan=3 class='text-right'>Tax @ "+parseFloat(val.tax).toFixed(3)+" %</td>";
        read_html+="<td></td>";
        read_html+="<td class='text-right'>"+parseFloat(val.taxAmount).toFixed(3)+"</td>";
        read_html+="</tr>";
        read_html+="<tr>";
        read_html+="<td colspan=3 class='text-right'>Grand Total</td>";
        read_html+="<td></td>";
        read_html+="<td class='text-right'>"+parseFloat(val.grandTotal).toFixed(3)+"</td>";
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

        read_html+="<a class='btn btn-warning m-r-10px m-b-10px' href='http://shingarplastic.com/saleChallan.php?type=challan&id=" + val.id + "' target='_blank'>";
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
            read_html+="<a class='btn btn-success m-b-10px' href='http://shingarplastic.com/saleInvoice.php?type=invoice&id=" + val.id + "' target='_blank'>";
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
$("#totalAmt").html(parseFloat(totalAmt).toFixed(3));
$("#totalTax").html(parseFloat(totalTax).toFixed(3));

changePageTitle("Sale Register");  // Change Needed HERE

});
});
});
});


}

 
$(document).on('submit', '#update-form', function(){
	
    var form_data=JSON.stringify($(this).serializeObject());
    
    $.ajax({
        url: "http://shingarplastic.com/api/sale/update.php?type=DEBTORS",  // Change Needed HERE
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            alert('LR No Updated');
            show();
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
    return false;
});
