$(document).ready(function(){
    showSelections();
    $(document).on('click', '.read-button', function(){
});

});

function showSelections(){
    read_html = "";
    read_html+="<form action='#'>";
    read_html+="<div class='row'>";
    read_html+="  <input type='date' name='from' class='form-control col-md-3'>";
    read_html+="  <input type='date' name='to' class='form-control col-md-3'>";
    read_html+="<button type='submit' class='btn btn-success col-md-3'>";
    read_html+="Submit";
    read_html+="</button>";
    read_html+="</div>";
    read_html+="</form>";
    $("#page-content").html(read_html);
    changePageTitle("Day Book Administration");  
}

function showContent(){

}

function show(){
 
$.getJSON("http://shingarplastic.com/api/accountType/read.php", function(data){  // Change Needed HERE
 
 
read_html="";
 
read_html+="<div id='create' class='btn btn-success pull-right m-b-15px create-button'>";
read_html+="<span class='glyphicon glyphicon-plus'></span> Create Account Type";
read_html+="</div>";

read_html+="<table class='table table-bordered table-hover'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Account Type</th>";
        read_html+="<th class='text-align-center'>Status</th>";
        read_html+="<th class='w-30-pct text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.accountType, function(key, val) {  // Change Needed HERE
 	
    read_html+="<tr>";
 
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.name + "</td>";
        if(val.active == 0){
        	read_html+="<td class='text-danger'>InActive</td>"; 
        }else{
        	read_html+="<td class='text-success'>Active</td>"; 
        } 


        read_html+="<td>";

            read_html+="<button style = 'width:90px;' class='btn btn-primary m-r-10px m-b-10px read-one-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
            read_html+="</button>";
 
            read_html+="<button style = 'width:90px;' class='btn btn-info m-r-10px  m-b-10px update-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
            read_html+="</button>";
 
            read_html+="<button style = 'width:90px;' class='btn btn-danger m-b-10px  delete-button' data-id='" + val.id + "'>";
                read_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
            read_html+="</button>";
        read_html+="</td>";
 
    read_html+="</tr>";
 
});

read_html+="</table>";
$("#page-content").html(read_html);
changePageTitle("Account Type Administration");  // Change Needed HERE
});
 
}