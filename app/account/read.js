$(document).ready(function(){
    show(); 
    
    $(document).on('click', '.read-button', function(){
    show();
    });

});

function show(){
 
$.getJSON(`${apiURL}/account/read.php?startDate=${$.cookie("startDate")}&endDate=${$.cookie("endDate")}`, function(data){  // Change Needed HERE

read_html=`

<div class='row'>
<div class='col-md-4'>
<input type='text' id='myInput' class='form-control pull-left m-b-15px' onkeyup='search()' placeholder='Search'>
</div>
<div id='create' class='btn btn-success pull-right m-b-15px create-button'>
<span class='glyphicon glyphicon-plus'></span> Create Account
</div>
</div>

<table class='table table-bordered table-hover' id='myTable'>
 
    <tr>
        <th class='text-align-center'>ID</th>
        <th class='text-align-center'>Alias Name</th>
        <th class='text-align-center'>Account Name</th>
        <th class='text-align-center'>Account Type</th>
        <th class='text-align-center'>Opg Bal. ${$.cookie('startDate')} </th>
        <th class='text-align-center'>Cur Bal. ${$.cookie('endDate')} </th>
        <th class='text-align-center'>Ledger</th>
        <th class='text-align-center'></th>
    </tr>`;
     

$.each(data.account, function(key, val) {  // Change Needed HERE
    
    read_html+=`<tr>
 
        <td>${val.id}</td>
        <td>${val.aliasName}</td>
        <td>${val.name}</td>
        <td>${val.accountType}</td>
        <td>${parseFloat(val.openingBalanceCurrent).toFixed(2)}</td>
        <td>${parseFloat(val.closingBalanceCurrent).toFixed(2)}</td>
        <td align='center'>
        <a class='btn btn-warning m-b-10px  ledger-button' target='_blank' href='../ledger.php?id=${val.id}&subType=${val.accountType}'>
        <span class='glyphicon glyphicon-list'></span>
        </a>
        </td>

        <td class='text-center'>

            <button class='btn btn-primary m-r-10px m-b-10px read-one-button' data-id='${val.id}'>
                <span class='glyphicon glyphicon-eye-open'></span>
            </button>
 
            <button class='btn btn-info m-r-10px  m-b-10px update-button' data-id='${val.id}'>
                <span class='glyphicon glyphicon-edit'></span>
            </button>
 
            <button class='btn btn-danger m-b-10px  delete-button' data-id='${val.id}'>
                <span class='glyphicon glyphicon-remove'></span>
            </button>
        </td>
 
    </tr>`;
 
});

read_html+="</table>";
$("#page-content").html(read_html);
changePageTitle("Account Administration");  // Change Needed HERE
});
 
}