$(document).ready(function(){
    show("","");

    $(document).on('click', '.search-button', function(){
      var startDate = $("#startDate").val();
      var endDate = $("#endDate").val();
      show(startDate, endDate);
  });
});


function show(startDate, endDate){
 
var compare_dates = function(startDate,currentDate,endDate){
    if(startDate == "" && endDate == ""){
      return true;
    }
    if(startDate != "" && endDate == "" ){
      return (new Date(startDate)<=new Date(currentDate));
    }
    if(startDate == "" && endDate != "" ){
      return (new Date(currentDate)<=new Date(endDate));
    }
    if(startDate != "" && endDate != "" ){
      return ((new Date(startDate)<=new Date(currentDate)) && (new Date(currentDate)<=new Date(endDate)));
    }
}

$.getJSON(apiURL+"/reports/read.php?type=ledger&id="+$_GET('id')+"&subType="+$_GET('subType'), function(data){  // Change Needed HERE

debitSubTotal = 0;
creditSubTotal = 0;

debitSubTotalNet = 0;
creditSubTotalNet = 0;

creditTitle = "";
debitTitle = "";

if(data.netOffDate == "0") {
  netOffTitle = "<span class='text-danger'>* No Net Off Done Yet</span>";
} else {
  netOffTitle = "<span class='text-danger'>* As of "+data.netOffDate+"</span>";
}

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

classNet = "in active";
classPartial = "";

if(startDate != "" || endDate != ""){
  classNet = "";
  classPartial = "in active";
}

read_html="";

read_html+=`

<div class='row'>

  <ul class="nav nav-tabs">
    <li class="`+classNet+`"><a data-toggle="tab" href="#ledger">Net Ledger`+netOffTitle+`</a></li>
    <li><a data-toggle="tab" href="#fullledger">Full Transaction Ledger</a></li>
    <li class="`+classPartial+`"><a data-toggle="tab" href="#partialledger">Partial Transaction Ledger</a></li>
  </ul>

  <div class="tab-content">

    <div id="ledger" class="tab-pane fade `+classNet+`">`;

    read_html+=`

    <table class='table' rules='all'>
    <col width='80px'>
    <col width='90px'>
    <col width='150px'>
    <col width='100px'>

    <col width='80px'>
    <col width='90px'>
    <col width='150px'>
    <col width='100px'>

    <tr>
    <td colspan=4 class='text-center'>`+debitTitle+`</td>
    <td colspan=4 class='text-center'>`+creditTitle+`</td>
    </tr>  

    <tr>
    <td></td>
    <td></td>
    <td class='text-success'>Opening Balance</td>
    <td class='text-right text-success'>`+parseFloat(data.openingBalanceNet).toFixed(2)+`</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    `;

    debitTransactionLength = data.debitTransactionsNet.length;
    creditTransactionLength = data.creditTransactionsNet.length;

    console.log("NET");
    console.log("Debit : "+debitTransactionLength);
    console.log("Credit : "+creditTransactionLength);

    loopCount = debitTransactionLength>creditTransactionLength ? debitTransactionLength:creditTransactionLength;

    var i;
    debitSubTotalNet = 0;
    creditSubTotalNet = 0;

    for (i = 0; i < loopCount; i++) { 

      read_html+="<tr>";

        if(i<debitTransactionLength) {

          debitSubTotalNet  += parseFloat(data.debitTransactionsNet[i].amount);

          read_html+="<td>"+data.debitTransactionsNet[i].id+"</td>";
          read_html+="<td>"+data.debitTransactionsNet[i].date+"</td>";
          read_html+="<td>"+data.debitTransactionsNet[i].account+"&nbsp&nbsp&nbsp<small>"+data.debitTransactionsNet[i].narration+"</small></td>";
          read_html+="<td class='text-right'>"+parseFloat(data.debitTransactionsNet[i].amount).toFixed(2)+"</td>";
        } else {
          read_html+="<td></td><td></td><td></td><td></td>";
        }

        if(i<creditTransactionLength) {

          creditSubTotalNet += parseFloat(data.creditTransactionsNet[i].amount);

          read_html+="<td>"+data.creditTransactionsNet[i].id+"</td>";
          read_html+="<td>"+data.creditTransactionsNet[i].date+"</td>";
          read_html+="<td>"+data.creditTransactionsNet[i].account+"&nbsp&nbsp&nbsp<small>"+data.creditTransactionsNet[i].narration+"</small></td>";
          read_html+="<td class='text-right'>"+parseFloat(data.creditTransactionsNet[i].amount).toFixed(2)+"</td>";
          read_html+="</tr>";
        } else {
          read_html+="<td></td><td></td><td></td><td></td>";
        }
    }

    read_html+=`
    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td class='text-right text-info'>`+parseFloat(debitSubTotalNet).toFixed(2)+`</td>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Sub Total</td>
    <td class='text-right text-info'>`+parseFloat(creditSubTotalNet).toFixed(2)+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td class='text-danger'>Closing Balance</td>
    <td class='text-right text-danger'>`+parseFloat(data.closingBalanceNet).toFixed(2)+`</td>
    </tr>

    <tr>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Ledger Tally</td>
    <td class='text-right text-info'>`+(parseFloat(data.openingBalanceNet+debitSubTotalNet).toFixed(2))+`</td>
    <td></td>
    <td></td>
    <td class='text-info text-right'>Ledger Tally</td>
    <td class='text-right text-info'>`+(parseFloat(data.closingBalanceNet+creditSubTotalNet).toFixed(2))+`</td>
    </tr>

    </table>

    </div>
      
    <div id="fullledger" class="tab-pane fade">

      <table class='table'  rules='all'>
        <col width='80px'>
        <col width='90px'>
        <col width='150px'>
        <col width='100px'>
        
        <col width='80px'>
        <col width='90px'>
        <col width='150px'>
        <col width='100px'>
        

      <tr>
      <td colspan=4 class='text-center'>`+debitTitle+`</td>
      <td colspan=4 class='text-center'>`+creditTitle+`</td>
      </tr>  
      <tr>
      <td></td>
      <td></td>
      <td class='text-success'>Opening Balance</td>
      <td class='text-right text-success'>`+parseFloat(data.openingBalance).toFixed(2)+`</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      </tr>`;
      

    debitTransactionLength = data.debitTransactions.length;
    creditTransactionLength = data.creditTransactions.length;

    console.log("FULL");
    console.log("Debit : "+debitTransactionLength);
    console.log("Credit : "+creditTransactionLength);
    
    loopCount = debitTransactionLength>creditTransactionLength ? debitTransactionLength:creditTransactionLength;

    var i;
    debitSubTotal = 0;
    creditSubTotal = 0;

    for (i = 0; i < loopCount; i++) { 

      read_html+="<tr>";

        if(i<debitTransactionLength) {

          debitSubTotal  += parseFloat(data.debitTransactions[i].amount);

          read_html+="<td>"+data.debitTransactions[i].id+"</td>";
          read_html+="<td>"+data.debitTransactions[i].date+"</td>";
          read_html+="<td>"+data.debitTransactions[i].account+"&nbsp&nbsp&nbsp<small>"+data.debitTransactions[i].narration+"</small></td>";
          read_html+="<td class='text-right'>"+parseFloat(data.debitTransactions[i].amount).toFixed(2)+"</td>";
        } else {
          read_html+="<td></td><td></td><td></td><td></td>";
        }

        if(i<creditTransactionLength) {

          creditSubTotal += parseFloat(data.creditTransactions[i].amount);

          read_html+="<td>"+data.creditTransactions[i].id+"</td>";
          read_html+="<td>"+data.creditTransactions[i].date+"</td>";
          read_html+="<td>"+data.creditTransactions[i].account+"&nbsp&nbsp&nbsp<small>"+data.creditTransactions[i].narration+"</small></td>";
          read_html+="<td class='text-right'>"+parseFloat(data.creditTransactions[i].amount).toFixed(2)+"</td>";
          read_html+="</tr>";
        } else {
          read_html+="<td></td><td></td><td></td><td></td>";
        }
    }



      read_html+=`

      <tr>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Sub Total</td>
      <td class='text-right text-info'>`+parseFloat(debitSubTotal).toFixed(2)+`</td>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Sub Total</td>
      <td class='text-right text-info'>`+parseFloat(creditSubTotal).toFixed(2)+`</td>
      </tr>

      <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class='text-danger'>Closing Balance</td>
      <td class='text-right text-danger'>`+parseFloat(data.closingBalance).toFixed(2)+`</td>
      </tr>

      <tr>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Ledger Tally</td>
      <td class='text-right text-info'>`+(parseFloat(data.openingBalance+debitSubTotal).toFixed(2))+`</td>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Ledger Tally</td>
      <td class='text-right text-info'>`+(parseFloat(data.closingBalance+creditSubTotal).toFixed(2))+`</td>
      </tr>

      </table>
    </div>`;



    read_html += `
    <div id="partialledger" class="tab-pane fade `+classPartial+`">

    <BR>
    <div class='row readOnlyContent'>
    <div class='col-lg-2'>
      From : 
      <input type='date' id='startDate' name='startDate' value='`+startDate+`' class='form-control pull-left m-b-15px'/>
    </div>

    <div class='col-lg-2'>
      To : 
      <input type='date' id='endDate' name='endDate' value='`+endDate+`' class='form-control pull-left m-b-15px'/>
    </div>

    <div class='col-lg-6'><br>
      <div id='search' class='btn btn-success pull-leftm-b-15px search-button'>
      <span class='glyphicon glyphicon-search'></span> Search
      </div>
    </div>
</div>

<HR>

      <table class='table'  rules='all'>
        <col width='80px'>
        <col width='90px'>
        <col width='150px'>
        <col width='100px'>
        
        <col width='80px'>
        <col width='90px'>
        <col width='150px'>
        <col width='100px'>
        

      <tr>
      <td colspan=4 class='text-center'>`+debitTitle+`</td>
      <td colspan=4 class='text-center'>`+creditTitle+`</td>
      </tr>  
      <tr>
      <td></td>
      <td></td>
      <td class='text-success'>Opening Balance</td>
      <td class='text-right text-success'>`+parseFloat(data.openingBalance).toFixed(2)+`</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      </tr>`;
      

    debitTransactionLength = data.debitTransactions.length;
    creditTransactionLength = data.creditTransactions.length;

    console.log("PATIAL");
    console.log("Debit : "+debitTransactionLength);
    console.log("Credit : "+creditTransactionLength);
    
    loopCount = debitTransactionLength>creditTransactionLength ? debitTransactionLength:creditTransactionLength;

    var i;
    debitSubTotal = 0;
    creditSubTotal = 0;

    for (i = 0; i < loopCount; i++) { 
      read_html+="<tr>";

        if(i<debitTransactionLength) {

          currentDate = data.debitTransactions[i].date
          visible = compare_dates(startDate,currentDate,endDate);

          if(visible){
            debitSubTotal  += parseFloat(data.debitTransactions[i].amount);

            read_html+="<td>"+data.debitTransactions[i].id+"</td>";
            read_html+="<td>"+currentDate+"</td>";
            read_html+="<td>"+data.debitTransactions[i].account+"&nbsp&nbsp&nbsp<small>"+data.debitTransactions[i].narration+"</small> <span class='text-danger'>"+visible+"</span></td>";
            read_html+="<td class='text-right'>"+parseFloat(data.debitTransactions[i].amount).toFixed(2)+"</td>";
            } else {
              read_html+="<td></td><td></td><td></td><td></td>";    
            }
        } else {
          read_html+="<td></td><td></td><td></td><td></td>";
        }

        if(i<creditTransactionLength) {

          currentDate = data.creditTransactions[i].date
          visible = compare_dates(startDate,currentDate,endDate);

          if(visible){
          creditSubTotal += parseFloat(data.creditTransactions[i].amount);

          read_html+="<td>"+data.creditTransactions[i].id+"</td>";
          read_html+="<td>"+currentDate+"</td>";
          read_html+="<td>"+data.creditTransactions[i].account+"&nbsp&nbsp&nbsp<small>"+data.creditTransactions[i].narration+"</small> <span class='text-danger'>"+visible+"</span></td>";
          read_html+="<td class='text-right'>"+parseFloat(data.creditTransactions[i].amount).toFixed(2)+"</td>";
          read_html+="</tr>";
          } else {
            read_html+="<td></td><td></td><td></td><td></td>";
          }
        } else {
          read_html+="<td></td><td></td><td></td><td></td>";
        }
    }



      read_html+=`

      <tr>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Sub Total</td>
      <td class='text-right text-info'>`+parseFloat(debitSubTotal).toFixed(2)+`</td>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Sub Total</td>
      <td class='text-right text-info'>`+parseFloat(creditSubTotal).toFixed(2)+`</td>
      </tr>

      <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class='text-danger'>Closing Balance</td>
      <td class='text-right text-danger'>`+parseFloat(data.closingBalance).toFixed(2)+`</td>
      </tr>

      <tr>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Ledger Tally</td>
      <td class='text-right text-info'>`+(parseFloat(data.openingBalance+debitSubTotal).toFixed(2))+`</td>
      <td></td>
      <td></td>
      <td class='text-info text-right'>Ledger Tally</td>
      <td class='text-right text-info'>`+(parseFloat(data.closingBalance+creditSubTotal).toFixed(2))+`</td>
      </tr>

      </table>
    </div>


  </div>

</div>`;

$("#page-content").html(read_html);
changePageTitle(data.aliasName);  // Change Needed HERE

}); 
}