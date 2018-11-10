$(document).ready(function(){
    show();
});

function show(){
    $.getJSON("http://shingarplastic.com/api/reports/read.php?type=ledger&id="+$_GET('id'), function(data){  // Change Needed HERE
 

debitSubTotal = 0;
creditSubTotal = 0;

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
    <h4 class='text-center'>Debit</h4>

    <table class='table'>
    <col width='100px'>
    <col width='100px'>
    <col width='*'>
    <col width='100px'>
    <tr>
    <td></td>
    <td></td>
    <td class='text-success'>Opening Balance</td>
    <td class='text-right text-success'>`+data.openingBalance+`</td>
    </tr>`;
    
    $.each(data.debitTransactions, function(key, val) { 
    
      debitSubTotal+=parseFloat(val.amount);

      read_html+="<tr>";
      read_html+="<td>"+val.id+"</td>";
      read_html+="<td>"+val.date+"</td>";
      read_html+="<td>"+val.account+"&nbsp&nbsp&nbsp<small>"+val.narration+"</small></td>";
      read_html+="<td class='text-right'>"+val.amount+"</td>";
      read_html+="</tr>";

    });

    read_html+=`

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td class='text-right text-info'>`+debitSubTotal+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Ledger Tally</td>
    <td class='text-right text-info'>`+(parseFloat(data.openingBalance)+parseFloat(debitSubTotal))+`</td>
    </tr>

    </table>

    </div>
    <div class='col-md-6 well'>
    <h4 class='text-center'>Credit</h4>

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
      read_html+="<td class='text-right'>"+val.amount+"</td>";
      read_html+="</tr>";

    });

    read_html+=`
    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td class='text-right text-info'>`+creditSubTotal+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-danger'>Closing Balance</td>
    <td class='text-right text-danger'>`+data.closingBalance+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Ledger Tally</td>
    <td class='text-right text-info'>`+(parseFloat(data.closingBalance)+parseFloat(creditSubTotal))+`</td>
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