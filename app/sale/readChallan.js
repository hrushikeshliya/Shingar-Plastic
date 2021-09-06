$(document).ready(function () {
	genearateInvoice("*");

	$(document).on('click', '.sepChallan-button', function () {
		var selectedHsn = [];
		$.each($("input[name='hsnCodes']:checked"), function () {
			selectedHsn.push($(this).val());
		});
		alert("Limiting Challan To Following HSN : " + selectedHsn.join(", "));

		genearateInvoice(selectedHsn);
	});
});

function genearateInvoice(passedHsn) {

	var billType = $_GET('type');
	var id = $_GET('id');

	$.getJSON(apiURL + "/sale/read.php?type=sale&id=" + id + "&ts=" + Math.random(), function (data) {   // Change Needed HERE

		var read_one_html = "";
		var billTO = "";
		var decimal = 0;
		var sepChallan_html = "";
		var hsnSacList = [];

		sepChallan_html += `<div id='challanOptions' class='row readOnlyContent'> 
			<div class='col-md-10'>
			Select HSN/SAC To Generate Challan : &nbsp;&nbsp;`;

		$.each(data.sale[0].invoiceDetail, function (key, val) {
			if (hsnSacList.indexOf(val.hsnSac) == -1) {
				hsnSacList.push(val.hsnSac);

				if (passedHsn.includes(val.hsnSac) || passedHsn == "*") {
					sepChallan_html += `<label class="checkbox-inline"><input type="checkbox" value="` + val.hsnSac + `" name='hsnCodes' checked>` + val.hsnSac + `</label>`;
				} else {
					sepChallan_html += `<label class="checkbox-inline"><input type="checkbox" value="` + val.hsnSac + `" name='hsnCodes'>` + val.hsnSac + `</label>`;
				}
			}
		});

		sepChallan_html += "</div><a class='col-md-2 btn btn-warning center-block m-b-15px sepChallan-button'>";
		sepChallan_html += "<span class='glyphicon glyphicon-refresh'></span> Refresh Challan";
		sepChallan_html += "</a>";

		sepChallan_html += "</div>";

		decimal = 2;
		billTO = "<b>Consignee :</b><br><b>" + data.sale[0].accountName + "</b><BR>" + data.sale[0].address1 + "<BR>" + data.sale[0].address2 + "<BR>City : " + data.sale[0].city + " - " + data.sale[0].pincode + "<BR>State: " + data.sale[0].state + "<BR><BR> GST : " + data.sale[0].gstNo;

		var deductions = 0;
		var billLimit = billType == "invoice" ? (0 + data.sale[0].billLimit) / 10 : 1;

		read_one_html += sepChallan_html;
		read_one_html += "<table id='invoice' class='table table-bordered table-condensed'>";

		read_one_html += "<col width='5%'>";
		read_one_html += "<col width='40%'>";
		read_one_html += "<col width='15%'>";
		read_one_html += "<col width='15%'>";
		read_one_html += "<col width='15%'>";
		read_one_html += "<col width='15%'>";

		read_one_html += "<tr><td colspan=6><h2 class='text-danger text-center'>S.P.</h2>";

		if (passedHsn.includes('7117') || passedHsn == "*") {
			taxAmount = parseFloat(data.sale[0].taxAmount).toFixed(decimal);
		} else {
			taxAmount = 0;
		}

		read_one_html += "</td></tr>";

		var d = new Date(data.sale[0].date);
		var n = d.getFullYear();

		var y1 = 0;
		var y2 = 0;
		var fy = "";

		var compare_dates = function (date1, date2) {
			if (date1 > date2) return false;
			else if (date1 < date2) return true;
			else return true;
		}

		if (compare_dates(d, new Date('2019-03-31'))) {
			y1 = n
			y2 = n + 1
		} else {
			fy = "FY"
			console.log(d)
			console.log(d.getMonth())
			if (d.getMonth() < 3) {
				y1 = n - 1
				y2 = n
			} else {
				y1 = n
				y2 = n + 1
			}
		}

		read_one_html += "<tr>";
		read_one_html += "<td colspan=3>" + billTO + "</td>";
		read_one_html += "<td colspan=3>";
		read_one_html += "<div>";
		read_one_html += "Invoice No : " + data.sale[0].billCode + "/" + data.sale[0].invoiceId + "/" + fy + y1 + "-" + y2 + "<BR><BR>";
		read_one_html += "Date (YYYY-MM-DD) : " + data.sale[0].date + "<BR><BR>";

		var lrNo = '';
		if (data.sale[0].lrNo != null && data.sale[0].lrNo != 'null') {
			lrNo = ' [' + data.sale[0].lrNo + ']';
		}

		read_one_html += "Transport (LR) : " + data.sale[0].transportName + lrNo;

		read_one_html += "</div></td></tr>";

		read_one_html += "<tr>";
		read_one_html += "<td class='text-center'>Sr.no</td>";
		read_one_html += "<td class='text-center'>Item Name</td>";
		read_one_html += "<td class='text-center'>HSN/SAC</td>";
		read_one_html += "<td class='text-center'>Quantity</td>";
		read_one_html += "<td class='text-center'>Rate</td>";
		read_one_html += "<td class='text-center'>Amount</td>";
		read_one_html += "</tr>";


		srNo = 1;
		quantityTotal = 0;
		$.each(data.sale[0].invoiceDetail, function (key, val) {

			if (passedHsn.includes(val.hsnSac) || passedHsn == "*") {

				var rate = parseFloat(billLimit * val.rate).toFixed(decimal);
				var amount = parseFloat(billLimit * val.amount).toFixed(decimal);

				var narration = val.narration == null ? '' : val.narration;

				read_one_html += "<tr>";
				read_one_html += "<td>" + srNo + "</td>";
				read_one_html += "<td>" + val.itemName + "&nbsp;&nbsp<i><small>" + narration + "</small></i></td>";
				read_one_html += "<td class='text-center'>" + val.hsnSac + "</td>";
				read_one_html += "<td class='text-center'>" + val.quantity + "</td>";
				read_one_html += "<td class='text-right'>" + rate + "</td>";
				read_one_html += "<td class='text-right'>" + amount + "</td>";
				read_one_html += "</tr>";
				srNo++;
				quantityTotal += parseFloat(val.quantity);

			} else {
				var amount = parseFloat(billLimit * val.amount).toFixed(decimal);
				deductions += +amount;
			}

		});

		var subTotal = parseFloat((billLimit * data.sale[0].subTotal).toFixed(decimal) - parseFloat(deductions)).toFixed(decimal);

		var preGrandTotal = +subTotal + +taxAmount;
		var roundedGrandTotal = Math.round((preGrandTotal)).toFixed(decimal);
		var roundOff = (parseFloat(roundedGrandTotal) - parseFloat(preGrandTotal)).toFixed(decimal);

		var grandTotal = (parseFloat(subTotal) + parseFloat(roundOff) + parseFloat(taxAmount)).toFixed(decimal);
		grandTotal = parseFloat(preGrandTotal).toFixed(decimal);

		read_one_html += "<tr>";
		read_one_html += "<td colspan=2></td><td class='text-center'>Total</td>";
		read_one_html += "<td class='text-center'>" + quantityTotal + "</td>";
		read_one_html += "<td>Tax @ " + data.sale[0].tax + " %</td>";
		read_one_html += "<td class='text-right'>" + taxAmount + "</td>";
		read_one_html += "</tr>";

		read_one_html += "<tr class='info'>";
		read_one_html += "<td  colspan=5><b>Amount (In Words) : <i>" + inWords(parseFloat(grandTotal)) + "</i></b></td>";
		read_one_html += "<td class='text-right'>" + grandTotal + "</td>";
		read_one_html += "</tr>";

		read_one_html += "<tr>";
		read_one_html += "<td colspan=3></td>";
		read_one_html += "<td colspan=3>Prepared By : " + data.sale[0].username + "</td>";
		read_one_html += "</tr>";

		read_one_html += "<tr>";
		read_one_html += "<td colspan=3></td>";
		read_one_html += "<td colspan=3>Checked By : </td>";
		read_one_html += "</tr>";

		read_one_html += "</table>";

		read_one_html += "<div id='print' class='btn btn-primary center-block m-b-15px print-button'>";
		read_one_html += "<span class='glyphicon glyphicon-print'></span> Print";
		read_one_html += "</div>";

		$("#page-content").html(read_one_html);


		changePageTitle("Sale Invoice");  // Change Needed HERE
	});

}