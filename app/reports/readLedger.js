$(document).ready(function(){
    show();
});

function show(){
    $.getJSON("http://shingarplastic.com/api/reports/read.php?type=ledger&id="+$_GET('id')+"&subType="+$_GET('subType'), function(data){  // Change Needed HERE
 

debitSubTotal = 0;
creditSubTotal = 0;


creditTitle = "";
debitTitle = "";

if ($_GET('subType')=='DEBTORS') {
  creditTitle = "Sales Return / Payment Received";
  debitTitle = "Sales / Payment Made";
} else if ($_GET('subType')=='CREDITORS') {
  creditTitle = "Purchase / Payment Received";
  debitTitle = "Purchase Return / Payment Made";
} else if ($_GET('subType')=='JOBBER') {
  creditTitle = "Job Work / Payment Received";
  debitTitle = "Payment Made";
} else {
  creditTitle = "Payment Made";
  debitTitle = "Payment Received";
}


read_html="";

read_html+=`<div class='row'>

<ul class="nav nav-tabs">
  <li class="active"><a data-toggle="tab" href="#ledger">Ledger</a></li>
  <li><a data-toggle="tab" href="#fullledger">Full Transaction Ledger</a></li>
</ul>

<div class="tab-content">

<div id="ledger" class="tab-pane fade  in active">
<div class='col-md-6 well'>
<h4 class='text-center'>Debit</h4>
</div>
<div class='col-md-6 well'>
<h4 class='text-center'>Credit</h4>
</div>
</div>


  <div id="fullledger" class="tab-pane fade">
    <div class='col-md-6 well'>
    <h4 class='text-center'>`+debitTitle+`</h4>

    <table class='table'>
    <col width='100px'>
    <col width='100px'>
    <col width='*'>
    <col width='100px'>
    <tr>
    <td></td>
    <td></td>
    <td class='text-success'>Opening Balance</td>
    <td class='text-right text-success'>`+parseFloat(data.openingBalance).toFixed(3)+`</td>
    </tr>`;
    
    $.each(data.debitTransactions, function(key, val) { 
    
      debitSubTotal+=parseFloat(val.amount);

      read_html+="<tr>";
      read_html+="<td>"+val.id+"</td>";
      read_html+="<td>"+val.date+"</td>";
      read_html+="<td>"+val.account+"&nbsp&nbsp&nbsp<small>"+val.narration+"</small></td>";
      read_html+="<td class='text-right'>"+parseFloat(val.amount).toFixed(3)+"</td>";
      read_html+="</tr>";

    });

    read_html+=`

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td class='text-right text-info'>`+parseFloat(debitSubTotal).toFixed(3)+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Ledger Tally</td>
    <td class='text-right text-info'>`+(parseFloat(data.openingBalance+debitSubTotal).toFixed(3))+`</td>
    </tr>

    </table>

    </div>
    <div class='col-md-6 well'>
    <h4 class='text-center'>`+creditTitle+`</h4>

    <table class='table'>
    <col width='100px'>
    <col width='100px'>
    <col width='*'>
    <col width='100px'>
    `;
    
    $.each(data.creditTransactions, function(key, val) { 
    
      creditSubTotal+=parseFloat(val.amount);

      read_html+="<tr>";
      read_html+="<td>"+val.id+"</td>";
      read_html+="<td>"+val.date+"</td>";
      read_html+="<td>"+val.account+"&nbsp&nbsp&nbsp<small>"+val.narration+"</small></td>";
      read_html+="<td class='text-right'>"+parseFloat(val.amount).toFixed(3)+"</td>";
      read_html+="</tr>";

    });

    read_html+=`
    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td class='text-right text-info'>`+parseFloat(creditSubTotal).toFixed(3)+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-danger'>Closing Balance</td>
    <td class='text-right text-danger'>`+parseFloat(data.closingBalance).toFixed(3)+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Ledger Tally</td>
    <td class='text-right text-info'>`+(parseFloat(data.closingBalance+creditSubTotal).toFixed(3))+`</td>
    </tr>

    </table>

    </div>
  </div>

</div>

</div>`;

$("#page-content").html(read_html);
changePageTitle("User Ledger");  // Change Needed HERE

}); 
}