$(document).ready(function(){
 
    var item_options_html = "";
    var department_options_html = "";
    var account_options_html = "";
    var transport_options_html = "";
    var tax_options_html = "";
    var create_html="";

    $.getJSON("http://shingarplastic.com/api/item/read.php", function(data){ 
            
        item_options_html+="<select id='itemId' name='itemId' class='form-control'>";
        $.each(data.item, function(key, val){
            item_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
        });
        item_options_html+="</select>";

        $.getJSON("http://shingarplastic.com/api/department/read.php", function(data){ 
                
            department_options_html+="<select name='departmentId' class='form-control'>";
            $.each(data.department, function(key, val){
                department_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
            });
            department_options_html+="</select>";
        
            $.getJSON("http://shingarplastic.com/api/transport/read.php", function(data){ 
                
                transport_options_html+="<select name='transportId' class='form-control'>";
                $.each(data.transport, function(key, val){
                    transport_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
                });
                transport_options_html+="</select>";

                $.getJSON("http://shingarplastic.com/api/account/read.php", function(data){ 
                
                    account_options_html+="<select name='accountId' class='form-control'>";
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
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";

    create_html+="<tr>";
        create_html+="<td>Invoice No</td>";
        create_html+="<td  class='text-danger text-center'>12345</td>";
        create_html+="<td>Bill No</td>";
        create_html+="<td><input type='number' name='billNo' class='form-control' required /></td>";
        create_html+="<td>Challan No</td>";
        create_html+="<td><input type='number' name='challanNo' class='form-control' required /></td>";
        create_html+="<td>Tax</td>";
        create_html+="<td>"+tax_options_html+"</td>";
    create_html+="</tr>";

        create_html+="<tr>";   
            create_html+="<td>Date</td>";
            create_html+="<td><input type='date' name='date' class='form-control' required /></td>";
            create_html+="<td>Discount (%)</td>";
            create_html+="<td><input type='number' id='discount' onchange=getBillAmount() name='discount' value='0' min='0' class='form-control' required /></td>";
            create_html+="<td>Department</td>";
            create_html+="<td>"+department_options_html+"</td>";
            create_html+="<td>Transport</td>";
            create_html+="<td>"+transport_options_html+"</td>";
        create_html+="</tr>";
 
        create_html+="<tr>";
            create_html+="<td>Account Name</td>";
            create_html+="<td>"+account_options_html+"</td>";
            create_html+="<td colspan=2><input type='checkbox' name='showDiscount'/> ";
            create_html+="Show Discount</td>";
            create_html+="<td colspan=2><input type='checkbox' name='showName'/> ";
            create_html+="Show Item Name In Bill</td>";
            create_html+="<td colspan=2><input type='checkbox' name='isFake'/> ";
            create_html+="FAKE</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Narration</td>";
            create_html+="<td colspan=7><input type='text' name='narration' class='form-control' required /></td>";
        create_html+="</tr>";

        create_html+="<tr><td colspan=8></td></tr><tr><td colspan=8></td></tr><tr><td colspan=8></td></tr><tr class='info'>";
        create_html+="<td>Item Name</td>";
        create_html+="<td colspan=4>"+item_options_html+"</td>";
        create_html+="<td>Quantity</td>";
        create_html+="<td><input type='number' id='quantity' min=1 class='form-control'/></td>";
        create_html+="<td align='center'><a onclick=addItem() class='btn btn-success'>Add Item</a></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=8>";
                create_html+="<table id='itemNameList' class='table table-hover table-responsive table-bordered'>";
                    create_html+="<tr>";
                    create_html+="<th align='center'>Item</th>";   
                    create_html+="<th align='center'>Quantity</th>";
                    create_html+="<th align='center'>Rate</th>";   
                    create_html+="<th align='center'>Amount</th>";
                    create_html+="<th></th>";                                
                    create_html+="</tr>";                    
                create_html+="</table>";
            create_html+="</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=6></td>";
            create_html+="<td>Total :</td><td> <input id='total' name='total' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";
        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Total Discount :</td><td> <input id='discountAmount' name='discountAmount' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Taxable Amount :</td><td> <input id='taxableAmount' name='taxableAmount' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Total Tax :</td><td> <input id='taxAmount' name='taxAmount' class='form-control pull-right' value='0' readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Total Amount :</td><td> <input id='totalAmount' name='totalAmount' class='form-control pull-right' value='0' readOnly></td>";
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
})

});
 
$(document).on('submit', '#createForm', function(){
var form_data=JSON.stringify($(this).serializeObject());

$.ajax({
    url: "http://shingarplastic.com/api/purchasee/create.php",   // Change Needed HERE
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
});