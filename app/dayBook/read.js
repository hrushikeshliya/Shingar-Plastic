
    $(document).on('click', '.read-button', function(){
        show($.cookie('startDate'),$.cookie('endDate'));
    });

    $(document).on('click', '.search-button', function(){
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        show(startDate, endDate);
    });

function show(startDate, endDate){
    var params = "";
    
    if(startDate != "") {
        params += "&startDate="+startDate;
    }

    if(endDate != "") {
        params += "&endDate="+endDate;
    }

    $.getJSON(apiURL+"/transaction/read.php?type=dayBook"+params, function(data){  // Change Needed HERE
 
   
read_html="";

read_html+="<div class='row readOnlyContent'>";

    read_html+="<div class='col-lg-2'>";
    read_html+="From : ";
    read_html+="<input type='date' id='startDate' name='startDate' value='"+startDate+"' min='"+$.cookie('startDate')+"' max='"+$.cookie('endDate')+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-2'>";
    read_html+="To : ";
    read_html+="<input type='date' id='endDate' name='endDate' value='"+endDate+"'  min='"+$.cookie('startDate')+"' max='"+$.cookie('endDate')+"' class='form-control pull-left m-b-15px'/>";
    read_html+="</div>";

    read_html+="<div class='col-lg-6'><br>";
    read_html+="<div id='search' class='btn btn-success pull-leftm-b-15px search-button'>";
    read_html+="<span class='glyphicon glyphicon-search'></span> Search";
    read_html+="</div>";
    read_html+="</div>";
    
    read_html+=`
        <div class='col-lg-2'><br>
            <div id='print' class='btn btn-primary pull-right m-b-15px print-button'>
                <span class='glyphicon glyphicon-print'></span> Print
            </div>
        </div>
    `;
read_html+="</div>";

read_html+="<HR>";

read_html += `<div class="panel-group" id="accordion">`;

$.each(data.dayBook, function(key, val) {  // Change Needed HERE

read_html+="<div class='panel panel-default'>";

read_html+= `
    <div class="panel-heading">
        <h4 class="panel-title">
        Date : `+val.date+`
        </h4>
    </div>
    <div class="panel-body">
`;
 
    read_html+="<div class='col-sm-6'>";
        read_html+="<table class='table' frame = 'box'>";
            read_html+="<thead>";
                read_html+="<tr>";
                read_html+="<th></th>";
                read_html+="<th class='text-success'>Opening Balance</th>";
                read_html+="<th class='text-success'>"+parseFloat(val.openingBalance).toFixed(2)+"</th>";
                read_html+="</tr>";
            read_html+="</thead>";
            read_html+="<tbody>";

            count = 0;
            $.each(val.creditTransactions, function(key1, val1) {  // Change Needed HERE
                count +=1;
                read_html+="<tr>";
                read_html+="<td><button class='btn btn-xs btn-info update-button readOnlyContent' data-id='" + val1.id + "'>";
                read_html+="REC_"+val1.id+"";
                read_html+="</button></td>";
                read_html+="<td>"+val1.debitAccount+"&nbsp;&nbsp;&nbsp;<i><small> -"+val1.narration+"</small></i></td>";
                read_html+="<td>"+parseFloat(val1.amount).toFixed(2)+"</td>";
                read_html+="</tr>";

            });

            if(count>0) {
                // subTotal Row
                read_html+="<tr>";
                read_html+="<td></td>";
                read_html+="<td>SubTotal</td>";
                read_html+="<td  class='text-info'>"+parseFloat(val.creditTotal).toFixed(2)+"</td>";
                read_html+="</tr>";
            }
                // Grand Total
                read_html+="<tr>";
                read_html+="<td></td>";
                read_html+="<td></td>";
                read_html+="<td  class='text-info'>"+parseFloat((val.openingBalance+val.creditTotal)).toFixed(2)+"</td>";
                read_html+="</tr>";

            read_html+="</tbody>";
        read_html+="</table>";
    read_html+="</div>";

    read_html+="<div class='col-sm-6'>";
                read_html+="<table class='table' frame='box'>";
                read_html+="<tbody>";

                count = 0;
                $.each(val.debitTransactions, function(key1, val1) {  // Change Needed HERE
                    count +=1;
                    read_html+="<tr>";
                    read_html+="<td><button class='btn btn-xs btn-info update-button readOnlyContent' data-id='" + val1.id + "'>";
                    read_html+="PAY_"+val1.id+"";
                    read_html+="</button></td>";
                    read_html+="<td>"+val1.creditAccount+"&nbsp;&nbsp;&nbsp;<i><small> -"+val1.narration+"</small></i></td>";
                    read_html+="<td>"+parseFloat(val1.amount).toFixed(2)+"</td>";
                    read_html+="</tr>";
    
                });

                if(count>0) {
                // subTotal Row
                read_html+="<tr>";
                read_html+="<td></td>";
                read_html+="<td>SubTotal</td>";
                read_html+="<td  class='text-info'>"+parseFloat(val.debitTotal).toFixed(2)+"</td>";
                read_html+="</tr>";
                }

                // Closing Total
                read_html+="<tr>";
                read_html+="<td></td>";
                read_html+="<td class='text-danger'>Closing Balance</td>";
                read_html+="<td class='text-danger'>"+parseFloat(val.closingBalance).toFixed(2)+"</td>";
                read_html+="</tr>";

                // GrandTotal
                read_html+="<tr>";
                read_html+="<td></td>";
                read_html+="<td></td>";
                read_html+="<td  class='text-info'>"+parseFloat((val.openingBalance+val.creditTotal)).toFixed(2)+"</td>";
                read_html+="</tr>";

                read_html+="</tbody>";
        read_html+="</table>";
    read_html+="</div>";

read_html+="</div></div>";

count+= +1;
});

read_html += "</div>";
$("#page-content").html(read_html);
changePageTitle("Day Book Register");  // Change Needed HERE

}); 
}