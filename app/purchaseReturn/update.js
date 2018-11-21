$(document).ready(function(){
	$(document).on('click', '.update-button', function(){
        var id = $(this).attr('data-id');
		update(id);
	});
});

function update(id) {

    var username = $.cookie('username');
    var item_options_html = "";
    var account_options_html = "";
    var create_html="";
    var invoiceId = "";

    $.getJSON("http://shingarplastic.com/api/purchaseReturn/read.php?type=purchaseReturn&id=" + id, function(mainData){ 

    invoiceId = mainData.purchaseReturn[0].invoiceId;
    item_options_html+="<select id='itemIdList' onchange = setQuantityLimit() class='form-control'>";
    item_options_html+="<option value=''></option>";
    item_options_html+="</select>";

    $.getJSON("http://shingarplastic.com/api/account/read.php", function(data){ 
                
        account_options_html+="<select id='accountId' name='accountId' class='form-control' readOnly>";
        $.each(data.account, function(key, val){
            if(mainData.purchaseReturn[0].accountId == val.id) {
                account_options_html+="<option value='" + val.id + "' selected>" + val.aliasName + "</option>";
            } 
        });
        account_options_html+="</select>";
    
    create_html+="<div class='row'>";
    create_html+="<a class='btn btn-success pull-right m-b-15px' href='./purchaseReturnRegister.php'>";
    create_html+="<span class='glyphicon glyphicon-th'></span> Go Back"; // Change Needed HERE
    create_html+="</a>";
    create_html+="</div>";

	create_html+="<form id='updateForm' action='#' method='post' border='0'>";
	
    create_html+="<table class='table table-hover table-responsive table-bordered'>";

    var d = new Date(mainData.purchaseReturn[0].date);
    var n = d.getFullYear();
    
        create_html+="<tr>";
            create_html+="<td>Purchase Invoice Id : <BR>Purchase Return Invoice Id : </td>";
            create_html+="<td  class='text-danger'>"+mainData.purchaseReturn[0].billCode + "/"+mainData.purchaseReturn[0].purchaseInvoiceId+"/"+ n +"/"+(n+1) +"<BR>"+ mainData.purchaseReturn[0].billCode + "/"+mainData.purchaseReturn[0].returnId+"/"+ n +"/"+(n+1) +" <input type='hidden' name='invoiceId' value='"+id+"' class='form-control' required /></td>";
            create_html+="<td>Date</td>";
            create_html+="<td><input type='date' value='"+mainData.purchaseReturn[0].date+"' name='date' class='form-control' required /></td>";    
            create_html+="<td>Account Name</td>";
            create_html+="<td>"+account_options_html+"</td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td>Narration</td>";
            create_html+="<td colspan=5><input type='text' value='"+mainData.purchaseReturn[0].narration+"' name='narration' class='form-control'/></td>";
        create_html+="</tr>";

        create_html+="<tr><td colspan=6></td></tr><tr><td colspan=6></td></tr><tr><td colspan=6></td></tr><tr class='info'>";
        create_html+="<td>Item Name</td>";
        create_html+="<td colspan=2>"+item_options_html+"</td>";
        create_html+="<td>Quantity</td>";
        create_html+="<td><input type='number' id='quantity' onkeyup=validateQuantity() min=1 class='form-control'/></td>";
        create_html+="<td align='center'><a onclick=addItem() class='btn btn-success'>Add Item</a></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=6>";
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
                    $.each(mainData.purchaseReturn[0].invoiceDetail, function(key2, val2) {
                        var narration = val2.narration == null ? '' : val2.narration;
                        var markup = "<tr id='"+items+"'>";
                        
                        markup += "<td><input name='itemId' value='"+val2.itemId+"' class='form-control' type='hidden'><input name='itemName' value='"+val2.itemName+"' class='form-control' readOnly></td>";
                        markup += "<td><input name='itemNarration' value='"+narration+"' class='form-control'></td>";
                        markup += "<td><input type='number' name='quantity' step=1 min=1 value='"+val2.quantity+"' class='form-control listQuantity' onkeyup=getBillAmount()></td>";
                        markup += "<td><input type='number' min='0.001' step='0.001' name='rate' value='"+val2.rate+"' class='form-control listRate' onkeyup=getBillAmount()></td>";
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
            create_html+="<td colspan=4><input type='hidden' name='username' value='"+username+"' required></td>";
            create_html+="<td>Total </td><td><input id='totalAmount' value='"+mainData.purchaseReturn[0].totalAmount+"' name='totalAmount' class='form-control pull-right' value='0' required readOnly></td>";
        create_html+="</tr>";

        create_html+="<tr>";
            create_html+="<td colspan=6>";
                create_html+="<button type='submit' class='btn btn-success pull-right'>";
                    create_html+="Submit";
                create_html+="</button>";
            create_html+="</td>";
        create_html+="</tr>";
 
    create_html+="</table>";
create_html+="</form>"; 

$("#page-content").html(create_html);

getInvoiceItems(invoiceId);
changePageTitle("Edit Purchase Return Entry"); // Change Needed HERE

});
});
}
	$(document).on('submit', '#updateForm', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: "http://shingarplastic.com/api/purchaseReturn/updatee.php",  // Change Needed HERE
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
