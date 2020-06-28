$(document).ready(function(){
    show();
    $(document).on('click', '.export-button', function(){
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var api = $(this).attr('data-api');

        $.getJSON(apiURL+"/"+api, function(data){ 
            JSONToCSVConvertor(data[data["exportKey"]],name,true);
        });

    });

});

function show(){
 
$.getJSON(apiURL+"/query/read.php"+"&ts="+Math.random(), function(data){  // Change Needed HERE
 
 
read_html="";

read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";
read_html+="<input class='form-control pull-left m-b-15px' id='myInput' onkeyup='search()' placeholder='Search'/>";
read_html+="</div>";
read_html+="<div class='col-md-4'>";
read_html+="";
read_html+="</div>";
read_html+="<div class='col-md-4'>";
read_html+="";
read_html+="</div>";
read_html+="</div>";

read_html+="<table class='table table-striped table-hover' id='myTable'>";
    read_html+="<col width=*>";
    read_html+="<col width='20px'>";
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>Particular</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.records, function(key, val) {  // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.name + "</td>";

        read_html+="<td>";

            read_html+="<button class='btn btn-primary m-r-10px m-b-10px export-button' data-name='"+val.name+"' data-api='"+val.api+"' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-export'></span> Export";
            read_html+="</button>";
 
        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";
$("#page-content").html(read_html);
changePageTitle("Export Data");  // Change Needed HERE
});
 
}