$(document).ready(function () {
    show();

    $(document).on('click', '.read-button', function () {
        show();
    });

});

function show() {

    var ts = new Date().getTime();
    $.getJSON(`${apiURL}/account/read.php?startDate=${$.cookie("startDate")}&endDate=${$.cookie("endDate")}$ts=${ts}`, function (data) {  // Change Needed HERE


        read_html = `
        
        <div class='row'>
        <div id='create' class='btn btn-success pull-right m-b-15px create-button'>
        <span class='glyphicon glyphicon-plus'></span> Create Account
        </div>
        </div>`

        read_html += `<div id="summaryGrid" style="height:80vh;width:100%;" class="ag-theme-balham"></div>`;

        $("#page-content").html(read_html);

        var summaryRowData = data.account;

        var summaryColumnDefs = [
            { headerName: "Id", field: "id", sortable: true, filter: true, width: 60 },
            { headerName: "Alias Name", field: "aliasName", sortable: true, filter: true },
            { headerName: "Account Name", field: "name", sortable: true, filter: true },
            { headerName: "Account Type", field: "accountType", sortable: true, filter: true },
            { headerName: "Opening", field: "openingBalanceCurrent", sortable: true, filter: true, valueFormatter: currencyFormatter },
            { headerName: "Closing", field: "closingBalanceCurrent", sortable: true, filter: true, valueFormatter: currencyFormatter },
            { headerName: "", field: "id", sortable: true, filter: true, cellRenderer: ledgerLinkRenderer, width: 45 },
            { headerName: "", field: "id", sortable: true, filter: true, cellRenderer: detailLinkRenderer, width: 45 },
            { headerName: "", field: "id", sortable: true, filter: true, cellRenderer: editLinkRenderer, width: 45 },
            { headerName: "", field: "id", sortable: true, filter: true, cellRenderer: deleteLinkRenderer, width: 45 },
        ];

        var summaryGridOptions = {
            columnDefs: summaryColumnDefs,
            defaultColDef: {
                resizable: true
            },
            rowData: summaryRowData,
            components: {
                customLoadingCellRenderer: CustomLoadingCellRenderer,
            },

            loadingCellRenderer: 'customLoadingCellRenderer',
            loadingCellRendererParams: {
                loadingMessage: 'One moment please...',
            },

            // fetch 100 rows per at a time
            cacheBlockSize: 100,

            // only keep 10 blocks of rows
            maxBlocksInCache: 10,

            animateRows: true,
            debug: true
        };

        function ledgerLinkRenderer(params) {
            return `
                <a class='btn btn-sm btn-warning ledger-button' target='_blank' href='../ledger.php?id=${params.data.id}&subType=${params.data.accountType}'>
                <span class='glyphicon glyphicon-list'></span>
                </a>
            `
        }

        var summaryGridDiv = document.querySelector('#summaryGrid');

        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.createGrid(summaryGridDiv, summaryGridOptions);

        changePageTitle("Account Administration");  // Change Needed HERE
    });

}