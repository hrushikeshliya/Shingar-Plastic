$(document).ready(function(){
    show();
});

function show(){
    
    totalWork = 0;

    $.getJSON("http://shingarplastic.com/api/materialReceive/read.php?type=jobberReport", function(data){  // Change Needed HERE
 
        read_html="";

        currentItem = "";
        totalItemWork =0;
        flag = false;
        count = 0

        $.each(data.materialReceive, function(key, val) { 

            count +=1;

            if(count == 5) {
                count = 1;
            }

            if(val.itemName != currentItem && currentItem != ""){
                currentItem = val.itemName;
                read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+totalItemWork+"</td>";
                read_html+="</table>";
                read_html+="</div>";

                if(count == 1) {
                    read_html+="</div>";
                    read_html+="<div class='row'>";
                }

                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.name+"</td></tr>";

                totalItemWork = 0; 
            }

            if(val.itemName != currentItem && currentItem == ""){
                currentItem = val.itemName;
                read_html+="<div class='row'>";
                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.name+"</td></tr>";

                totalItemWork = 0;
            }

            amount = val.jobCharge;
            totalItemWork += +amount;
            totalWork += +amount;


            read_html+="<tr><td>"+val.date+"</td>";
            read_html+="<td colspan=2>"+val.quantity+"x"+parseFloat(val.rate).toFixed(3)+"</td>";
            read_html+="<td>"+parseFloat(amount).toFixed(3)+"</td></tr>"

            flag = true;

        });

        if(flag){
            read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+parseFloat(totalItemWork).toFixed(3)+"</td>";
            read_html+="</table>";
            read_html+="</div>";
        }

        read_html+="</div>";
        read_html+="<h4 class='text-danger'>Total Job Work : "+parseFloat(totalWork).toFixed(3)+"</h4>";

        $("#page-content").html(read_html);
        changePageTitle("Job Report");  // Change Needed HERE

    }); 
}