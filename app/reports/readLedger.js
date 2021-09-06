$(document).ready(function () {
  show($.cookie("startDate"), $.cookie("endDate"), $.cookie("startDate"), $.cookie("endDate"));

  $(document).on('click', '.search-button', function () {
    var partialStartDate = $("#startDate").val();
    var partialEndDate = $("#endDate").val();
    show($.cookie("startDate"), $.cookie("endDate"), partialStartDate, partialEndDate);
  });
});

function get_ledger_html(creditTitle, debitTitle, openingBalance, closingBalance, closingBalanceExpected, debitTransactions, creditTransactions, hsn_summary) {

  let ledger_html = `    

    <table class='table' rules='all'>
    <col width='80px'>
    <col width='90px'>
    <col width='150px'>
    <col width='100px'>
    <col width='100px'>
    <col width='100px'>
    <col width='80px'>
    <col width='90px'>
    <col width='150px'>
    <col width='100px'>
    <col width='100px'>
    <col width='100px'>
    
    <tr>
    <td colspan=6 class='text-center'>${debitTitle}</td>
    <td colspan=6 class='text-center'>${creditTitle}</td>
    </tr>  

    <tr>
    <td></td>
    <td></td>
        <td class='text-success'>Opening Balance</td>
    <td></td>
    <td></td>
    <td class='text-right text-success'>${parseFloat(openingBalance).toFixed(2)}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Others</td>
    <td>Net</td>
    <td>Total</td>
    <td></td>
    <td></td>
    <td></td>
    <td>Others</td>
    <td>Net</td>
    <td>Total</td>
    </tr>
    `;

  debitTransactionLength = debitTransactions.length;
  creditTransactionLength = creditTransactions.length;
  loopCount = debitTransactionLength > creditTransactionLength ? debitTransactionLength : creditTransactionLength;

  var i;
  let debitSubTotal = 0;
  let debit_others_hsn_summary_total = 0;
  let debit_net_hsn_summary_total = 0;

  let creditSubTotal = 0;
  let credit_others_hsn_summary_total = 0;
  let credit_net_hsn_summary_total = 0;

  for (i = 0; i < loopCount; i++) {

    ledger_html += "<tr>";

    if (i < debitTransactionLength) {

      var res = hsn_summary.filter(x => (x.invoiceId === debitTransactions[i].invoice_id & x.type === debitTransactions[i].type));
      let others_hsn_summary = 0;
      let net_hsn_summary = 0;

      res.forEach(function (val, index) {
        if (val.summary_name == "Net") {
          net_hsn_summary = +parseFloat(val.amount).toFixed(2) + +parseFloat(debitTransactions[i].taxAmount).toFixed(2)
          debit_net_hsn_summary_total += +net_hsn_summary
        } else {
          others_hsn_summary = parseFloat(val.amount).toFixed(2)
          debit_others_hsn_summary_total += +others_hsn_summary
        }
      })

      debitSubTotal += parseFloat(debitTransactions[i].amount);

      ledger_html += `
        <td>${debitTransactions[i].id}</td>
        <td>${debitTransactions[i].date}</td>
        <td>${debitTransactions[i].account} &nbsp&nbsp&nbsp<small> ${debitTransactions[i].narration}</small>
        </td>
        <td>${others_hsn_summary}</td>
        <td>${net_hsn_summary}</td>
        <td class='text-right'>${parseFloat(debitTransactions[i].amount).toFixed(2)}</td>`;
    } else {
      ledger_html += "<td></td><td></td><td></td><td></td><td></td><td></td>";
    }

    if (i < creditTransactionLength) {

      var res = hsn_summary.filter(x => (x.invoiceId === creditTransactions[i].invoice_id & x.type === creditTransactions[i].type));
      let others_hsn_summary = 0;
      let net_hsn_summary = 0;

      res.forEach(function (val, index) {
        if (val.summary_name == "Net") {
          net_hsn_summary = +parseFloat(val.amount).toFixed(2) + +parseFloat(creditTransactions[i].taxAmount).toFixed(2)
          credit_net_hsn_summary_total += +net_hsn_summary
        } else {
          others_hsn_summary = parseFloat(val.amount).toFixed(2)
          credit_others_hsn_summary_total += +others_hsn_summary
        }
      })

      creditSubTotal += parseFloat(creditTransactions[i].amount);

      ledger_html += `
        <td>${creditTransactions[i].id}</td>
        <td>${creditTransactions[i].date}</td>
        <td>${creditTransactions[i].account} &nbsp&nbsp&nbsp<small> ${creditTransactions[i].narration}</small></td>
        <td>${others_hsn_summary}</td>
        <td>${net_hsn_summary}</td>
        <td class='text-right'>${parseFloat(creditTransactions[i].amount).toFixed(2)}</td></tr>`;
    } else {
      ledger_html += "<td></td><td></td><td></td><td></td><td></td><td></td>";
    }
  }


  ledger_html += `
    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td>${parseFloat(debit_others_hsn_summary_total).toFixed(2)}</td>
    <td>${parseFloat(debit_net_hsn_summary_total).toFixed(2)}</td>
    <td class='text-right text-info'>${parseFloat(debitSubTotal).toFixed(2)}</td>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td>${parseFloat(credit_others_hsn_summary_total).toFixed(2)}</td>
    <td>${parseFloat(credit_net_hsn_summary_total).toFixed(2)}</td>
    <td class='text-right text-info'>${parseFloat(creditSubTotal).toFixed(2)}</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
        <td class='text-danger'>Closing Balance</td>
    <td></td>
    <td></td>
    <td class='text-right text-danger'>${parseFloat(closingBalance).toFixed(2)}</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
        <td class='text-danger'>Expected Closing Balance</td>
    <td></td>
    <td></td>
    <td class='text-right text-danger'>${parseFloat(closingBalanceExpected).toFixed(2)}</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
        <td class='text-info text-right'>Ledger Tally</td>
    <td></td>
    <td></td>
    <td class='text-right text-info'>${(parseFloat(openingBalance + debitSubTotal).toFixed(2))}</td>
    <td></td>
    <td></td>
        <td class='text-info text-right'>Ledger Tally</td>
    <td></td>
    <td></td>
    <td class='text-right text-info'>${(parseFloat(closingBalance + creditSubTotal).toFixed(2))}</td>
    </tr>

    </table>`;


  return ledger_html;

}

function show(startDate, endDate, partialStartDate, partialEndDate) {

  var ts = new Date().getTime();
  let url = `${apiURL}/reports/read.php?type=ledger&id=${$_GET('id')}&subType=${$_GET('subType')}&startDate=${startDate}&endDate=${endDate}&partialStartDate=${partialStartDate}&partialEndDate=${partialEndDate}$ts=${ts}`;
  $.getJSON(url, function (data) {  // Change Needed HERE

    debitSubTotal = 0;
    creditSubTotal = 0;

    debitSubTotalNet = 0;
    creditSubTotalNet = 0;

    creditTitle = "";
    debitTitle = "";

    if (data.netOffDate == "0") {
      netOffTitle = "<span class='text-danger'>* No Net Off Done Yet</span>";
    } else {
      netOffTitle = "<span class='text-danger'>* As of " + data.netOffDate + "</span>";
    }

    if ($_GET('subType') == 'DEBTORS') {
      creditTitle = "Sales Return / Payment Received";
      debitTitle = "Sales / Payment Made";
    } else if ($_GET('subType') == 'CREDITORS') {
      creditTitle = "Purchase / Payment Received";
      debitTitle = "Purchase Return / Payment Made";
    } else if ($_GET('subType') == 'JOBBER') {
      creditTitle = "Job Work / Payment Received";
      debitTitle = "Payment Made";
    } else if ($_GET('id') == 29) {
      creditTitle = "Payment Made";
      debitTitle = "Payment Received";
    } else {
      creditTitle = "Payment Received";
      debitTitle = "Payment Made";
    }

    read_html = `

<div class='row'>

  <ul class="nav nav-tabs">
    <li class = "active"><a data-toggle="tab" href="#ledger">Net Ledger ${netOffTitle} </a></li>
    <li><a data-toggle="tab" href="#fullledger">Full Transaction Ledger <span class='text-danger'> (${$.cookie("startDate")} - ${$.cookie("endDate")}) </span> </a></li>
    <li><a data-toggle="tab" href="#partialledger">Partial Transaction Ledger</a></li>
  </ul>

  <div class="tab-content">
    
    <div id="ledger" class="tab-pane fade in active"">
      ${get_ledger_html(creditTitle, debitTitle, data.openingBalanceNet, data.closingBalanceNet, data.closingBalanceNetExpected, data.debitTransactionsNet, data.creditTransactionsNet, data.hsn_summary)}
    </div>  

    <div id="fullledger" class="tab-pane fade">
      ${get_ledger_html(creditTitle, debitTitle, data.openingBalance, data.closingBalance, data.closingBalanceExpected, data.debitTransactions, data.creditTransactions, data.hsn_summary)}
    </div>

    <div id="partialledger" class="tab-pane fade">
      <BR>
      <div class='row readOnlyContent'>
        <div class='col-lg-2'>
          From : 
          <input type='date' id='startDate' name='startDate' value='${data.partialStartDate}' min='${startDate}' max='${endDate}' class='form-control pull-left m-b-15px'/>
        </div>

        <div class='col-lg-2'>
          To : 
          <input type='date' id='endDate' name='endDate' value='${data.partialEndDate}' min='${startDate}' max='${endDate}' class='form-control pull-left m-b-15px'/>
        </div>

        <div class='col-lg-6'><br>
          <div id='search' class='btn btn-success pull-leftm-b-15px search-button'>
            <span class='glyphicon glyphicon-search'></span> Search
          </div>
        </div>
      </div>

      <HR>
      ${get_ledger_html(creditTitle, debitTitle, data.openingBalancePartial, data.closingBalancePartial, data.closingBalancePartial, data.debitTransactionsPartial, data.creditTransactionsPartial, data.hsn_summary)}
    </div>
  </div>
</div>`;

    $("#page-content").html(read_html);
    changePageTitle(data.aliasName);  // Change Needed HERE

  });
}