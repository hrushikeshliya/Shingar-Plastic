$(document).ready(function () {
    show();
});

function show() {
    var username = $.cookie('username');

    $.getJSON(apiURL + "/account/read.php?ts=" + Math.random(), function (accountData) {

        var creditAccountList = ""
        var debitAccountList = ""

        $.each(accountData.account, function (key, accountDataVal) {
            creditAccountList += `<option value='${accountDataVal.id}'>${accountDataVal.aliasName}</option>`;
            debitAccountList += `<option value='${accountDataVal.id}'>${accountDataVal.aliasName}</option>`;
        });

        create_html = "";

        create_html += "<div class='row'>";
        create_html += "<div class='col-md-5'>";

        create_html += "<datalist id='accountNameList'>";
        create_html += "</datalist>";
        create_html += "</div>";
        create_html += "<div class='col-md-3'>";
        create_html += "";
        create_html += "</div>";
        create_html += "<div class='col-md-4'>";
        create_html += "";
        create_html += "</div>";

        create_html += "</div>";

        create_html += "<form id='update-form' action='#' method='post'>";

        create_html += "<table class='table' id='myTable' border='all'>";

        create_html += "<tr>";
        create_html += "<td> Date : <input type='date' name='date' id='date' class='form-control' required>";
        create_html += "<input type='hidden' name='type' id='type' value='JOU'>";
        create_html += "<input type='hidden' name='username' id='username' value='" + username + "'></td><td colspan=3></td>";
        create_html += "</tr>";
        create_html += "<tr>";
        create_html += "<th class='text-align-center'>Debit A/c (Alias)</th>";
        create_html += "<th class='text-align-center'>Credit A/c (Alias)</th>";
        create_html += "<th class='text-align-center'>Amount</th>";
        create_html += "</tr>";

        create_html += "<tr>";
        create_html += "<td><select id='debitAccountId' name='debitAccountId' class='form-control pull-left m-b-15px' required>" + debitAccountList + "</select></td>";
        create_html += "<td><select id='creditAccountId' name='creditAccountId' class='form-control pull-left m-b-15px' required>" + creditAccountList + "</select></td>";
        create_html += "<td><input type='number' id='amount' name='amount' min='0.001' step='0.001' class='form-control' required></td>";
        create_html += "</tr>";

        create_html += "<tr>";
        create_html += "<td colspan='2'>Narration : <input id='narration' name='narration' class='form-control pull-left m-b-15px'/></th>";
        create_html += "<td class='text-align-center'><BR>";
        create_html += "<button type='submit' class='btn btn-info'>";
        create_html += "<span class='glyphicon glyphicon-edit'></span> Submit";
        create_html += "</button></th>";
        create_html += "</tr>";

        create_html += "</table>";
        create_html += "</form>";
        $("#page-content").html(create_html);
        changePageTitle("Journal Entry");  // Change Needed HERE

    });


    $(document).on('submit', '#update-form', function () {

        var form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: apiURL + "/transaction/create.php",   // Change Needed HERE
            type: "POST",
            crossDomain: true,

            header: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },

            data: form_data,
            success: function (result) {
                alert("Success");
                show();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
        return false;
    });

}