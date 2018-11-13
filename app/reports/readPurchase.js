$(document).ready(function(){
    show();
});

function show(){
    
    totalPurchase = 0;

    $.getJSON("http://shingarplastic.com/api/purchase/read.php?type=purchaseReport", function(data){  // Change Needed HERE
 
        read_html="";

        currentItem = "";
        totalItemPurchase =0;
        count = 1;

        $.each(data.purchase, function(key, val) { 

            if(count == 4) {
                count = 0;
            }

            if(val.itemName != currentItem && currentItem != ""){
                currentItem = val.itemName;
                read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+totalItemSale+"</td>";
                read_html+="</table>";
                read_html+="</div>";

                if(count == 1) {
                    read_html+="</div>";
                    read_html+="<div class='row'>";
                }

                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.itemName+"</td></tr>";

                totalItemPurchase = 0; 
                count+= +1;
            }
            if(val.itemName != currentItem && currentItem == ""){
                currentItem = val.itemName;
                read_html+="<div class='row'>";
                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.itemName+"</td></tr>";

                totalItemPurchase = 0;
                count+= +1;
            }

            amount = val.quantity * val.rate;
            totalItemPurchase += amount;
            totalPurchase +=amount;

            read_html+="<tr><td>"+val.date+"</td>";
            read_html+="<td colspan=2>"+val.quantity+"x"+val.rate+"</td>";
            read_html+="<td>"+amount+"</td></tr>"

        });

        read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+totalItemPurchase+"</td>";
        read_html+="</table>";
        read_html+="</div>";
        read_html+="</div>";
        read_html+="<h4 class='text-danger'>Total Purchase : "+totalPurchase+"</h4>";

        $("#page-content").html(read_html);
        changePageTitle("Purchase Report");  // Change Needed HERE

    }); 
}