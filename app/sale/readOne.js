$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var billType = $(this).attr('data-id').split("|")[1];
	var id = $(this).attr('data-id').split("|")[0];
	console.log(billType);
	$.getJSON("http://shingarplastic.com/api/sale/read.php?id=" + id, function(data){   // Change Needed HERE


		var read_one_html = "";
		var cartoons = 0;
		var deductions = 0;
		var billLimit = billType=="invoice"? (0+data.sale[0].billLimit)/100 : (0+data.sale[0].challanLimit)/100;

		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		
		read_one_html+="<table id='invoice' class='table table-bordered'>";
		
		read_one_html+="<col width='5%'>";
		read_one_html+="<col width='40%'>";
		read_one_html+="<col width='15%'>";
		read_one_html+="<col width='15%'>";
		read_one_html+="<col width='15%'>";
		read_one_html+="<col width='15%'>";

		if(billType == "challan") {
			read_one_html+="<tr><td colspan=6><h2 class='text-danger text-center'>S.P.</h2>";
			taxAmount = parseFloat(((0+data.sale[0].billLimit)/100 * data.sale[0].taxAmount/10)).toFixed(2);
		} else {
			taxAmount = parseFloat((0+data.sale[0].billLimit)/100 * data.sale[0].taxAmount).toFixed(2);
			read_one_html+="<tr><td colspan=6><h4 class='text-danger text-center'>TAX INVOICE</h4>";
			read_one_html+="<h2 class='text-danger text-center'>"+data.sale[0].billName+"</h2>";
			read_one_html+="<h5 class='text-center'>"+data.sale[0].billAddress+"</h5>";
			read_one_html+="<h5 class='text-danger text-center'>"+data.sale[0].contactDetails+"</h5>";
			read_one_html+="<h5 class='text-danger text-center'>"+data.sale[0].others+"</h5>";
		}

		read_one_html+="</td></tr>";

		var d = new Date(data.sale[0].date);
		var n = d.getFullYear();

		read_one_html+="<tr>";
			read_one_html+="<td rowspan=3 colspan=3>"+data.sale[0].accountName+"<BR>"+data.sale[0].address1+"<BR>"+data.sale[0].address2+"<BR>City : "+data.sale[0].city+" - "+data.sale[0].pincode+"<BR>State: "+data.sale[0].state+"<BR><BR> GST : "+data.sale[0].gstNo+"</td>";
			read_one_html+="<td>Invoice No</td>";
			read_one_html+="<td colspan=2>"+data.sale[0].billCode+"/"+data.sale[0].invoiceId+"/"+n+"/"+(n+1)+"</td>";
		read_one_html+="</tr>";
		
		read_one_html+="<tr>";
			read_one_html+="<td>Date</td>";
			read_one_html+="<td colspan=2>"+data.sale[0].date+"</td>";
		read_one_html+="</tr>";
		
		read_one_html+="<tr>";
			read_one_html+="<td>Transport (LR)</td>";

			var lrNo = data.sale[0].lrNo != null ? ' ['+data.sale[0].lrNo+']' : '';
			read_one_html+="<td colspan=2>"+data.sale[0].transportName+lrNo+"</td>";
		read_one_html+="</tr>";

		    read_one_html+="<tr>";
				read_one_html+="<td class='text-center'>Sr.no</td>";
				read_one_html+="<td class='text-center'>Item Name</td>";
				read_one_html+="<td class='text-center'>HSN/SAC</td>";
				read_one_html+="<td class='text-center'>Quantity</td>";
				read_one_html+="<td class='text-center'>Rate</td>";
				read_one_html+="<td class='text-center'>Amount</td>";
		    read_one_html+="</tr>";


			srNo = 1;
			quantityTotal = 0;
			$.each(data.sale[0].invoiceDetail, function(key, val) {

				var rate = parseFloat(billLimit * val.rate).toFixed(2);
				var amount = parseFloat(billLimit * val.amount).toFixed(2);

				if((val.hsnSac == "3926" || val.hsnSac == "7117") && billType == "invoice") {
					read_one_html+="<tr>";
						read_one_html+="<td>"+srNo+"</td>";
						if(data.sale[0].showName == "0") {
							read_one_html+="<td>Bangles &nbsp;&nbsp<small>"+val.narration+"</small></td>";
						} else {
							read_one_html+="<td>"+val.itemName+"&nbsp;&nbsp<small>"+val.narration+"</small></td>";
						}
						read_one_html+="<td class='text-center'>"+val.hsnSac+"</td>";
						read_one_html+="<td class='text-center'>"+val.quantity+"</td>";
						read_one_html+="<td class='text-right'>"+rate+"</td>";
						read_one_html+="<td class='text-right'>"+amount+"</td>";
					read_one_html+="</tr>";
					srNo++;
					quantityTotal += parseFloat(val.quantity);
				} else if(billType == "challan") {
					read_one_html+="<tr>";
						read_one_html+="<td>"+srNo+"</td>";
						read_one_html+="<td>"+val.itemName+"&nbsp;&nbsp<small>"+val.narration+"</small></td>";
						read_one_html+="<td class='text-center'>"+val.hsnSac+"</td>";
						read_one_html+="<td class='text-center'>"+val.quantity+"</td>";
						read_one_html+="<td class='text-right'>"+rate+"</td>";
						read_one_html+="<td class='text-right'>"+amount+"</td>";
					read_one_html+="</tr>";
					srNo++;
					quantityTotal += parseFloat(val.quantity);
				} else {
					cartoons += val.itemName == 'CARTOON' ? val.quantity:0;
					deductions += amount;
				}
			});
			
			var subTotal = parseFloat((billLimit * data.sale[0].subTotal) - parseFloat(deductions)).toFixed(2);

			var preGrandTotal = parseFloat((billLimit * data.sale[0].subTotal) - parseFloat(deductions) + parseFloat(taxAmount)).toFixed(2);
			var roundedGrandTotal = Math.round((preGrandTotal)).toFixed(2);
			var roundOff = (parseFloat(roundedGrandTotal) - parseFloat(preGrandTotal)).toFixed(2); 
			
			var grandTotal = (parseFloat(subTotal)+parseFloat(roundOff)+parseFloat(taxAmount)).toFixed(2);

			if(billType == "invoice") {
				read_one_html+="<tr><td colspan = 6>";
				while(srNo < 14){
					read_one_html+="<br>";
					srNo++;
				}
				read_one_html+="</td></tr>";
			}

	
			if(billType == "challan" && data.sale[0].tax != 0) {

					read_one_html+="<tr>";
						read_one_html+="<td rowspan=2 colspan=4></td><td>Tax @ "+data.sale[0].tax+" %</td>";
						read_one_html+="<td class='text-right'>"+taxAmount+"</td>";
					read_one_html+="</tr>";

					read_one_html+="<tr>";
						read_one_html+="<td><i>Rounded Off</i></td>";
						read_one_html+="<td class='text-right'>"+roundOff+"</td>";
					read_one_html+="</tr>";


			} else if (billType == "invoice") {

				read_one_html+="<tr>";
				read_one_html+="<td rowspan=5></td>";
				read_one_html+="<td rowspan=5 class='text-danger text-center'>";
				
				if(billType == "invoice") {
					read_one_html += "CARTOON : "+ parseInt(cartoons);
					if(data.sale[0].departmentName != "METAL"){
						read_one_html+="<BR><BR> * GST FREE * <BR>Plastic Bangles";
						read_one_html+="<BR>GST Exempted Under Vide Schedule";
						read_one_html+="<BR>Chapter 3926 (Nil Rate) Date 01-07-2017";
					}
				}

				read_one_html+="</td><td rowspan=5></td>";
					read_one_html+="<td rowspan=5></td>";
					read_one_html+="<td>Sub Total</td>";
					read_one_html+="<td class='text-right'>"+subTotal+"</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td>CGST @</td>";
					read_one_html+="<td class='text-right'>0.00</td>";
				read_one_html+="</tr>";


				read_one_html+="<tr>";
					read_one_html+="<td>SGST @</td>";
					read_one_html+="<td class='text-right'>0.00</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td>IGST @ "+data.sale[0].tax+" %</td>";
					read_one_html+="<td class='text-right'>"+taxAmount+"</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td><i>Rounded Off</i></td>";
					read_one_html+="<td class='text-right'>"+roundOff+"</td>";
				read_one_html+="</tr>";

			}

			read_one_html+="<tr class='info'>";
				read_one_html+="<td  colspan=2><b>Amount (In Words) : <i>"+inWords(parseInt(grandTotal))+"</i></b></td>";
				read_one_html+="<td>Total</td>";
				read_one_html+="<td class='text-center'>"+quantityTotal+"</td>";
				read_one_html+="<td></td>";
				read_one_html+="<td class='text-right'>"+grandTotal+"</td>";
			read_one_html+="</tr>";
			
			if(billType == "challan") {

				read_one_html+="<tr>";
					read_one_html+="<td colspan=3></td>";
					read_one_html+="<td colspan=3>Prepared By : "+data.sale[0].username+"</td>";
				read_one_html+="</tr>";


				read_one_html+="<tr>";
					read_one_html+="<td colspan=3></td>";
					read_one_html+="<td colspan=3>Checked By : </td>";
				read_one_html+="</tr>";

			} else {

				read_one_html+="<tr>";
					read_one_html+="<td colspan=6 class='text-right'>For "+data.sale[0].billName+"<BR><BR><BR>Authorized Signatory</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td colspan=6>E.& O.E.</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td colspan=6 class='text-center'>"+data.sale[0].bankDetails+"</td>";
				read_one_html+="</tr>";

			}

		read_one_html+="</table>";
		
		read_one_html+="<div id='print' class='btn btn-primary center-block m-b-15px print-button'>";
			read_one_html+="<span class='glyphicon glyphicon-print'></span> Print";
		read_one_html+="</div>";

		$("#page-content").html(read_one_html);
		

		changePageTitle("Sale Invoice");  // Change Needed HERE
	});

    });
 
});