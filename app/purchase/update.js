$(document).ready(function(){
	$(document).on('click', '.update-button', function(){
        var id = $(this).attr('data-id');
		update(id);
	});
});

function update(id) {


    var username = $.cookie('username');
    var item_options_html = "";
    var department_options_html = "";
    var account_options_html = "";
    var create_html="";
    var invoiceId = "";

$.getJSON("http://shingarplastic.com/api/purchase/read.php?type=purchase&id=" + id, function(mainData){ 

    invoiceId = id;

    $.getJSON("http://shingarplastic.com/api/item/read.php", function(data){ 
            
        item_options_html+="<select id='itemIdList' class='form-control' onchange=getRate()>";
        item_options_html+="<option value=''>Select Item</option>";
        $.each(data.item, function(key, val){
            item_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
        });
        item_options_html+="</select>";

        $.getJSON("http://shingarplastic.com/api/department/read.php?type=active", function(data){ 
                
            department_options_html+="<select id='departmentId' name='departmentId' class='form-control'  required readonly>";
            $.each(data.department, function(key, val){
                if(mainData.purchase[0].departmentId == val.Id) {
                    department_options_html+="<option value='" + val.Id + "' selected>" + val.name + "</option>";
                }
            });
            department_options_html+="</select>";
        
                $.getJSON("http://shingarplastic.com/api/account/read.php?type=CREDITORS", function(data){ 
                
                    account_options_html+="<select id='accountId' name='accountId' class='form-control' onchange=getBillLimit() required>";
                    account_options_html+="<option value=''></option>";
                    $.each(data.account, function(key, val){
                        if(mainData.purchase[0].accountId == val.id) {
                            account_options_html+="<option value='" + val.id + "' selected>" + val.aliasName + "</option>";
                        } else {
                            account_options_html+="<option value='" + val.id + "'>" + val.aliasName + "</option>";		
                        }
                    });
                    account_options_html+="</select>";
	
	create_html+="<form id='updateForm' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";

        create_html+="<tr>";   
            create_html+="<td  class='text-right'>Invoice No</td>";
            create_html+="<td  class='text-danger text-center'>"+invoiceId+" <input type='hidden' id='purchaseInvoiceId' value='"+mainData.purchase[0].invoiceId+"' name='purchaseInvoiceId' class='form-control' required />  <input type='hidden' name='invoiceId' value='"+invoiceId+"' class='form-control' required /><input type='hidden' name='username' value='"+username+"' required></td>";
            create_html+="<td  class='text-right'>Date</td>";
            create_html+="<td><input type='date' name='date' value='"+mainData.purchase[0].date+"' class='form-control' required /></td>";
            create_html+="<td  class='text-right'>Account Name</td>";
            create_html+="<td>"+account_options_html+"</td>";
            create_html+="<td  class='text-right'>Bill Limit</td>";
            create_html+="<td><input type='number' id='billLimit' min=1  value=100 name='billLimit' class='form-control' readOnly></td>";    
        create_html+="</tr>";
 
        create_html+="<tr>";        
            create_html+="<td  class='text-right'>Department</td>";
            create_html+="<td>"+department_options_html+"</td>";
            create_html+="<td class='text-right'>Ref No</td>";
            create_html+="<td><input type='text' name='refNo' value='"+mainData.purchase[0].refNo+"' class='form-control'></td>";
            create_html+="<td class='text-right'>Narration</td>";
            create_html+="<td colspan=3><input type='text' name='narration' value='"+mainData.purchase[0].narration+"' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr><td colspan=8 style = 'border:none'></td></tr><tr><td colspan=8 style = 'border:none'></td></tr><tr><td colspan=8 style = 'border:none'></td></tr><tr class='info'>";
        create_html+="<td colspan=3>Item Name : "+item_options_html+"</td>";
        create_html+="<td><BR><input type='text' id='itemsNarration' name='itemsNarration' class='form-control'></td>";
        create_html+="<td>Rate : <input type='number' min=0.001 step=0.001 id='itemRate' min=1 name='itemRate' class='form-control'></td>";
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
                    create_html+="</tr>";    
                    
                    items = 1;
                    $.each(mainData.purchase[0].invoiceDetail, function(key2, val2) {
                        var narration = val2.narration == null ? '' : val2.narration;
                        var markup = "<tr id='"+items+"'>";
                        
                        markup += "<td><input name='itemId' value='"+val2.itemId+"' class='form-control' type='hidden'><input name='itemName' value='"+val2.itemName+"' class='form-control' readOnly></td>";
                        markup += "<td><input name='itemNarration' value='"+narration+"' class='form-control'></td>";
                        markup += "<td><input type='number' name='quantity' step=1 min=1 value='"+val2.quantity+"' class='form-control listQuantity' onkeyup=getBillAmount() onchange=getBillAmount()></td>";
                        markup += "<td><input type='number' min='0.001' step='0.001' name='rate' value='"+val2.rate+"' class='form-control listRate' onkeyup=getBillAmount() onchange=getBillAmount()></td>";
                        markup += "<td><input name='amount' value='"+val2.amount+"' class='form-control amount listAmount' readOnly></td>";
                        markup += "<td><a onclick=deleteItem("+items+") class='btn btn-danger'>Remove</a></td>";
                        markup += "</tr>";
                        
                        create_html += markup;
                        items++;
                        
                    });


                create_html+="</table>";
            create_html+="</td>";
        create_html+="</tr>";


        create_html+="<tr>";
        create_html+="<td colspan=6></td>";
            create_html+="<td>Grand Total</td><td> <input id='grandTotal' name='grandTotal' value='"+mainData.purchase[0].grandTotal+"' class='form-control pull-right' value='0' readOnly></td>";
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
changePageTitle("Edit Purchase Entry"); // Change Needed HERE

});
});
});
}); 
}
	$(document).on('submit', '#updateForm', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/purchase/update.php",  // Change Needed HERE
		    type : "POST",
		    contentType : 'multipart/form-data',
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
