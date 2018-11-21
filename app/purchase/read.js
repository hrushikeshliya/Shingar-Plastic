$(document).ready(function(){
    show(); 
    $(document).on('click', '.read-button', function(){
    show();
});

});

function show(){
 
$.getJSON("http://shingarplastic.com/api/purchase/read.php?type=purchase", function(data){    // Change Needed HERE
 
 
read_html="";

read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";
read_html+="<input type='text' list='accountNameList' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search()' placeholder='Search'>";
read_html+="<datalist id='accountNameList'>";
read_html+="</datalist>";read_html+="</div>";
read_html+="<a class='btn btn-success pull-right m-b-15px' href='./purchase.php'>";
read_html+="<span class='glyphicon glyphicon-th'></span> Purchase Entry"; // Change Needed HERE
read_html+="</a>";
read_html+="</div>";


read_html+="<table class='table table-bordered table-hover' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Invoice ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Account Name</th>";
        read_html+="<th class='text-align-center'>Invoice Details</th>";
        read_html+="<th class='text-align-center'>Ref No</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.purchase, function(key, val) {   // Change Needed HERE
 	     
    var d = new Date(val.date);
    var n = d.getFullYear();

    read_html+="<tr>";
 
        read_html+="<td>"+ val.billCode + "/"+val.invoiceId+"/"+ n +"/"+(n+1)+"</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.accountName + "</td>";
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

            read_html+="<tr>";
            read_html+="<td>"+count+"</td>";
            read_html+="<td>"+val2.itemName+"</td>";
            read_html+="<td>"+val2.rate+"</td>";
            read_html+="<td>"+val2.quantity+"</td>";
            read_html+="<td>"+val2.amount+"</td>";
            read_html+="</tr>";
            
            count++;
        });

        read_html+="<tr>";
        read_html+="<td></td>";
        read_html+="<td></td>";
        read_html+="<td>Total</td>";
        read_html+="<td></td>";
        read_html+="<td>"+val.grandTotal+"</td>";
        read_html+="</tr>";
        read_html+="<tr class='text-info'><td colspan=5>Narration : "+val.narration+"</td></tr>";
        read_html+="<tr class='text-info'><td colspan=5>Department : "+val.departmentName+"</td></tr>";
        read_html+="</table>";
        read_html+="</td>";
        read_html+="<td>" + val.refNo + "</td>";

        read_html+="<td>";

        if(val.hasReturn == '0') {
            read_html+="<button class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span>";
            read_html+="</button>";
        }

            read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span>";
            read_html+="</button>";
        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";

$("#page-content").html(read_html);
changePageTitle("Purchase Register");  // Change Needed HERE

$.getJSON("http://shingarplastic.com/api/account/read.php?type=CREDITORS", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.aliasName);
        dataList.append(opt);
    });
});
});
 
}