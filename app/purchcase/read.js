$(document).ready(function(){
    show(); 
    $(document).on('click', '.read-button', function(){
    show();
});

});

function show(){
 
$.getJSON("http://shingarplastic.com/api/item/read.php", function(data){    // Change Needed HERE
 
 
read_html="";
 
read_html+="<div id='create' class='btn btn-success pull-right m-b-15px create-button'>";
read_html+="<span class='glyphicon glyphicon-plus'></span> Create Item"; // Change Needed HERE
read_html+="</div>";

read_html+="<table class='table table-bordered table-hover'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Item Name</th>";
        read_html+="<th class='text-align-center'>Item Group</th>";
        read_html+="<th class='text-align-center'>Pur Rate</th>";
        read_html+="<th class='text-align-center'>Sale Rate</th>";
        read_html+="<th class='text-align-center'>Req Wt</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.item, function(key, val) {   // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.name + "</td>";
        read_html+="<td>" + val.itemGroup + "</td>";
        read_html+="<td>" + val.purchaseRate + "</td>";
        read_html+="<td>" + val.saleRate + "</td>";
        read_html+="<td>" + val.itemWeight + "</td>";

        read_html+="<td align='center'>";

            read_html+="<button class='btn btn-primary m-r-10px m-b-10px read-one-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-eye-open'></span>";
            read_html+="</button>";
 
            read_html+="<button class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span>";
            read_html+="</button>";
 
            read_html+="<button class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span>";
            read_html+="</button>";
        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";

$("#page-content").html(read_html);
changePageTitle("Item Administration");  // Change Needed HERE
});
 
}