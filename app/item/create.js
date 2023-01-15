$(document).ready(function () {

    var itemGroup_options_html = "";

    $.getJSON(apiURL + "/itemGroup/read.php?ts=" + Math.random(), function (data) {

        itemGroup_options_html += "<select name='itemGroup' class='form-control'>";
        $.each(data.itemGroup, function (key, val) {
            itemGroup_options_html += "<option value='" + val.id + "'>" + val.name + "</option>";
        });
        itemGroup_options_html += "</select>";
    });

    var status_options_html = "";

    status_options_html += "<select name='active' class='form-control'>";
    status_options_html += "<option value='1'>Active</option>";
    status_options_html += "<option value='0'>InActive</option>";
    status_options_html += "</select>";

    var hsnSacException_options_html = "";

    hsnSacException_options_html += "<select name='hsnSacException' class='form-control'>";
    hsnSacException_options_html += "<option value='1'>1</option>";
    hsnSacException_options_html += "<option value='0' selected>0</option>";
    hsnSacException_options_html += "</select>";

    $(document).on('click', '.create-button', function () {

        var create_html = "";

        create_html += "<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
        create_html += "<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
        create_html += "</div>";

        create_html += "<form id='createForm' action='#' method='post' border='0'>";

        create_html += "<table class='table table-hover table-responsive table-bordered'>";

        create_html += "<tr>";
        create_html += "<td>Item Name</td>";
        create_html += "<td><input type='text' name='name' class='form-control' required /></td>";
        create_html += "<td>Item Group</td>";
        create_html += "<td>" + itemGroup_options_html + "</td>";
        create_html += "</tr>";

        create_html += "<tr>";
        create_html += "<td>Purchase Rate</td>";
        create_html += "<td><input type='number' step='0.001' min=0 name='purchaseRate' class='form-control'/></td>";
        create_html += "<td>Sale Rate</td>";
        create_html += "<td><input type='number' step='0.001' min='0.001' name='saleRate' class='form-control' required /></td>";
        create_html += "</tr>";

        create_html += "<tr>";
        create_html += "<td>Job Rate</td>";
        create_html += "<td><input type='number' step='0.001' min=0 name='jobRate' class='form-control'/></td>";
        create_html += "<td>Item Weight</td>";
        create_html += "<td><input type='number' name='itemWeight' class='form-control'/></td>";
        create_html += "</tr>";

        create_html += "<tr>";
        create_html += "<td>HSN / SAC</td>";
        create_html += "<td><input type='number' name='hsnSac' class='form-control' required /></td>";
        create_html += "<td>HSN / SAC (Net)</td>";
        create_html += "<td>" + hsnSacException_options_html + "</td>";
        create_html += "</tr>";

        create_html += "<tr>";
        create_html += "<td>Narration</td>";
        create_html += "<td><input type='text' name='narration' class='form-control'/></td>";
        create_html += "<td>Status</td>";
        create_html += "<td>" + status_options_html + "</td>";
        create_html += "</tr>";
        
        create_html += "<tr>";
        create_html += "<td>";
        create_html += "<button type='submit' class='btn btn-success'>";
        create_html += "Submit";
        create_html += "</button>";
        create_html += "</td>";
        create_html += "</tr>";

        create_html += "</table>";
        create_html += "</form>";

        $("#page-content").html(create_html);
        changePageTitle("Create Item"); // Change Needed HERE

    });

    $(document).on('submit', '#createForm', function () {
        var form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: apiURL + "/item/create.php",   // Change Needed HERE
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