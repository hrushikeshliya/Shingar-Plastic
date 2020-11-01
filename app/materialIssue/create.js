$(document).ready(function () {
    show();
});

function show() {

    var username = $.cookie('username');

    var item_options_html = "";
    var process_options_html = "";
    var jobber_options_html = "";

    $.getJSON(apiURL + "/item/read.php?ts=" + Math.random(), function (data) {

        item_options_html += "<select name='itemId' id='itemId' onchange=getRate() class='form-control'>";
        item_options_html += "<option value=''></option>";
        $.each(data.item, function (key, val) {
            item_options_html += "<option value='" + val.id + "'>" + val.name + "</option>";
        });
        item_options_html += "</select>";

        $.getJSON(apiURL + "/account/read.php?type=JOBBER" + "&ts=" + Math.random(), function (data) {

            jobber_options_html += "<select id='jobberId' name='jobberId' onchange=getIssues() class='form-control'>";
            jobber_options_html += "<option value=''></option>";
            $.each(data.account, function (key, val) {
                jobber_options_html += "<option value='" + val.id + "'>" + val.aliasName + "</option>";
            });
            jobber_options_html += "</select>";

            var create_html = "";

            create_html += "<a class='btn btn-primary pull-right m-b-15px' href = './materialIssueRegister.php'>";
            create_html += "<span class='glyphicon glyphicon-th'></span> Material Issue Register";
            create_html += "</a>";

            create_html += "<form id='createForm' action='#' method='post' border='0'>";

            create_html += "<table class='table table-hover table-responsive table-bordered'>";

            create_html += "<tr>";
            create_html += "<td>Date</td>";
            create_html += "<td><input type='date' name='date'   min='" + $.cookie('startDate') + "' max='" + $.cookie('endDate') + "' class='form-control' required /></td>";
            create_html += "<td>Jobber</td>";
            create_html += "<td>" + jobber_options_html + "</td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td>Item</td>";
            create_html += "<td>" + item_options_html + "</td>";
            create_html += "<td>Quantity (Psc)</td>";
            create_html += "<td><input type='number' name='quantity' min = '1' class='form-control' required /></td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td>Narration</td>";
            create_html += "<td colspan = '3'><input type='text' name='narration' class='form-control'/></td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td colspan='4' align='center'>";
            create_html += "<button type='submit' class='btn btn-success'>";
            create_html += "Submit";
            create_html += "</button>";
            create_html += "<input type='hidden' name='username' value='" + username + "'>";
            create_html += "</td>";
            create_html += "</tr>";

            create_html += "</table>";
            create_html += "</form>";

            create_html += "<div><table  id='issuedMaterials' class='table table-hover table-responsive table-bordered' align='center'>";
            create_html += "<tr>";
            create_html += "<th>Issue Id</th>";
            create_html += "<th>Date</th>";
            create_html += "<th>Issued Quantity</th>";
            create_html += "<th>Pending Quantity</th>";
            create_html += "<th>Item Name</th>";
            create_html += "<tr></table></div>";


            $("#page-content").html(create_html);
            changePageTitle("Material issue"); // Change Needed HERE
            $("#issuedMaterials").hide();
        });

    });
}

$(document).on('submit', '#createForm', function () {
    var form_data = JSON.stringify($(this).serializeObject());

    $.ajax({
        url: apiURL + "/materialIssue/create.php",   // Change Needed HERE
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
