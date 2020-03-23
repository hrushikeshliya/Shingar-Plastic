$(document).ready(function(){
	genearateInvoice("");
});

function genearateInvoice(passedHsn) {

	var billType = $_GET('type');
	var id = $_GET('id');

	$.getJSON(apiURL+"/sale/read.php?type=sale&id=" + id, function(data){   // Change Needed HERE

		var read_one_html = "";
		var billTO = "";
		var decimal = 0;

		decimal = 2;
		billTO = "<b>Consignor :</b><br><b>"+data.sale[0].baAccountName+"</b><BR>"+data.sale[0].baAddress1+"<BR>"+data.sale[0].baAddress2+"<BR>City : "+data.sale[0].baCity+" - "+data.sale[0].baPincode+"<BR>State: "+data.sale[0].baState+"<BR><BR> GST : "+data.sale[0].baGstNo;

		var cartoons = 0;
		var deductions = 0;
		var billLimit = billType=="invoice"? (0+data.sale[0].billLimit)/10 : 1;
	
		read_one_html+="<table id='invoice' class='table table-bordered table-condensed'>";
		
		read_one_html+="<col width='5%'>";
		read_one_html+="<col width='40%'>";
		read_one_html+="<col width='15%'>";
		read_one_html+="<col width='15%'>";
		read_one_html+="<col width='15%'>";
		read_one_html+="<col width='15%'>";

		taxAmount = parseFloat(data.sale[0].taxAmount*10).toFixed(decimal);
		read_one_html+="<tr><td colspan=6><h4 class='text-danger text-center'>TAX INVOICE</h4>";
		read_one_html+="<h2 class='text-danger text-center'>"+data.sale[0].billName+"</h2>";
		read_one_html+="<h5 class='text-center'>"+data.sale[0].billAddress+"</h5>";
		read_one_html+="<h5 class='text-danger text-center'>"+data.sale[0].contactDetails+"</h5>";
		read_one_html+="<h5 class='text-danger text-center'>"+data.sale[0].others+"</h5>";

		read_one_html+="</td></tr>";

		var d = new Date(data.sale[0].date);
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

		read_one_html+="<tr>";
			read_one_html+="<td colspan=3>"+billTO+"</td>";
			read_one_html+="<td colspan=3>";
			read_one_html+="<div>";
			read_one_html+="Invoice No : " + data.sale[0].billCode+"/"+data.sale[0].invoiceId+"/"+fy+y1+"-"+y2+"<BR><BR>";
			read_one_html+="Date (YYYY-MM-DD) : " + data.sale[0].date+"<BR><BR>";

			var lrNo = '';
			if(data.sale[0].lrNo != null && data.sale[0].lrNo != 'null') {
				lrNo = ' ['+data.sale[0].lrNo+']';
			}

			read_one_html+="Transport (LR) : " + data.sale[0].transportName+lrNo;
		read_one_html+="</div></td></tr>";

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

				var rate = parseFloat(billLimit * val.rate).toFixed(decimal);
				var amount = parseFloat(billLimit * val.amount).toFixed(decimal);

				var narration = val.narration == null ? '' : val.narration;

				if((val.hsnSac == "3926" || val.hsnSac == "7117" || val.hsnSac == "3923") && billType == "invoice") {
					read_one_html+="<tr>";
						read_one_html+="<td>"+srNo+"</td>";
						if(data.sale[0].showName == "0") {
							if(val.hsnSac == "3923"){
								read_one_html+="<td>Dabi</td>";
							} else {
								read_one_html+="<td>Bangles</td>";
							}
						} else {
							read_one_html+="<td>"+val.itemName+"</td>";
						}
						read_one_html+="<td class='text-center'>"+val.hsnSac+"</td>";
						read_one_html+="<td class='text-center'>"+val.quantity+"</td>";
						read_one_html+="<td class='text-right'>"+rate+"</td>";
						read_one_html+="<td class='text-right'>"+amount+"</td>";
					read_one_html+="</tr>";
					srNo++;
					quantityTotal += parseFloat(val.quantity);
				} else if (val.hsnSac == '11111') {
					cartoons += val.quantity;
					deductions += +amount;
				}  else {
					console.log(val.itemName);
					console.log(val.quantity);
					console.log(val.rate);
					console.log(val.hsnSac);
					console.log(deductions);
					deductions += +amount;
					console.log(deductions);
				}
			});
			
			var subTotal = parseFloat((billLimit * data.sale[0].subTotal).toFixed(decimal) - parseFloat(deductions)).toFixed(decimal);

			var preGrandTotal = +subTotal + +taxAmount;
			var roundedGrandTotal = Math.round((preGrandTotal)).toFixed(decimal);
			var roundOff = (parseFloat(roundedGrandTotal) - parseFloat(preGrandTotal)).toFixed(decimal); 

			var grandTotal = (parseFloat(subTotal)+parseFloat(roundOff)+parseFloat(taxAmount)).toFixed(decimal);

			if(billType == "invoice") {
					while (srNo <= 17) { 
						read_one_html+="<tr>";
						read_one_html+="<td><BR></td>";
						read_one_html+="<td></td>";
						read_one_html+="<td></td>";
						read_one_html+="<td></td>";
						read_one_html+="<td></td>";
						read_one_html+="<td></td>";
						read_one_html+="</tr>";
						srNo++;
					}

			}
	
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

				read_one_html+="</td><td rowspan=5 class='text-center'>Total</td>";
					read_one_html+="<td rowspan=5 class='text-center'>"+quantityTotal+"</td>";
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

			read_one_html+="<tr class='info'>";
				read_one_html+="<td  colspan=5><b>Amount (In Words) : <i>"+inWords(parseFloat(grandTotal))+"</i></b></td>";
				read_one_html+="<td class='text-right'>"+grandTotal+"</td>";
			read_one_html+="</tr>";
			
			read_one_html+="<tr>";
				read_one_html+="<td colspan=6 class='text-right'>For "+data.sale[0].billName+"<BR><BR><BR>Authorized Signatory</td>";
			read_one_html+="</tr>";

			read_one_html+="<tr>";
				read_one_html+="<td colspan=6>E.& O.E.</td>";
			read_one_html+="</tr>";

			read_one_html+="<tr>";
				read_one_html+="<td colspan=6 class='text-center'>"+data.sale[0].bankDetails+"</td>";
			read_one_html+="</tr>";

		read_one_html+="</table>";
		
		read_one_html+="<div id='print' class='btn btn-primary center-block m-b-15px print-button'>";
			read_one_html+="<span class='glyphicon glyphicon-print'></span> Print";
		read_one_html+="</div>";

		$("#page-content").html(read_one_html);

		changePageTitle("Sale Invoice");  // Change Needed HERE
	});

    }