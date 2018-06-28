$(document).ready(function(){
    show(); 
});

function show(){
 
$.getJSON("http://shingarplastic.com/api/purchaseReturn/read.php", function(data){    // Change Needed HERE
 
 
read_html="";
 
read_html+="<a class='btn btn-success pull-right m-b-15px' href='./purchaseReturn.php'>";
read_html+="<span class='glyphicon glyphicon-th'></span> Purchase Return Entry"; // Change Needed HERE
read_html+="</a>";

read_html+="<table class='table table-bordered table-hover'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Invoice ID</th>";
        read_html+="<th class='text-align-center'>Purchase Invoice ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Account Name</th>";
        read_html+="<th class='text-align-center'>Invoice Details</th>";
        read_html+="<th class='text-align-center'>Billed Amount</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.purchaseReturn, function(key, val) {   // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.invoiceId + "</td>";
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
        read_html+="<td>"+val.totalAmount+"</td>";
        read_html+="</tr>";
        read_html+="<tr class='text-info'><td colspan=5>Narration : "+val.narration+"</td></tr>";
        read_html+="</table>";
        read_html+="</td>";
        read_html+="<td>" + val.totalAmount + "</td>";

        read_html+="<td align='center'>";   
            read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span>";
            read_html+="</button>";
        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";

$("#page-content").html(read_html);
changePageTitle("Purchase Return Register");  // Change Needed HERE
});
 
}

