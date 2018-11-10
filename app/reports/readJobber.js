$(document).ready(function(){
    show();
});

function show(){
    
    totalSale = 0;

    $.getJSON("http://shingarplastic.com/api/materialReceive/read.php?type=jobberReport", function(data){  // Change Needed HERE
 
        read_html="";

        currentItem = "";
        totalItemSale =0;
        read_html+="<div class='row'>";
        flag = false;

        $.each(data.materialRecieve, function(key, val) { 

            if(val.itemName != currentItem && currentItem != ""){
                currentItem = val.itemName;
                read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+totalItemSale+"</td>";
                read_html+="</table>";
                read_html+="</div>";
                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.itemName+"</td></tr>";

                totalItemSale = 0; 
            }
            if(val.itemName != currentItem && currentItem == ""){
                currentItem = val.itemName;
                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.itemName+"</td></tr>";

                totalItemSale = 0;
            }

            amount = parseFloat(val.quantity) * parseFloat(val.rate);
            totalItemSale += amount;
            totalSale += amount;


            read_html+="<tr><td>"+val.date+"</td>";
            read_html+="<td colspan=2>"+val.quantity+"x"+val.rate+"</td>";
            read_html+="<td>"+amount+"</td></tr>"

            flag = true;

        });

        if(flag){
            read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+totalItemSale+"</td>";
            read_html+="</table>";
            read_html+="</div>";
        }

        read_html+="</div>";
        read_html+="<h4 class='text-danger'>Total Job Work : "+totalSale+"</h4>";

        $("#page-content").html(read_html);
        changePageTitle("Job Report");  // Change Needed HERE

    }); 
}