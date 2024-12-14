$(document).ready(function(){
    show($.cookie("startDate"),$.cookie("endDate"));
});

function show(startDate, endDate){
    $.getJSON(`${apiURL}/reports/read.php?type=sale&startDate=${startDate}&endDate=${endDate}`, function(data){  // Change Needed HERE

read_html=`<div id="summaryGrid" style="height:80vh;width:100%;" class="ag-theme-balham"></div>`;

$("#page-content").html(read_html);

var summaryRowData = data.reports;

var summaryColumnDefs = [
    { headerName: "Alias Name", field: "aliasName", sortable: true, filter: true  },
    { headerName: "Account Name", field: "name", sortable: true, filter: true  },
    { headerName: "Opening", field: "openingBalance", sortable: true, filter: true, valueFormatter: currencyFormatter  },
    { headerName: "Nov", field: "november", sortable: true, filter: true , valueFormatter: currencyFormatter  },
    { headerName: "Dec", field: "december", sortable: true, filter: true, valueFormatter: currencyFormatter    },
    { headerName: "Jan", field: "january", sortable: true, filter: true, valueFormatter: currencyFormatter    },
    { headerName: "Feb", field: "february", sortable: true, filter: true, valueFormatter: currencyFormatter    },
    { headerName: "Mar", field: "march", sortable: true, filter: true, valueFormatter: currencyFormatter    },
    { headerName: "Apr", field: "april", sortable: true, filter: true , valueFormatter: currencyFormatter   },
    { headerName: "May", field: "may", sortable: true, filter: true , valueFormatter: currencyFormatter   },
    { headerName: "Jun", field: "june", sortable: true, filter: true  , valueFormatter: currencyFormatter  },
    { headerName: "Jul", field: "july", sortable: true, filter: true  , valueFormatter: currencyFormatter  },
    { headerName: "Aug", field: "august", sortable: true, filter: true  , valueFormatter: currencyFormatter  },
    { headerName: "Sep", field: "september", sortable: true, filter: true , valueFormatter: currencyFormatter   },
    { headerName: "Oct", field: "october", sortable: true, filter: true  , valueFormatter: currencyFormatter  },
    { headerName: "Closing", field: "closingBalance", sortable: true, filter: true , valueFormatter: currencyFormatter}
];

var summaryGridOptions = {
    columnDefs: summaryColumnDefs,
    defaultColDef: {
        flex: 1,
        resizable: true,
        cellStyle: function(params) {
            if (Math.floor(params.value).toFixed(2)<0) {
                return {color: 'white', backgroundColor: 'red'};
            } else  if (Math.floor(params.value).toFixed(2)>0) {
                return {color: 'white', backgroundColor: 'green'};
            }
        },
      },
    rowData: summaryRowData
};

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

var summaryGridDiv = document.querySelector('#summaryGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.createGrid(summaryGridDiv, summaryGridOptions);

var res = data.reports.map(bill => bill.closingBalance).reduce((acc, bill) => bill + acc);

changePageTitle(`Buyer's Report : Total Closing Balance ${res}`);  // Change Needed HERE


}); 
}