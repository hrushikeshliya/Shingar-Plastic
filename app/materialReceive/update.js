$(document).ready(function () {

	var username = $.cookie('username');
	$(document).on('click', '.update-button', function () {

		var id = $(this).attr('data-id');

		$.getJSON(apiURL + "/materialReceive/readOne.php?id=" + id + "&ts=" + Math.random(), function (data) {  // Change Needed HERE

			var update_html = "";

			update_html += "<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
			update_html += "<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
			update_html += "</div>";

			update_html += "<form id='update-form' action='#' method='post' border='0'>";
			update_html += "<table class='table table-hover table-responsive table-bordered'>";

			update_html += "<tr>";
			update_html += "<td>Id</td>";
			update_html += "<td>" + id + "</td>";
			update_html += "<td>date</td>";
			update_html += "<td><input type='date' value='" + data.date + "' name='date'   min='" + $.cookie('startDate') + "' max='" + $.cookie('endDate') + "' class='form-control' required /></td>";
			update_html += "</tr>";

			update_html += "<tr>";
			update_html += "<td>Jobber Name</td>";
			update_html += "<td>" + data.aliasName + "</td>";
			update_html += "<td>Item Name</td>";
			update_html += "<td>" + data.itemName + "</td>";
			update_html += "</tr>";

			update_html += "<tr>";
			update_html += "<td>Quantity (Psc)</td>";
			update_html += "<td><input type='number' id='quantity' name='quantity' onkeyup=getJobCharge() value='" + data.quantity + "' min = '1' max = '" + (data.pendingQuantity + data.quantity) + "' class='form-control' required /></td>";
			update_html += "<td>Rate</td>";
			update_html += "<td><input type='text' id='rate' value='" + data.rate + "' name='rate'  onkeyup=getJobCharge() class='form-control' onchange=getJobCharge() required/></td>";
			update_html += "</tr>";

			update_html += "<tr>";
			update_html += "<td>Job Charge</td>";
			update_html += "<td><input type='text' id='jobCharge' value='" + parseFloat(data.jobCharge).toFixed(2) + "' name='jobCharge' class='form-control' required readOnly/></td>";
			update_html += "<td>Narration</td>";
			update_html += "<td><input type='text' value='" + data.narration + "' name='narration' class='form-control'/></td>";
			update_html += "</tr>";

			update_html += "<tr>";

			update_html += "<td colspan='4' align='center'><input value=\"" + id + "\" name='id' type='hidden' /><input value=\"" + username + "\" name='username' type='hidden' />";

			update_html += "<button type='submit' class='btn btn-info'>";
			update_html += "<span class='glyphicon glyphicon-edit'></span> Update";
			update_html += "</button>";
			update_html += "</td>";

			update_html += "</tr>";

			update_html += "</table>";
			update_html += "</form>";

			$("#page-content").html(update_html);
			changePageTitle("Edit Material Receive");  // Change Needed HERE

		});

	});
});


$(document).on('submit', '#update-form', function () {

	var form_data = JSON.stringify($(this).serializeObject());

	$.ajax({
		url: apiURL + "/materialReceive/update.php",  // Change Needed HERE
		type: "POST",
		crossDomain: true,

		header: {
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Origin": "*",
		},

		data: form_data,
		success: function (result) {
			show();
		},
		error: function (xhr, resp, text) {
			console.log(xhr, resp, text);
		}
	});
	return false;
});