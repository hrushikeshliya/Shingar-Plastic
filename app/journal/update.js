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

				var update_html = `
		
		<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>
		    <span class='glyphicon glyphicon-arrow-left'></span> Go Back
		</div>
		
		<form id='update-form' action='#' method='post' border='0'>
		    <table class='table table-hover table-responsive table-bordered'>

				<tr>
					<td>Id</td>
					<td>${data.type}_${data.id}</td>
				</tr>
				<tr>
					<td>Date</td>
					<td>${data.date}</td>
				</tr>
				<tr>
					<td>Debit Account (Alias)</td>
					<td><select name='debitAccountId' id='debitAccountId' class='form-control pull-left m-b-15px' required>${debitAccountList}</select></td>
				</tr>
				<tr>
					<td>Credit Account (Alias)</td>
					<td><select name='creditAccountId' id='creditAccountId' class='form-control pull-left m-b-15px' required>${creditAccountList}</select></td>
				</tr>
		        <tr>
				<tr>
					<td>Amount</td>
					<td><input type='number' min=0.001 step=0.001 name='amount' id='amount' value='${data.amount}' class='form-control pull-left m-b-15px' required></td>
				</tr>
				<tr>
					<td>Narration</td>
					<td><input type='text' name='narration' id='narration' value='${data.narration}' class='form-control pull-left m-b-15px' required></td>
				</tr>		 
					<td>
						<input value='${id}' name='id' type='hidden' />
						<input value='${username}' name='username' type='hidden' required/>
						<input value='${data.date}' name='date' type='hidden' required/>
					</td>
		 
		            <td>
		                <button type='submit' class='btn btn-info'>
		                    <span class='glyphicon glyphicon-edit'></span> Update
		                </button>
		            </td>
		 
		        </tr>
		 
		    </table>
		</form>`;

				$("#page-content").html(update_html);
				changePageTitle("Edit Journal Entry");  // Change Needed HERE

			});
		});
	});

	$(document).on('submit', '#update-form', function () {

		var form_data = JSON.stringify($(this).serializeObject());

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