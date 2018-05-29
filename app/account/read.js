$(document).ready(function(){
    show(); 
    $(document).on('click', '.read-button', function(){
    show();
});

});

function show(){
 
$.getJSON("http://shingarplastic.com/api/account/read.php", function(data){  // Change Needed HERE
 
var openingDirection = "";
var currentDirection = "";

read_html="";

read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";
read_html+="<input type='text' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search()' placeholder='Search'>";
read_html+="</div>";
read_html+="<div id='create' class='btn btn-success pull-right m-b-15px create-button'>";
read_html+="<span class='glyphicon glyphicon-plus'></span> Create Account";
read_html+="</div>";
read_html+="</div>";

read_html+="<table class='table table-bordered table-hover' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Account Name</th>";
        read_html+="<th class='text-align-center'>Alias Name</th>";
        read_html+="<th class='text-align-center'>Account Type</th>";
        read_html+="<th class='text-align-center'>Opg Bal.</th>";
        read_html+="<th class='text-align-center'>Cur Bal.</th>";
        read_html+="<th class='text-align-center'>Ledger</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.account, function(key, val) {  // Change Needed HERE
    
    if(val.openingBalance >= 0) {
        openingDirection = "Cr";
    } else {
        openingDirection = "Dr";
    }
    
    if(val.currentBalance >= 0) {
        currentDirection = "Cr";
    } else {
        currentDirection = "Dr";
    }

    read_html+="<tr>";
 
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.name + "</td>";
        read_html+="<td>" + val.aliasName + "</td>";
        read_html+="<td>" + val.accountType + "</td>";
        read_html+="<td>" + Math.abs(val.openingBalance) + " "+openingDirection+"</td>";
        read_html+="<td>" + Math.abs(val.currentBalance) + " "+currentDirection+"</td>";
        read_html+="<td align='center'>";
        read_html+="<button class='btn btn-warning m-b-10px  ledger-button' data-id='" + val.id + "'>";
        read_html+="<span class='glyphicon glyphicon-list'></span>";
        read_html+="</button>";
        read_html+="</td>";

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
changePageTitle("Account Administration");  // Change Needed HERE
});
 
}