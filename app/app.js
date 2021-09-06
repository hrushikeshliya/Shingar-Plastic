//const apiURL = "http://shingarplastic.com.cp-in-14.webhostbox.net/api";
//const siteURL = "http://shingarplastic.com.cp-in-14.webhostbox.net/";

const apiURL = "http://shingarplastic.com/api";
const siteURL = "http://shingarplastic.com/";

$(document).ready(function () {

    // app html
    app_html = "";

    app_html += "<div class='container-fluid'>";

    app_html += "<div>";
    app_html += "<h3 id='page-title'>Loading...</h3><br>";

    app_html += "</div>";

    // this is where the contents will be shown.
    app_html += "<div id='page-content'></div>";

    app_html += "</div>";

    $("#app").html(app_html);

    app_nav = "<p class='text-center'>Loading...<p>";
    $("#nav").html(app_nav);
});

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function changePageTitle(page_title) {
    $('#page-title').text(page_title);
    document.title = page_title;
}

$(document).on('click', '.print-button', function () {
    $("#read").hide();
    $("#print").hide();
    $("#page-title").hide();
    $(".readOnlyContent").hide();
    window.print();
    $("#read").show();
    $("#print").show();
    $("#page-title").show();
    $(".readOnlyContent").show();
});

function inWords2(num) {

    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str + 'Rupees Only.';
}

function Rs(amount) {
    var words = new Array();
    words[0] = 'Zero'; words[1] = 'One'; words[2] = 'Two'; words[3] = 'Three'; words[4] = 'Four'; words[5] = 'Five'; words[6] = 'Six'; words[7] = 'Seven'; words[8] = 'Eight'; words[9] = 'Nine'; words[10] = 'Ten'; words[11] = 'Eleven'; words[12] = 'Twelve'; words[13] = 'Thirteen'; words[14] = 'Fourteen'; words[15] = 'Fifteen'; words[16] = 'Sixteen'; words[17] = 'Seventeen'; words[18] = 'Eighteen'; words[19] = 'Nineteen'; words[20] = 'Twenty'; words[30] = 'Thirty'; words[40] = 'Forty'; words[50] = 'Fifty'; words[60] = 'Sixty'; words[70] = 'Seventy'; words[80] = 'Eighty'; words[90] = 'Ninety'; var op;
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred And ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split(" ").join(" ");
    }
    return words_string;
}

function inWords(n) {
    nums = n.toString().split('.')
    var whole = Rs(nums[0])
    if (nums[1] == null) nums[1] = 0;
    if (nums[1].length == 1) nums[1] = nums[1] + '0';
    if (nums[1].length > 2) { nums[1] = nums[1].substring(2, length - 1) }
    if (nums.length == 2) {
        if (nums[0] <= 9) { nums[0] = nums[0] * 10 } else { nums[0] = nums[0] };
        var fraction = Rs(nums[1])
        if (whole == '' && fraction == '') { op = 'Zero only'; }
        if (whole == '' && fraction != '') { op = fraction + ' Paise Only'; }
        if (whole != '' && fraction == '') { op = whole + ' Rupees only'; }
        if (whole != '' && fraction != '') { op = whole + ' Rupees And ' + fraction + ' Paise Only'; }
        if (n > 999999999.99) { op = 'Oops!!! The amount is too big to convert'; }
        if (isNaN(n) == true) { op = 'Error : Amount in number appears to be incorrect. Please Check.'; }
        return op;
    }
}

function getJobCharge() {
    var quantity = $('#quantity').val();
    var jobRate = $('#rate').val();
    var jobCharge = quantity * jobRate;
    $('#jobCharge').val(parseFloat(jobCharge).toFixed(2));
}

// function To Export to csv
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        for (var index in arrData[0]) {
            row += index + ',';
        }

        row = row.slice(0, -1);

        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = ReportTitle.replace(/ /g, "_");

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//function to search through table

function search() {
    // Declare variables 
    var input, filter, table, tr, td, i, match;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
        match = 'false';
        for (j = 0; j < table.rows[i].cells.length; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    match = 'true';
                }
            }
        }
        if (match == 'true') {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function search2() {
    // Declare variables 
    var input, filter, table, tr, td, i, match;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
        match = 'false';
        for (j = 0; j < 1; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    match = 'true';
                }
            }
        }
        if (match == 'true') {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// ag-grid generic config
function currencyFormatter(params) {
    return '' + formatNumber(params.value);
}

function formatNumber(number) {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number).toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function deleteLinkRenderer(params) {

    return `
                    <button class='btn btn-sm btn-danger delete-button' data-id='${params.data.id}'>
                        <span class='glyphicon glyphicon-remove'></span>
                    </button>
            `
}

function detailLinkRenderer(params) {
    return `
                    <button class='btn btn-sm btn-info read-one-button' data-id='${params.data.id}'>
                        <span class='glyphicon glyphicon-eye-open'></span>
                    </button>
            `
}

function editLinkRenderer(params) {
    return `
                    <button class='btn btn-sm btn-primary update-button' data-id='${params.data.id}'>
                        <span class='glyphicon glyphicon-edit'></span>
                    </button>
            `
}

function CustomLoadingCellRenderer() { }

CustomLoadingCellRenderer.prototype.init = function (params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML =
        '<div class="ag-custom-loading-cell" style="padding-left: 10px; line-height: 25px;">' +
        '   <i class="fas fa-spinner fa-pulse"></i> <span>' +
        params.loadingMessage +
        ' </span>' +
        '</div>';
};

CustomLoadingCellRenderer.prototype.getGui = function () {
    return this.eGui;
};

$(document).on('keyup', "input[type=text]", function () {
    $(this).val(function (_, val) {
        return val.toUpperCase();
    });
});

// function to make form values to json format
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};