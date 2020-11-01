$(document).ready(function () {

	$(document).on('click', '.update-button', function () {

		var id = $(this).attr('data-id');

		$.getJSON(apiURL + "/city/read.php?id=" + id + "&ts=" + Math.random(), function (data) {  // Change Needed HERE

			var id = data.city[0].id;

			var update_html = "";

			update_html += "<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
			update_html += "<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
			update_html += "</div>";

			update_html += "<form id='update-form' action='#' method='post' border='0'>";
			update_html += "<table class='table table-hover table-responsive table-bordered'>";

			update_html += "<tr>";
			update_html += "<td>State</td>";
			update_html += "<td><input value=\"" + data.city[0].stateName + "\" type='text' name='stateName' class='form-control' required /></td>";
			update_html += "</tr>";

			update_html += "<tr>";
			update_html += "<td>City</td>";
			update_html += "<td><input value=\"" + data.city[0].cityName + "\" type='text' name='cityName' class='form-control' required /></td>";
			update_html += "</tr>";


			update_html += "<td><input value=\"" + id + "\" name='id' type='hidden' /></td>";

			update_html += "<td>";
			update_html += "<button type='submit' class='btn btn-info'>";
			update_html += "<span class='glyphicon glyphicon-edit'></span> Update";
			update_html += "</button>";
			update_html += "</td>";

			update_html += "</tr>";

			update_html += "</table>";
			update_html += "</form>";

			$("#page-content").html(update_html);
			changePageTitle("Edit City / State");  // Change Needed HERE

		});

	});

	$(document).on('submit', '#update-form', function () {

		var form_data = JSON.stringify($(this).serializeObject());

		$.ajax({
			url: apiURL + "/city/update.php",  // Change Needed HERE
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
});