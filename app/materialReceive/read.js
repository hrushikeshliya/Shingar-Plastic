$(document).ready(function(){
    show(); 
    $(document).on('click', '.read-button', function(){
    show();
});

});

function show(){
 
$.getJSON("http://shingarplastic.com/api/materialReceive/read.php", function(data){    // Change Needed HERE
 
 
read_html="";
 
read_html+="<div class='row'>";
read_html+="<div class='col-md-4'>";
read_html+="<input type='text' list='accountNameList' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search()' placeholder='Search'>";
read_html+="<datalist id='accountNameList'>";
read_html+="</datalist>";read_html+="</div>";
read_html+="<a class='btn btn-success pull-right m-b-15px' href='./materialReceive.php'>";
read_html+="<span class='glyphicon glyphicon-th'></span> Material Receive"; // Change Needed HERE
read_html+="</a>";
read_html+="</div>";


read_html+="<table class='table table-bordered table-hover' id='myTable'>";
 
    read_html+="<tr>";
        read_html+="<th class='text-align-center'>ID</th>";
        read_html+="<th class='text-align-center'>Issue ID</th>";
        read_html+="<th class='text-align-center'>Date</th>";
        read_html+="<th class='text-align-center'>Jobber Name</th>";
        read_html+="<th class='text-align-center'>Item Name</th>";
        read_html+="<th class='text-align-center'>Issued Quantity</th>";
        read_html+="<th class='text-align-center'>Received Quantity</th>";
        read_html+="<th class='text-align-center'>Job Rate</th>";
        read_html+="<th class='text-align-center'>Job Charge</th>";
        read_html+="<th class='text-align-center'>Narration</th>";
        read_html+="<th class='text-align-center'>Jobber Summary </th>";
        read_html+="<th class='text-align-center'>Action</th>";
    read_html+="</tr>";
     

$.each(data.materialReceive, function(key, val) {   // Change Needed HERE
 	
        read_html+="<td>" + val.id + "</td>";
        read_html+="<td>" + val.issueId + "</td>";
        read_html+="<td>" + val.date + "</td>";
        read_html+="<td>" + val.aliasName + "</td>";
        read_html+="<td>" + val.itemName + "</td>";
        read_html+="<td>" + val.issuedQuantity + "</td>";
        read_html+="<td>" + val.quantity + "</td>";
        read_html+="<td>" + val.rate+ "</td>";
        read_html+="<td>" + val.jobCharge + "</td>";
        read_html+="<td>" + val.narration + "</td>";
        read_html+="<td class='text-danger'>Total Quantity : " + val.quantitySummary + "<BR>Total Job Charge : " + val.jobChargeSummary + "</td>";
        read_html+="<td align='center'>";

            read_html+="<button class='btn btn-primary m-r-10px m-b-10px read-one-button' data-id='" + val.issueId + "'>";
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
changePageTitle("Material Receive Register");  // Change Needed HERE

$.getJSON("http://shingarplastic.com/api/account/read.php?type=JOBBER", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.aliasName);
        dataList.append(opt);
    });
});

});
 
}