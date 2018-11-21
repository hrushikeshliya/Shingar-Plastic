$(document).ready(function(){
    show(); 

    $(document).on('click', '.read-button', function(){
        show();
    });
    
});

function show(){
 
$.getJSON("http://shingarplastic.com/api/sale/read.php?type=sale", function(data){    // Change Needed HERE
 
 
read_html="";

read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";
read_html+="<input type='text' list='accountNameList' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search2()' placeholder='Search'>";
read_html+="<datalist id='accountNameList'>";
read_html+="</datalist>";read_html+="</div>";
read_html+="<a class='btn btn-success pull-right m-b-15px' href='./sale.php'>";
read_html+="<span class='glyphicon glyphicon-th'></span> Sale Entry"; // Change Needed HERE
read_html+="</a>";
read_html+="</div>";



read_html+="<table class='table table-bordered table-condensed' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Invoice ID</th>";
        read_html+="<th class='text-align-center'>Date<BR>(YYYY-MM-DD)</th>";
        read_html+="<th class='text-align-center'>Account Name (Alias)</th>";
        read_html+="<th class='text-align-center'>Invoice Details</th>";
        read_html+="<th class='text-align-center'>Transport</th>";
        read_html+="<th class='text-align-center'></th>";
    read_html+="</tr>";


$.each(data.sale, function(key, val) {   // Change Needed HERE
     
    var d = new Date(val.date);
    var n = d.getFullYear();

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
            var narration = val2.narration == null ? '' : val2.narration;

            read_html+="<tr>";
            read_html+="<td>"+count+"</td>";
            read_html+="<td>"+val2.itemName+"&nbsp;&nbsp<small>"+narration+"</small></td>";
            read_html+="<td class='text-right'>"+parseFloat(val2.rate).toFixed(3)+"</td>";
            read_html+="<td class='text-center'>"+val2.quantity+"</td>";
            read_html+="<td class='text-right'>"+parseFloat(val2.amount).toFixed(3)+"</td>";
            read_html+="</tr>";
            
            quantityTotal += parseFloat(val2.quantity);
            count++;
        });

        read_html+="<tr>";
        read_html+="<td colspan=3 class='text-right'>Sub Total</td>";
        read_html+="<td class='text-center'>"+quantityTotal+"</td>";
        read_html+="<td class='text-right'>"+parseFloat(val.subTotal).toFixed(3)+"</td>";
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
            read_html+="<input type='text' name='lrNo' value='"+lrNo+"' class='m-r-10px m-t-10px m-b-10px form-control' required>"
            read_html+="<button type='submit' class='btn btn-info'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span> Update LR No";
            read_html+="</button>";
            read_html+="</form>";
        

        }
        read_html+="</td>";
 
        read_html+="<td>";   

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

$("#page-content").html(read_html);
changePageTitle("Sale Register");  // Change Needed HERE

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
