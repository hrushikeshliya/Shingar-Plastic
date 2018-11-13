$(document).ready(function(){
    show();
});

function show(){
    
    totalSale = 0;

    $.getJSON("http://shingarplastic.com/api/sale/read.php?type=saleReport", function(data){  // Change Needed HERE
 
        read_html="";

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
            totalSale +=amount;

            read_html+="<tr><td>"+val.date+"</td>";
            read_html+="<td colspan=2>"+val.quantity+"x"+val.rate+"</td>";
            read_html+="<td>"+parseFloat(amount).toFixed(3)+"</td></tr>"

        });

        read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+parseFloat(totalItemSale).toFixed(3)+"</td>";
        read_html+="</table>";

        read_html+="</div>";
        read_html+="</div>";
        read_html+="<h4 class='text-danger'>Total Sale : "+parseFloat(totalSale).toFixed(3)+"</h4>";

        $("#page-content").html(read_html);
        changePageTitle("Sale Report");  // Change Needed HERE

    }); 
}