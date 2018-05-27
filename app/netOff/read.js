$(document).ready(function(){
    show(); 

    $("#netOffAmt").keyup(function(){
        calculateJVAmt();
    });

    $("#netOffAmt").change(function(){
        calculateJVAmt();
    });

    $("#date").change(function(){
        getCurrentBalance();
    });

    $("#accountName").change(function(){
        getCurrentBalance();
    });
});


function calculateJVAmt() {
    var currentBalance = $("#currentBalance").val();
    var netOffAmt = $("#netOffAmt").val();
   $("#jvAmt").val(currentBalance-netOffAmt);
}

function getCurrentBalance() {
    var accountName = $("#accountName").val();
    var date = $("#date").val();
    console.log("Get Current Balance For : "+accountName+" : As Of : "+date);
    $("#currentBalance").val(100);
    $("#netOffAmt").val(100);
}

function show(){

    var accountName_options = "";
    update_html = "";

    accountName_options += "<input list='accountNameList' id='accountName' name='accountName' class='form-control pull-left m-b-15px' placeholder='Search' autocomplete='off'/></label>";
    accountName_options += "<datalist id='accountNameList'>";
    accountName_options += "</datalist>";

    update_html+="<form id='update-form' action='#' method='post' border='0'>";
        update_html+="<table class='table table-bordered table-hover'>";

        update_html+="<tr>";
            update_html+="<td class='text-align-right'>Account Name</th>";
            update_html+="<td class='text-align-left'>"+accountName_options+"</td>";
        update_html+="</tr>";
        
        update_html+="<tr>";
            update_html+="<td class='text-align-right'>Date</th>";
            update_html+="<td class='text-align-left'><input type='date' id='date' name='date' class='form-control' required /></td>";
        update_html+="</tr>";

        update_html+="<tr>";
            update_html+="<td class='text-align-right'>Current Balance</th>";
            update_html+="<td class='text-align-left'><input value='0' type='number' id='currentBalance' name='currentBalance' class='form-control' required disabled/></td>";
        update_html+="</tr>";

        update_html+="<tr>";
            update_html+="<td class='text-align-right'>Net Off Balance</th>";
            update_html+="<td class='text-align-left'><input value='0' type='number' id='netOffAmt' name='netOffAmt' class='form-control' required /></td>";
        update_html+="</tr>";

        update_html+="<tr>";
            update_html+="<td class='text-align-right'>J/V Amount</th>";
            update_html+="<td class='text-align-left'><input value='0' type='number' id='jvAmt' name='jvAmt' class='form-control' required disabled/></td>";
        update_html+="</tr>";

        update_html+="<tr>"
        update_html+="<td colspan = '2' class = 'text-align-center'>";
            update_html+="<button type='submit' class='btn btn-info'>";
                update_html+="<span class='glyphicon glyphicon-edit'></span> Update";
            update_html+="</button>";
        update_html+="</td>";
        update_html+="<tr>"

        update_html+="</table>";

    update_html+="</form>";

$.getJSON("http://shingarplastic.com/api/account/read.php", function(data){

    var dataList = $("#accountNameList");
    dataList.empty();

	$.each(data.account, function(key, val){
        var opt = $("<option></option>").attr("value", val.name);
        dataList.append(opt);
    });
});
    

$("#page-content").html(update_html);
changePageTitle("Net Off");  // Change Needed HERE


$(document).on('submit', '#update-form', function(){
	
    var form_data=JSON.stringify($(this).serializeObject());
    
    $.ajax({
        url: "http://shingarplastic.com/api/netOff/update.php",  // Change Needed HERE
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            show();
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
    return false;
});

}