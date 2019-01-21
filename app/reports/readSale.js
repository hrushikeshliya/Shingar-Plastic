$(document).ready(function(){
    show();
});

function show(){
    
    var totalQty = 0;
    var totalAmt = 0;

    $.getJSON("http://shingarplastic.com/api/sale/read.php?type=saleReport", function(data){  // Change Needed HERE
 
        read_html=`

        <div class= 'row readOnlyContent'>
        
            <div class='col-md-offset-10 col-lg-2'><br>
                <div id='print' class='btn btn-primary pull-right m-b-15px print-button'>
                <span class='glyphicon glyphicon-print'></span> Print
                </div>
            </div>

        </div>
        
        `;

        currentItem = "";
        totalItemSale = 0;
        count = 1;
        $.each(data.sale, function(key, val) { 

            if(count == 4) {
                count = 0;
            }

            if(val.itemName != currentItem && currentItem != ""){
                currentItem = val.itemName;
                read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+parseFloat(totalItemSale).toFixed(3)+"</td>";
                read_html+="</table>";
                read_html+="</div>";

                if(count == 1) {
                    read_html+="</div>";
                    read_html+="<div class='row'>";
                }

                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.itemName+"</td></tr>";

                totalItemSale = 0; 

                count+= +1;

            }

            if(val.itemName != currentItem && currentItem == ""){
                currentItem = val.itemName;
                read_html+="<div class='row'>";
                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.itemName+"</td></tr>";

                totalItemSale = 0;
                count+= +1;
            }

            amount = val.quantity * val.rate;
            totalItemSale += amount;

            totalQty += +val.quantity;
            totalAmt += +amount;
            
            read_html+="<tr><td>"+val.date+"</td>";
            read_html+="<td colspan=2>"+val.quantity+"x"+parseFloat(val.rate).toFixed(3)+"</td>";
            read_html+="<td>"+parseFloat(amount).toFixed(3)+"</td></tr>"

        });

        read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+parseFloat(totalItemSale).toFixed(3)+"</td>";
        read_html+="</table>";

        read_html+="</div>";
        read_html+="</div>";

        read_html+="<h5 class='text-danger m-l-15px'>Total Quantity : <span id='totalQty'></span> &nbsp;&nbsp;&nbsp;Total Amount : <span id='totalAmt'></span></h5>";
        read_html+="<HR>";

        $("#page-content").html(read_html);
        changePageTitle("Sale Report");  // Change Needed HERE
        $("#totalQty").html(totalQty);
        $("#totalAmt").html(parseFloat(totalAmt).toFixed(3));

    }); 
}