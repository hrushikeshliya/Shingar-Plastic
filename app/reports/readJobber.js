$(document).ready(function(){
    show($.cookie("startDate"),$.cookie("endDate"));

    $(document).on('click', '.search-button', function(){
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var itemId = $("#itemId").val();
        show(startDate, endDate, itemId);
    }); 
});

function show(startDate, endDate, itemId){
    
    var totalQty = 0;
    var totalAmt = 0;
    var params = "";

    if(startDate != "") {
        params += "&startDate="+startDate;
    }

    if(endDate != "") {
        params += "&endDate="+endDate;
    }

    if(itemId != undefined) {
        params += "&itemId="+itemId;
    }

    $.getJSON(apiURL+"/materialReceive/read.php?type=jobberReport"+params+"&ts="+Math.random(), function(data){  // Change Needed HERE
 
        read_html="";

        read_html+="<div class='row readOnlyContent'>";

        read_html+="<div class='col-lg-2'>";
        read_html+="From : ";
        read_html+="<input type='date' id='startDate' name='startDate' value='"+startDate+"'  min='"+$.cookie('startDate')+"' max='"+$.cookie('endDate')+"' class='form-control pull-left m-b-15px'/>";
        read_html+="</div>";
    
        read_html+="<div class='col-lg-2'>";
        read_html+="To : ";
        read_html+="<input type='date' id='endDate' name='endDate' value='"+endDate+"'  min='"+$.cookie('startDate')+"' max='"+$.cookie('endDate')+"' class='form-control pull-left m-b-15px'/>";
        read_html+="</div>";
        
        read_html+="<div class='col-lg-2'>";
        read_html+="Item Name :";
        read_html+="<select id='itemId' name='itemId' class='form-control pull-left m-b-15px'>";
        read_html+="<option></option>";
    
        $.getJSON(apiURL+"/item/read.php"+"?ts="+Math.random(), function(data4){    
            $.each(data4.item, function(key4, val4){
                if(itemId == val4.id) {
                    read_html += "<option value="+val4.id+" selected>"+val4.name+"</option>";
                } else {
                    read_html += "<option value="+val4.id+">"+val4.name+"</option>";
                }
                
            });
    
        read_html+="</select>";
        read_html+="</div>";
    
        read_html+="<div class='col-lg-2'><br>";
        read_html+="<div id='search' class='btn btn-success pull-left m-b-15px search-button'>";
        read_html+="<span class='glyphicon glyphicon-search'></span>";
        read_html+="</div>";
        read_html+="</div>";
    
        read_html+="<div class='col-lg-4'><br>";
        read_html+="<div id='print' class='btn btn-primary pull-right m-b-15px print-button'>";
        read_html+="<span class='glyphicon glyphicon-print'></span> Print";
        read_html+="</div>";
        read_html+="</div>";
    
    read_html+="</div>";

        currentItem = "";
        totalItemWork =0;
        count = 1

        $.each(data.materialReceive, function(key, val) { 

            if(count == 4) {
                count = 0;
            }

            if(val.name != currentItem && currentItem != ""){
                currentItem = val.name;
                read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+parseFloat(totalItemWork).toFixed(2)+"</td>";
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

                count+= +1;
            }

            if(val.itemName != currentItem && currentItem == ""){
                currentItem = val.name;
                read_html+="<div class='row'>";
                read_html+="<div class='col-md-3'>";
                read_html+="<table class='table table-bordered'>";
                read_html+="<tr><td colspan=4 class='text-center text-danger'>"+val.name+"</td></tr>";

                totalItemWork = 0;
                count+= +1;
            }

            amount = val.jobCharge;
            totalItemWork += +amount;

            totalQty += +val.quantity;
            totalAmt += +amount;

            read_html+="<tr><td>"+val.date+"</td>";
            read_html+="<td colspan=2>"+val.quantity+"x"+parseFloat(val.rate).toFixed(2)+"</td>";
            read_html+="<td>"+parseFloat(amount).toFixed(2)+"</td></tr>"

        });

            read_html+="<td colspan=3 class='text-right text-danger'>Total</td><td>"+parseFloat(totalItemWork).toFixed(2)+"</td>";
            read_html+="</table>";
            read_html+="</div>";
        read_html+="</div>";

        read_html+="<h5 class='text-danger m-l-15px'>Total Quantity : <span id='totalQty'></span> &nbsp;&nbsp;&nbsp;Total Amount : <span id='totalAmt'></span></h5>";
        read_html+="<HR>";

        $("#page-content").html(read_html);
        changePageTitle("Job Report");  // Change Needed HERE
        $("#totalQty").html(totalQty);
        $("#totalAmt").html(parseFloat(totalAmt).toFixed(2));
    }); 
});
}