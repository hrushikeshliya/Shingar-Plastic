$(document).ready(function(){
    show();
});

function show(){
 
$.getJSON("http://shingarplastic.com/api/item/read.php", function(data){  // Change Needed HERE
 
 
read_html="";

read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";

read_html+="<label>";
read_html+="<input list='accountNameList' id='accountName' name='accountName' class='form-control pull-left m-b-15px' id='myInput' onkeyup='search()' placeholder='Search'/></label>";
read_html+="<datalist id='accountNameList'>";
read_html+="</datalist>";
read_html+="</div>";
read_html+="<div class='col-md-4'>";
read_html+="";
read_html+="</div>";
read_html+="<div class='col-md-4'>";
read_html+="";
read_html+="</div>";

read_html+="</div>";

read_html+="<table class='table table-striped table-hover' id='myTable'>";
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Item</th>";
        read_html+="<th class='text-align-center'>Item Group</th>";
        read_html+="<th class='text-align-center'>Sale Rate</th>";
        read_html+="<th class='text-align-center'>Purchase Rate</th>";
        read_html+="<th class='text-align-center'>Profit</th>";
    read_html+="</tr>";
     

$.each(data.item, function(key, val) {  // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.name + "</td>";
        read_html+="<td>" + val.itemGroup + "</td>";
        read_html+="<td>" + val.saleRate + "</td>";
        read_html+="<td>" + val.purchaseRate + "</td>";
        read_html+="<td>" + (((val.saleRate - val.purchaseRate) / val.purchaseRate)*100) + " % </td>";


 
    read_html+="</tr>";
 
});

read_html+="</table>";
$("#page-content").html(read_html);
changePageTitle("Price List");  // Change Needed HERE
});
 
}