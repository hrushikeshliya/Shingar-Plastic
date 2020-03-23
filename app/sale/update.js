$(document).ready(function(){
 
    $(document).on('click', '.update-button-2', function(){
        
        var id = $(this).attr('data-id');
        
		var username = $.cookie('username');
		var item_options_html = "";
		var department_options_html = "";
		var account_options_html = "";
		var billName_options_html = "";
		var transport_options_html = "";
		var tax_options_html = "";
		var create_html="";
		var invoiceId = "";
	
	$.getJSON(apiURL+"/sale/read.php?type=sale&id=" + id, function(mainData){ 
	
		invoiceId = id;
	
		$.getJSON(apiURL+"/item/read.php", function(data){ 
				
			item_options_html+="<select id='itemIdList' class='form-control' onchange=getRate()>";
			item_options_html+="<option value=''>Select Item</option>";
			$.each(data.item, function(key, val){
				item_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
			});
			item_options_html+="</select>";
	
			$.getJSON(apiURL+"/department/read.php?type=active", function(data){ 
				
			
				department_options_html+="<select id='departmentId' name='departmentId' class='form-control' required readonly>";
				$.each(data.department, function(key, val){
					if(mainData.sale[0].departmentId == val.Id) {
						department_options_html+="<option value='" + val.Id + "' selected>" + val.name + "</option>";
					}
				});
				department_options_html+="</select>";
			
				$.getJSON(apiURL+"/transport/read.php", function(data){ 
					
					transport_options_html+="<select name='transportId' id='transportId' class='form-control'>";
					$.each(data.transport, function(key, val){
						if(mainData.sale[0].transportId == val.id) {
							transport_options_html+="<option value='" + val.id + "' selected>" + val.name + "</option>";
						} else {
							transport_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
						}

					});
					transport_options_html+="</select>";
	
					$.getJSON(apiURL+"/account/read.php?type=DEBTORS", function(data){ 
					
						billName_options_html+="<select id='billNameId' name='billNameId' class='form-control' required>";
						billName_options_html+="<option value=''></option>";
						$.each(data.account, function(key, val){
							if(mainData.sale[0].billNameId == val.id) {
								billName_options_html+="<option value='" + val.id + "' selected>" + val.aliasName + "</option>";
							} else {
								billName_options_html+="<option value='" + val.id + "'>" + val.aliasName + "</option>";
							}

						});
						billName_options_html+="</select>";
	
						$.getJSON(apiURL+"/account/read.php?type=DEBTORS", function(data){ 
					
							account_options_html+="<select id='accountId' name='accountId' class='form-control' onchange=getBillLimit() required>";
							account_options_html+="<option value=''></option>";
							$.each(data.account, function(key, val){

								if(mainData.sale[0].accountId == val.id) {
									account_options_html+="<option value='" + val.id + "' selected>" + val.aliasName + "</option>";
								} else {
									account_options_html+="<option value='" + val.id + "'>" + val.aliasName + "</option>";		
								}

							});
							account_options_html+="</select>";
	
						tax_options_html+="<select onchange=getBillAmount() id='tax' name='tax' class='form-control'>";
						if(mainData.sale[0].tax == 0) {
							tax_options_html+="<option value='0' selected>Tax Free</option>";
						} else {
							tax_options_html+="<option value='0'>Tax Free</option>";
						}
						if(mainData.sale[0].tax == 3) {
							tax_options_html+="<option value='3' selected>GST (3 %)</option>";
						} else {
							tax_options_html+="<option value='3'>GST (3 %)</option>";
						}
						if(mainData.sale[0].tax == 5) {
							tax_options_html+="<option value='5' selected>GST (5 %)</option>";
						} else {
							tax_options_html+="<option value='5'>GST (5 %)</option>";
						}
						if(mainData.sale[0].tax == 18) {
							tax_options_html+="<option value='18' selected>GST (18 %)</option>";
						} else {
							tax_options_html+="<option value='18'>GST (18 %)</option>";
						}

						tax_options_html+="</select>";
		
		create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		create_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		create_html+="</div>";

		create_html+="<form id='update-form-2' action='#' method='post' border='0'>";
		
		create_html+="<table class='table table-responsive table-bordered' cellpadding=0>";
	
		var d = new Date(mainData.sale[0].date);
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

		create_html+="<tr>";
			create_html+="<td  class='text-right'>Invoice No</td>";
			create_html+="<td  class='text-danger text-center'>"+mainData.sale[0].billCode+"/"+mainData.sale[0].invoiceId+"/"+fy+y1+"-"+y2+" <input type='hidden' id='salesInvoiceId' name='salesInvoiceId' value='"+mainData.sale[0].invoiceId+"' class='form-control' required /> <input type='hidden' name='invoiceId' value='"+invoiceId+"' class='form-control' required /><input type='hidden' name='username' value='"+username+"' required></td>";
			create_html+="<td  class='text-right'>Date</td>";
			create_html+="<td><input type='date' id = 'date' name='date' value='"+mainData.sale[0].date+"' class='form-control' required /></td>";
			create_html+="<td  class='text-right'>Account Name</td>";
			create_html+="<td>"+account_options_html+"</td>";
			create_html+="<td  class='text-right'>Bill Limit</td>";
			create_html+="<td><input type='number' id='billLimit' min=1  value='"+mainData.sale[0].billLimit+"' name='billLimit' class='form-control' onkeyup=getBillAmount() onchange=getBillAmount() ></td>";
		create_html+="</tr>";
	
			create_html+="<tr>";   
				create_html+="<td  class='text-right'>Department</td>";
				create_html+="<td>"+department_options_html+"</td>";
				create_html+="<td  class='text-right'>Transport</td>";
				create_html+="<td>"+transport_options_html+"</td>";
				create_html+="<td class='text-right'>Tax</td>";
				create_html+="<td>"+tax_options_html+"</td>";
				create_html+="<td class='text-right'> Bill Name </td>";
				create_html+="<td>"+billName_options_html+"</td>";
			
			create_html+="</tr>";
	
			create_html+="<tr>";
				create_html+="<td>Narration</td>";
				create_html+="<td colspan=5><input type='text' value='"+mainData.sale[0].narration+"' name='narration' class='form-control'/></td>";
				create_html+="<td colspan=2 class='text-center'>";
				if(mainData.sale[0].showName == "1") {
					create_html+="<input type='checkbox' name='showName' checked/> ";
				} else {
					create_html+="<input type='checkbox' name='showName'/> ";
				}
				create_html+="Show Item Name In Bill</td>";
			create_html+="</tr>";
	
			create_html+="<tr><td colspan=8 style = 'border:none'></td></tr><tr><td colspan=8 style = 'border:none'></td></tr><tr><td colspan=8 style = 'border:none'></td></tr><tr class='info'>";
			create_html+="<td colspan=3>Item Name : "+item_options_html+"</td>";
			create_html+="<td><BR><input type='text' id='itemsNarration' name='itemsNarration' class='form-control'></td>";
			create_html+="<td>Rate : <input type='number' id='itemRate' min=0.001 step=0.001 name='itemRate' class='form-control'></td>";
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
						
						items = 1;
						$.each(mainData.sale[0].invoiceDetail, function(key2, val2) {
							var narration = val2.narration == null ? '' : val2.narration;
							var taxable = val2.hsnSac == "7117" || val2.hsnSac == "3923" ? '*':'';
                            var markup = "<tr id='"+items+"'>";
                            
                            markup += "<td><input name='itemId' value='"+val2.itemId+"' class='form-control' type='hidden'><input name='itemName' value='"+val2.itemName+"' class='form-control' readOnly></td>";
                            markup += "<td><input name='itemNarration' value='"+narration+"' class='form-control'></td>";
                            markup += "<td><input type='number' name='quantity' min=1 value='"+val2.quantity+"' class='form-control listQuantity' onkeyup=getBillAmount() onchange=getBillAmount()></td>";
                            markup += "<td><input type='number' name='rate'  min=0.001 step=0.001 value='"+val2.rate+"' class='form-control listRate' onkeyup=getBillAmount() onchange=getBillAmount()></td>";
                            markup += "<td><input name='amount' value='"+val2.amount+"' class='form-control amount listAmount' readOnly></td>";
                            markup += "<td class='text-danger'><input type='hidden' class='listTaxable' value='"+taxable+"'>"+taxable+"</td>";
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
				create_html+="<td>Sub Total</td><td> <input id='subTotal' value='"+mainData.sale[0].subTotal+"' name='subTotal' class='form-control pull-right' value='0' readOnly></td>";
			create_html+="</tr>";
			create_html+="<tr>";
			
			create_html+="<tr>";
			create_html+="<td colspan=4></td>";
				create_html+="<td>Taxable Amount</td><td> <input id='taxableAmount' value='"+mainData.sale[0].taxableAmount+"' name='taxableAmount' class='form-control pull-right' value='0' readOnly></td>";
				create_html+="<td>Total Tax</td><td> <input id='taxAmount' name='taxAmount' value='"+mainData.sale[0].taxAmount+"' class='form-control pull-right' value='0' readOnly></td>";
			create_html+="</tr>";
	
			create_html+="<tr>";
			create_html+="<td colspan=6></td>";
				create_html+="<td>Grand Total</td><td> <input id='grandTotal' value='"+mainData.sale[0].grandTotal+"' name='grandTotal' class='form-control pull-right' value='0' readOnly></td>";
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
	changePageTitle("Edit Sale Entry"); // Change Needed HERE
	
	});
	}); 
	});
	});
	});
	});
	     	     
	});
     
	$(document).on('submit', '#update-form-2', function(){
	
		var form_data=JSON.stringify($(this).serializeObject());
		
		$.ajax({
		    url: apiURL+"/sale/updateSale.php",  // Change Needed HERE
		    type : "POST",
		    contentType : 'multipart/form-data',
		    data : form_data,
		    success : function(result) {
				show("","","","","");
		    },
		    error: function(xhr, resp, text) {
		        console.log(xhr, resp, text);
		    }
		});
	    return false;
	});
});