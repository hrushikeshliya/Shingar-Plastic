$(document).ready(function(){
    create();
});

function create() {

    var username = $.cookie('username');
    var item_options_html = "";
    var department_options_html = "";
    var account_options_html = "";
    var transport_options_html = "";
    var tax_options_html = "";
    var create_html="";
    var invoiceId = "";

$.getJSON("http://shingarplastic.com/api/singleValues/read.php?type=sale", function(data){ 

    invoiceId = data.singleValues[0].id;

    $.getJSON("http://shingarplastic.com/api/item/read.php", function(data){ 
            
        item_options_html+="<select id='itemIdList' class='form-control' onchange=getRate()>";
        item_options_html+="<option value=''>Select Item</option>";
        $.each(data.item, function(key, val){
            item_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
        });
        item_options_html+="</select>";

        $.getJSON("http://shingarplastic.com/api/department/read.php?type=active", function(data){ 
                
            department_options_html+="<select id='departmentId' name='departmentId' class='form-control' onchange=getInvoiceId() required>";
            department_options_html+="<option value=''></option>";
            $.each(data.department, function(key, val){
                department_options_html+="<option value='" + val.Id + "'>" + val.name + "</option>";
            });
            department_options_html+="</select>";
        
            $.getJSON("http://shingarplastic.com/api/transport/read.php", function(data){ 
                
                transport_options_html+="<select name='transportId' class='form-control'>";
                $.each(data.transport, function(key, val){
                    transport_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
                });
                transport_options_html+="</select>";

                $.getJSON("http://shingarplastic.com/api/account/read.php", function(data){ 
                
                    account_options_html+="<select id='accountId' name='accountId' class='form-control' onchange=getBillLimit() required>";
                    account_options_html+="<option value=''></option>";
                    $.each(data.account, function(key, val){
                        account_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
                    });
                    account_options_html+="</select>";

                    tax_options_html+="<select onchange=getBillAmount() id='tax' name='tax' class='form-control'>";
                    tax_options_html+="<option value='0'>Tax Free</option>";
                    tax_options_html+="<option value='3'>GST (3 %)</option>";
                    tax_options_html+="<option value='5'>GST (5 %)</option>";
                    tax_options_html+="</select>";; 
	
	create_html+="<form id='createForm' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-responsive table-bordered'>";

    create_html+="<tr>";
        create_html+="<td  class='text-right'>Invoice No</td>";
        create_html+="<td  class='text-danger text-center'>"+invoiceId+ " <input type='hidden' id='salesInvoiceId' name='salesInvoiceId' class='form-control' required /> <input type='hidden' name='invoiceId' value='"+invoiceId+"' class='form-control' required /><input type='hidden' name='username' value='"+username+"' required></td>";
        create_html+="<td  class='text-right'>Date</td>";
        create_html+="<td><input type='date' id = 'date' name='date' class='form-control' required /></td>";
        create_html+="<td  class='text-right'>Account Name</td>";
        create_html+="<td>"+account_options_html+"</td>";
        create_html+="<td  class='text-right'>Bill Limit</td>";
        create_html+="<td><input type='number' id='billLimit' min=1  value=25 name='billLimit' class='form-control'></td>";
    create_html+="</tr>";

        create_html+="<tr>";   
            create_html+="<td  class='text-right'>Department</td>";
            create_html+="<td>"+department_options_html+"</td>";
            create_html+="<td  class='text-right'>Transport</td>";
            create_html+="<td>"+transport_options_html+"</td>";
            create_html+="<td class='text-right'>Tax</td>";
            create_html+="<td>"+tax_options_html+"</td>";
            create_html+="<td colspan=2 class='text-center'><input type='checkbox' name='showName'/> ";
            create_html+="Show Item Name In Bill</td>";
        
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Narration</td>";
            create_html+="<td colspan=7><input type='text' name='narration' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr><td colspan=8 style = 'border:none'></td></tr><tr><td colspan=8 style = 'border:none'></td></tr><tr><td colspan=8 style = 'border:none'></td></tr><tr class='info'>";
        create_html+="<td colspan=3>Item Name : "+item_options_html+"</td>";
        create_html+="<td><BR><input type='text' id='itemsNarration' name='itemsNarration' class='form-control'></td>";
        create_html+="<td>Rate : <input type='number' id='itemRate' min=1 name='itemRate' class='form-control'></td>";
        create_html+="<td colspan=2>Quantity : <input type='number' id='quantity' min=1 class='form-control'/></td>";
        create_html+="<td align='center'><BR><a onclick=addItem() class='btn btn-success'>Add Item</a></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=8>";
                create_html+="<table id='itemNameList' class='table table-hover table-responsive table-bordered'>";
                    create_html+="<tr>";
                    create_html+="<th align='center'>Item</th>"; 
                    create_html+="<th align='center'>Narration</th>";   
                    create_html+="<th align='center'>Quantity</th>";
                    create_html+="<th align='center'>Rate</th>";   
                    create_html+="<th align='center'>Amount</th>";
                    create_html+="<th></th>";                          
                    create_html+="<th></th>";                                
                    create_html+="</tr>";                    
                create_html+="</table>";
            create_html+="</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=6></td>";
            create_html+="<td>Sub Total</td><td> <input id='subTotal' name='subTotal' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";
        create_html+="<tr>";
        
        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Taxable Amount</td><td> <input id='taxableAmount' name='taxableAmount' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Total Tax</td><td> <input id='taxAmount' name='taxAmount' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Grand Total</td><td> <input id='grandTotal' name='grandTotal' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=8>";
                create_html+="<button type='submit' class='btn btn-success pull-right'>";
                    create_html+="Submit";
                create_html+="</button>";
            create_html+="</td>";
        create_html+="</tr>";
 
    create_html+="</table>";
create_html+="</form>"; 

$("#page-content").html(create_html);
changePageTitle("Create Sale Entry"); // Change Needed HERE

});
}); 
});
});
});

} 

$(document).on('submit', '#createForm', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: "http://shingarplastic.com/api/sale/create.php",   // Change Needed HERE
    type : "POST",
    contentType : 'application/json',
    data : form_data,
    success : function(result) {
        create();
    },
    error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
    }
});
 
return false;

});
