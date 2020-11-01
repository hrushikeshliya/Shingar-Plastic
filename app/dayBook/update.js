$(document).ready(function () {

	$(document).on('click', '.update-button', function () {

		var id = $(this).attr('data-id');
		var username = $.cookie('username');

		$.getJSON(apiURL + "/account/read.php?ts=" + Math.random(), function (accountData) {

			var creditAccountList = ""
			var debitAccountList = ""

			$.getJSON(apiURL + "/transaction/readOne.php?id=" + id + "&ts=" + Math.random(), function (data) {  // Change Needed HERE

				$.each(accountData.account, function (key, accountDataVal) {

					var debitAccountSelected = ""
					var creditAccountSelected = ""

					if (data.debitAccountId == accountDataVal.id) {
						debitAccountSelected = "selected"
					}

					if (data.creditAccountId == accountDataVal.id) {
						creditAccountSelected = "selected"
					}

					creditAccountList += `<option value='${accountDataVal.id}' ${creditAccountSelected}>${accountDataVal.aliasName}</option>`;
					debitAccountList += `<option value='${accountDataVal.id}' ${debitAccountSelected}>${accountDataVal.aliasName}</option>`;
				});

				var update_html = "";

				update_html += "<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
				update_html += "<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
				update_html += "</div>";

				if (data.type == 'REC') {
					update_html += "<h4 class='text-danger'>Payment Recieved / JAMA</h4><HR>";
				} else {
					update_html += "<h4 class='text-danger'>Payment Made</h4><HR>";
				}

				update_html += "<form id='update-form' action='#' method='post'>";

				update_html += "<input type='hidden' name='username' value='" + username + "'>";
				update_html += "<input type='hidden' name='type' value='" + data.type + "'>";
				update_html += "<input type='hidden' name='id' value='" + id + "'>";

				update_html += "<table class='table' id='myTable' border='all'>";

				update_html += "<tr>";
				update_html += "<th class='text-align-center'>Date</th>";
				update_html += "<th class='text-align-center'>Account Name (Alias)</th>";
				update_html += "<th class='text-align-center'>Amount</th>";
				update_html += "</tr>";

				update_html += "<tr>";
				update_html += "<td><input type='date' name='date' id='date' value='" + data.date + "' class='form-control'></td>";

				if (data.type == 'REC') {
					update_html += "<td><select id='debitAcccountId' name='debitAccountId' value='" + data.debitAccountId + "' class='form-control pull-left m-b-15px' required>" + debitAccountList + "</select></td>";
					update_html += "<input type='hidden' name='creditAccountId' value=29>";
				} else {
					update_html += "<input type='hidden' name='debitAccountId' value=29>";
					update_html += "<td><select id='creditAcccountId' name='creditAccountId' value='" + data.creditAccountId + "' class='form-control pull-left m-b-15px' required>" + creditAccountList + "</select></td>";
				}

				update_html += "<td><input type='number' id='amount' min='0.001' step='0.001' name='amount' value='" + data.amount + "' class='form-control pull-left m-b-15px' required></td>";
				update_html += "</tr>";

				update_html += "<tr>";
				update_html += "<td colspan='2'>Narration : <input id='narration' name='narration' value='" + data.narration + "' class='form-control pull-left m-b-15px'/></td>";
				update_html += "<td class='text-right'>";
				update_html += "<button type='submit' class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + data.id + "'>";
				update_html += "<span class='glyphicon glyphicon-edit'> Update</span>";
				update_html += "</button>";

				update_html += "<button class='btn btn-danger m-b-10px  delete-button' data-id='" + data.id + "'>";
				update_html += "<span class='glyphicon glyphicon-remove'> Delete</span>";
				update_html += "</button>";
				update_html += "</td>";

				update_html += "</tr>";

				update_html += "</table>";
				update_html += "</form>";

				$("#page-content").html(update_html);
				changePageTitle("Edit Day Book Entry");  // Change Needed HERE

			});
		});
	});

	$(document).on('submit', '#update-form', function () {

		var form_data = JSON.stringify($(this).serializeObject());
		var obj = jQuery.parseJSON(form_data);

		$.ajax({
			url: apiURL + "/transaction/update.php",  // Change Needed HERE
			type: "POST",
			crossDomain: true,

			header: {
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Origin": "*",
			},

			data: form_data,
			success: function (result) {
				alert("Success");
			},
			error: function (xhr, resp, text) {
				console.log(xhr, resp, text);
			}
		});
		return false;
	});
});