$(document).ready(function(){
    show(); 
    $(document).on('click', '.read-button', function(){
    show();
});

});

function show(){
 
$.getJSON("http://shingarplastic.com/api/materialIssue/read.php", function(data){    // Change Needed HERE
 
 
read_html="";
 
read_html+="<a class='btn btn-success pull-right m-b-15px' href='./materialIssue.php'>";
read_html+="<span class='glyphicon glyphicon-th'></span> Material Issue"; // Change Needed HERE
read_html+="</a>";

read_html+="<table class='table table-bordered table-hover'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Process Name</th>";
        read_html+="<th class='text-align-center'>Jobber Name</th>";
        read_html+="<th class='text-align-center'>Item Name</th>";
        read_html+="<th class='text-align-center'>Quantity</th>";
        read_html+="<th class='text-align-center'>Narration</th>";
        read_html+="<th class='text-align-center'>Entry By</th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.materialIssue, function(key, val) {   // Change Needed HERE
 	
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.processName + "</td>";
        read_html+="<td>" + val.aliasName + "</td>";
        read_html+="<td>" + val.itemName + "</td>";
        read_html+="<td>" + val.quantity + "</td>";
        read_html+="<td>" + val.narration + "</td>";
        read_html+="<td>" + val.username + "</td>";

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
changePageTitle("Material Issue Register");  // Change Needed HERE
});
 
}