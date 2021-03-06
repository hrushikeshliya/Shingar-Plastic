$(document).ready(function () {
    show();

    $("#netOffAmt").keyup(function () {
        calculateJVAmt();
    });

    $("#netOffAmt").change(function () {
        calculateJVAmt();
    });

    $("#date").change(function () {
        getCurrentBalance();
    });

    $("#accountName").change(function () {
        getCurrentBalance();
    });
});


function calculateJVAmt() {
    var currentBalance = $("#currentBalance").val();
    var netOffAmt = $("#netOffAmt").val();
    $("#amount").val(parseFloat(Math.abs(currentBalance - netOffAmt)).toFixed(3));
}

function getCurrentBalance() {
    var id = $("#accountName").val();
    var date = $("#date").val();
    var dateParam = "";

    if (date != '') {
        dateParam = "&date=" + date;
    }

    var closingBalance = 0;
    var openingBalance = 0;
    var saleTillDate = 0;
    var saleReturnTillDate = 0;
    var purchaseTillDate = 0;
    var purchaseReturnTillDate = 0;
    var jobTillDate = 0;
    var paymentTillDate = 0;
    var accType = '';
    var accName = '';

    console.log("Get Current Balance For : " + id + " : As Of : " + date);
    $.getJSON(apiURL + "/account/readOne.php?id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
        openingBalance = parseFloat(data.openingBalance);
        closingBalance = openingBalance;
        accType = data.accountType;
        accName = data.aliasName;

        $.getJSON(apiURL + "/transaction/read.php?type=amountTillDate&id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
            paymentTillDate = parseFloat(data.payment[0].amount);

            if (accType == 'DEBTORS') {
                closingBalance -= paymentTillDate;
                $("#debitAccount").val(accName);
                $("#creditAccount").val('DISCOUNT A/C');

                $("#debitAccountId").val(id);
                $("#creditAccountId").val(30);

                $("#narration").val('DISCOUNT BEING GIVEN');
                $("#type").val('JOU');
            } else if (accType == 'CREDITORS') {
                closingBalance += paymentTillDate;
                $("#debitAccount").val('DISCOUNT A/C');
                $("#creditAccount").val(accName);

                $("#debitAccountId").val(30);
                $("#creditAccountId").val(id);

                $("#narration").val('DISCOUNT BEING TAKEN');
                $("#type").val('JOU');
            } else if (accType == 'JOBBER') {
                closingBalance += paymentTillDate;
                $("#debitAccount").val('DISCOUNT A/C');
                $("#creditAccount").val(accName);

                $("#debitAccountId").val(30);
                $("#creditAccountId").val(id);

                $("#narration").val('DISCOUNT BEING TAKEN');
                $("#type").val('JOU');
            } else {
                $("#debitAccount").val('');
                $("#creditAccount").val('');

                $("#debitAccountId").val(0);
                $("#creditAccountId").val(0);

                $("#narration").val('NETOFF NOT PERMITTED FOR THIS ACCOUNT');
                $("#type").val('');
            }

            console.log(closingBalance);
            $.getJSON(apiURL + "/sale/read.php?type=amountTillDate&id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
                saleTillDate = parseFloat(data.sale[0].amount);
                closingBalance += saleTillDate;
                console.log("AFTER SALE " + closingBalance);
                $.getJSON(apiURL + "/purchase/read.php?type=amountTillDate&id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
                    purchaseTillDate = parseFloat(data.purchase[0].amount);
                    closingBalance -= purchaseTillDate
                    console.log("AFTER PURCHASE " + closingBalance);
                    $.getJSON(apiURL + "/saleReturn/read.php?type=amountTillDate&id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
                        saleReturnTillDate = parseFloat(data.saleReturn[0].amount);
                        closingBalance -= saleReturnTillDate;
                        console.log("AFTER SALE RETURN " + closingBalance);
                        $.getJSON(apiURL + "/purchaseReturn/read.php?type=amountTillDate&id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
                            purchaseReturnTillDate = parseFloat(data.purchaseReturn[0].amount);
                            closingBalance += purchaseReturnTillDate;
                            console.log("AFTER PURCHASE RETURN " + closingBalance);
                            $.getJSON(apiURL + "/materialReceive/read.php?type=amountTillDate&id=" + id + dateParam + "&ts=" + Math.random(), function (data) {
                                jobTillDate = data.materialReceive[0].amount;
                                closingBalance -= jobTillDate;

                                console.log("AFTER MATERIAL RCV " + closingBalance);

                                closingBalance = closingBalance.toFixed(2)

                                console.log("FINAL " + closingBalance);
                                $("#currentBalance").val(closingBalance);
                                $("#netOffAmt").val(closingBalance);
                                $("#netOffAmt").attr('max', Math.abs(closingBalance));

                            });
                        });
                    });
                });
            });
        });
    });
}

function show() {

    var accountName_options = "";
    update_html = "";

    accountName_options += "<input list='accountNameList' id='accountName' name='accountName' class='form-control pull-left m-b-15px' placeholder='Search' autocomplete='off'/></label>";
    accountName_options += "<datalist id='accountNameList'>";
    accountName_options += "</datalist>";

    update_html += `
    
    <form id='create-form' action='#' method='post' border='0'>
            <table class='table table-bordered table-hover'>

            <tr>
                <td class='text-align-right'>Account Name</th>
                <td class='text-align-left'>${accountName_options}</td>
            </tr>
            
            <tr>
                <td class='text-align-right'>Date</th>
                <td class='text-align-left'><input type='date' id='date' name='date'   min='${$.cookie('startDate')}' max='${$.cookie('endDate')}'  class='form-control' required />
                <input type='hidden' name='username' id='username' value='${$.cookie('username')}'></td>
            </tr>

            <tr>
                <td class='text-align-right'>Current Balance</th>
                <td class='text-align-left'><input value='0' type='number' step=0.001 id='currentBalance' name='currentBalance' class='form-control' required disabled/></td>
            </tr>

            <tr>
                <td class='text-align-right'>Net Off Balance</th>
                <td class='text-align-left'><input value='0' type='number' step=0.001 id='netOffAmt' name='netOffAmt' class='form-control' required /></td>
            </tr>

            <tr>
                <td class='text-align-right'>J/V Amount</th>
                <td class='text-align-left'><input value='0' type='number' step=0.001 id='amount' name='amount' class='form-control' required readonly/></td>
            </tr>

            <tr>
                <td class='text-align-right'>Debit Account</th>
                <td class='text-align-left'>
                    <input type='text' id='debitAccount' name='debitAccount' class='form-control' required readonly/>
                    <input type='hidden' id='debitAccountId' name='debitAccountId' class='form-control' required/>
                </td>
            </tr>

            <tr>
                <td class='text-align-right'>Credit Account</th>
                <td class='text-align-left'>
                    <input type='text' id='creditAccount' name='creditAccount' class='form-control' required readonly/>
                    <input type='hidden' id='creditAccountId' name='creditAccountId' class='form-control' required/>
                </td>
            </tr>

            <tr>
                <td class='text-align-center' colspan=2><input type='text' id='narration' name='narration' class='form-control' readonly/><input type='text' id='type' name='type' class='form-control' readonly/></th>
            </tr>

            <tr>
                <td colspan = '2' class = 'text-align-center'>
                    <button type='submit' class='btn btn-info'>
                        <span class='glyphicon glyphicon-edit'></span> Submit
                    </button>
                </td>
            <tr>
        </table>

    </form>`;

    $.getJSON(apiURL + "/account/read.php?ts=" + Math.random(), function (data) {

        var dataList = $("#accountNameList");
        dataList.empty();

        $.each(data.account, function (key, val) {
            var opt = $("<option></option>").attr("value", val.id).text(val.aliasName);
            dataList.append(opt);
        });
    });


    $("#page-content").html(update_html);
    changePageTitle("Net Off");  // Change Needed HERE


    $(document).on('submit', '#create-form', function () {

        var form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: apiURL + "/transaction/create.php?type=netOff",  // Change Needed HERE
            type: "POST",
            crossDomain: true,

            header: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },

            data: form_data,
            success: function (result) {
                alert(result["message"]);
                show();

                $("#netOffAmt").keyup(function () {
                    calculateJVAmt();
                });

                $("#netOffAmt").change(function () {
                    calculateJVAmt();
                });

                $("#date").change(function () {
                    getCurrentBalance();
                });

                $("#accountName").change(function () {
                    getCurrentBalance();
                });
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
        return false;
    });

}