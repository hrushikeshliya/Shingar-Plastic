$(document).ready(function(){
    show(); 
    $(document).on('click', '.read-button', function(){
    show();
});

});

function show(){
 
$.getJSON(apiURL+"/itemGroup/read.php?ts="+Math.random(), function(data){    // Change Needed HERE
 
 
read_html="";
 

read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";
read_html+="<input type='text' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search()' placeholder='Search'>";
read_html+="</div>";
read_html+="<div id='create' class='btn btn-success pull-right m-b-15px create-button'>";
read_html+="<span class='glyphicon glyphicon-plus'></span> Create Item Group";
read_html+="</div>";
read_html+="</div>";


read_html+="<table class='table table-bordered table-hover' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Item Group Name</th>";
        read_html+="<th class='text-align-center'>Raw Type</th>";
        read_html+="<th class='text-align-center'>Status</th>";
        read_html+="<th class='text-align-center'></th>";
    read_html+="</tr>";
     

$.each(data.itemGroup, function(key, val) {   // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.name + "</td>";
        read_html+="<td>" + val.rawType + "</td>";
        if(val.active == 0){
        	read_html+="<td class='text-danger'>InActive</td>"; 
        }else{
        	read_html+="<td class='text-success'>Active</td>"; 
        } 


        read_html+="<td class='text-right'>";

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
changePageTitle("Item Group Administration");  // Change Needed HERE
});
 
}