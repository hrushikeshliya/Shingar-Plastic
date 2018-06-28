$(document).ready(function(){
    show(); 
});

function show(){
 
$.getJSON("http://shingarplastic.com/api/sale/read.php", function(data){    // Change Needed HERE
 
 
read_html="";
 
read_html+="<a class='btn btn-success pull-right m-b-15px' href='./sale.php'>";
read_html+="<span class='glyphicon glyphicon-th'></span> Sale Entry"; // Change Needed HERE
read_html+="</a>";

read_html+="<table class='table table-bordered table-hover'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Invoice ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Account Name</th>";
        read_html+="<th class='text-align-center'>Invoice Details</th>";
        read_html+="<th class='text-align-center'>Billed Amount</th>";
        read_html+="<th class='text-align-center'>Transport</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.sale, function(key, val) {   // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.id + "</td>";
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
        read_html+="<td>"+val.total+"</td>";
        read_html+="</tr>";
        read_html+="<tr class='text-info'><td colspan=5>Narration : "+val.narration+"</td></tr>";
        read_html+="</table>";
        read_html+="</td>";
        read_html+="<td>" + val.totalAmount + "</td>";
        read_html+="<td class='text-center'>";

        if(val.lrNo == null){
            read_html+="<form id='update-form' action='#' method='post'>";
            read_html+="<input type='hidden' name='id' value='"+val.id+"' required>"
            read_html+="<input type='text' name='lrNo' class='m-r-10px' required>"
            read_html+="<button type='submit' class='btn btn-info'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span>";
            read_html+="</button>";
            read_html+="</form>";
        } else {
            read_html+="["+val.lrNo+"]<BR>";
        }

        read_html+=val.transportName + "</td>";

        read_html+="<td align='center'>";   
            read_html+="<button class='btn btn-info m-r-10px m-b-10px  print-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-print'></span>";
            read_html+="</button>";
            read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span>";
            read_html+="</button>";
        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";

$("#page-content").html(read_html);
changePageTitle("Sale Register");  // Change Needed HERE
});
 
}

 
$(document).on('submit', '#update-form', function(){
	
    var form_data=JSON.stringify($(this).serializeObject());
    
    $.ajax({
        url: "http://shingarplastic.com/api/sale/update.php",  // Change Needed HERE
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            show();
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
    return false;
});
