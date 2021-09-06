$(document).ready(function () {
    create();
});

function create() {

    var username = $.cookie('username');
    var item_options_html = "";
    var account_options_html = "";
    var invoice_options_html = "";
    var create_html = "";
    var returnInvoiceId = "";

    $.getJSON(apiURL + "/singleValues/read.php?type=saleReturn" + "&ts=" + Math.random(), function (data) {

        returnInvoiceId = data.singleValues[0].id;

        item_options_html += "<select id='itemIdList' onchange = setQuantityLimit() class='form-control'>";
        item_options_html += "<option value=''></option>";
        item_options_html += "</select>";

        invoice_options_html += "<select id='invoiceId' name='invoiceId' onchange = getInvoiceItems() class='form-control' required>";
        invoice_options_html += "<option value=''></option>";
        invoice_options_html += "</select>";

        $.getJSON(apiURL + "/sale/read.php?type=distinctAccount" + "&ts=" + Math.random(), function (data) {

            account_options_html += "<select id='accountId' name='accountId' onchange = getInvoiceId() class='form-control'>";
            account_options_html += "<option value=''></option>";
            $.each(data.sale, function (key, val) {
                account_options_html += "<option value='" + val.accountId + "'>" + val.accountName + "</option>";
            });
            account_options_html += "</select>";

            create_html += "<form id='createForm' action='#' method='post' border='0'>";

            create_html += "<table class='table table-hover table-responsive table-bordered'>";

            create_html += "<tr>";
            create_html += "<td>Date</td>";
            create_html += "<td><input type='date' name='date' class='form-control' required /></td>";
            create_html += "<td>Account Name</td>";
            create_html += "<td>" + account_options_html + "</td>";
            create_html += "<td>Invoice No</td>";
            create_html += "<td>" + invoice_options_html + "</td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td>Narration</td>";
            create_html += "<td colspan=5><input type='text' name='narration' class='form-control'/></td>";
            create_html += "</tr>";

            create_html += "<tr><td colspan=6></td></tr><tr><td colspan=6></td></tr><tr><td colspan=6></td></tr><tr class='info'>";
            create_html += "<td>Item Name</td>";
            create_html += "<td colspan=2>" + item_options_html + "</td>";
            create_html += "<td>Quantity</td>";
            create_html += "<td><input type='number' id='quantity' onkeyup=validateQuantity() onchange=validateQuantity() min=1 class='form-control'/></td>";
            create_html += "<td align='center'><a onclick=addItem() class='btn btn-success'>Add Item</a></td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td colspan=6>";
            create_html += "<table id='itemNameList' class='table table-hover table-responsive table-bordered'>";
            create_html += "<tr>";
            create_html += "<th align='center'>Item</th>";
            create_html += "<th align='center'>Quantity</th>";
            create_html += "<th align='center'>Rate</th>";
            create_html += "<th align='center'>Amount</th>";
            create_html += "<th></th>";
            create_html += "</tr>";
            create_html += "</table>";
            create_html += "</td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td colspan=4><input type='hidden' id='departmentId' name='departmentId' class='form-control' required /><input type='hidden' id='returnId' name='returnId' class='form-control' required /><input type='hidden' name='returnInvoiceId' value='" + returnInvoiceId + "' class='form-control' required /><input type='hidden' name='username' value='" + username + "' required></td>";
            create_html += "<td>Total :</td><td><input id='totalAmount' name='totalAmount' class='form-control pull-right' value='0' required readOnly></td>";
            create_html += "</tr>";

            create_html += "<tr>";
            create_html += "<td colspan=6>";
            create_html += "<button type='submit' class='btn btn-success pull-right'>";
            create_html += "Submit";
            create_html += "</button>";
            create_html += "</td>";
            create_html += "</tr>";

            create_html += "</table>";
            create_html += "</form>";

            $("#page-content").html("<img id='loaderDiv' src='images/loading.gif' alt='Loading'  width='50' height='50'>" + create_html);
            changePageTitle("Create Sale Return Entry"); // Change Needed HERE
            $("#loaderDiv").hide();
        });
    });

}

$(document).on('submit', '#createForm', function () {
    var form_data = JSON.stringify($(this).serializeObject());

    $.ajax({
        url: apiURL + "/saleReturn/create.php",   // Change Needed HERE
        type: "POST",
        crossDomain: true,

        header: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
        },

        data: form_data,
        success: function (result) {
            items = 1;
            total = 0;
            totalAmount = 0;
            currentMaxLimit = 0;

            if (result['message'] != 'Success') {
                alert(result['message']);
            }
            $("#loaderDiv").hide();
            create();

        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });

    return false;

});
