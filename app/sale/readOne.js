$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var billType = $(this).attr('data-id').split("|")[1];
	var id = $(this).attr('data-id').split("")[0];
	console.log(billType);
	$.getJSON("http://shingarplastic.com/api/sale/read.php?id=" + id, function(data){   // Change Needed HERE


		var read_one_html = "";
		var cartoons = 0;
		var company = "";
		var companyCode = "";
		var bankDetails = "";
		var deductions = 0;
		var billLimit = billType=="invoice"? (0+data.sale[0].billLimit)/100 : 1;

		var taxAmount = parseFloat(billLimit * data.sale[0].taxAmount).toFixed(2);
		
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
			company = "S.P.";
			companyCode = "SP";
			read_one_html+="<tr><td colspan=6><h2 class='text-danger text-center'>"+company+"</h2>";
		} else {
			read_one_html+="<tr><td colspan=6><h4 class='text-danger text-center'>TAX INVOICE</h4>";

		if(data.sale[0].departmentName == "METAL"){

			company = "JAY ENTERPRISE";
			companyCode = "JE";
			bankDetails = "JAY ENTERPRISE, BANK OF BARODA, A/C: 04020400000330,IFSC: BARB0MALADX";

			read_one_html+="<h2 class='text-danger text-center'>"+company+"</h2>";
			read_one_html+="<h5 class='text-center'>Room no. 155, 3rd Floor, Swami Narayan Building</h5>";
			read_one_html+="<h5 class='text-center'>3rd Bhoiwada, Bhuleshwara, Mumbai - 400002, INDIA</h5>";
			read_one_html+="<h5 class='text-danger text-center'>Phone: 022-22423707, 022-67473707 Email: j_marthak1476@yahoo.co.in</h5>";
			read_one_html+="<h5 class='text-danger text-center'>GSTIN: 27ARRPM7133N1Z0</h5>";
		} else {

			company = "SHINGAR PLASTIC";
			companyCode = "SP";
			bankDetails = "SHINGAR PLASTIC, BANK OF BARODA, A/C: 04020200001334,IFSC: BARB0MALADX";

			read_one_html+="<h2 class='text-danger text-center'>"+company+"</h2>";
			read_one_html+="<h5 class='text-center'>155/3, 24 - SWAMYNARAYAN BUILDING, 3RD BHOIWADA, BHULESHWAR, MUMBAI 400002,INDIA.</h5>";
			read_one_html+="<h5 class='text-danger text-center'>Phone: 022-22423707, 022-67473707 Email: j_marthak1476@yahoo.co.in</h5>";
		
		}
	}

		read_one_html+="</td></tr>";

		var d = new Date(data.sale[0].date);
		var n = d.getFullYear();

		read_one_html+="<tr>";
			read_one_html+="<td rowspan=3 colspan=3>"+data.sale[0].accountName+"<BR>"+data.sale[0].address1+"<BR>"+data.sale[0].address2+"<BR>City : "+data.sale[0].city+" - "+data.sale[0].pincode+"<BR>State: "+data.sale[0].state+"<BR><BR> GST : "+data.sale[0].gstNo+"</td>";
			read_one_html+="<td>Invoice No</td>";
			read_one_html+="<td colspan=2>"+companyCode+"/"+data.sale[0].invoiceId+"/"+n+"/"+(n+1)+"</td>";
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
			$.each(data.sale[0].invoiceDetail, function(key, val) {

				var rate = parseFloat(billLimit * val.rate).toFixed(2);
				var amount = parseFloat(billLimit *val.amount).toFixed(2);

				if((val.hsnSac == "3926" || val.hsnSac == "7117") && billType == "invoice") {
					read_one_html+="<tr>";
						read_one_html+="<td>"+srNo+"</td>";
						read_one_html+="<td>"+val.itemName+"&nbsp;&nbsp<small>"+val.narration+"</small></td>";
						read_one_html+="<td class='text-center'>"+val.hsnSac+"</td>";
						read_one_html+="<td class='text-center'>"+val.quantity+"</td>";
						read_one_html+="<td class='text-right'>"+rate+"</td>";
						read_one_html+="<td class='text-right'>"+amount+"</td>";
					read_one_html+="</tr>";
					srNo++;
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
				} else {
					cartoons += val.itemName == 'CARTOON' ? val.quantity:0;
					deductions += amount;
				}
			});
			
			var subTotal = (parseFloat(billLimit * data.sale[0].subTotal) - parseFloat(deductions)).toFixed(2);

			var preGrandTotal = (parseFloat(billLimit * data.sale[0].subTotal) - parseFloat(deductions) + parseFloat(taxAmount)).toFixed(2);
			var roundedGrandTotal = Math.round(preGrandTotal).toFixed(2);
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
				read_one_html+="<td  colspan=4><b>Amount (In Words) : <i>"+inWords(parseInt(grandTotal))+"</i></b></td>";
				read_one_html+="<td>Total</td>";
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
					read_one_html+="<td colspan=6 class='text-right'>For "+company+"<BR><BR><BR>Authorized Signatory</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td colspan=6>E.& O.E.</td>";
				read_one_html+="</tr>";

				read_one_html+="<tr>";
					read_one_html+="<td colspan=6 class='text-center'>"+bankDetails+"</td>";
				read_one_html+="</tr>";

			}

		read_one_html+="</table>";
		
		read_one_html+="<div id='print' class='btn btn-primary center-block m-b-15px print-button'>";
			read_one_html+="<span class='glyphicon glyphicon-print'></span> Download";
		read_one_html+="</div>";

		$("#page-content").html(read_one_html);
		

		changePageTitle("Sale Invoice");  // Change Needed HERE
	});

    });
 
});