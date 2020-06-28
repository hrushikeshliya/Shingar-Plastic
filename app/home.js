$(document).ready(function () {

    $.getJSON(apiURL + "/sale/read.php?type=summary&financialYear="+$.cookie('financialYear'), function (data) {

        $.getJSON(apiURL + "/transaction/readInvalid.php", function (data2) {

            var pageContent = "";

            pageContent += `
            <img src='images/factory.jpg' style='margin-left:25%; width:50%; height:350px;'>
            <div id="summaryGrid" style="height: 150px;width:100%; margin-top:50px;" class="ag-theme-balham"></div>
            <div class='text-danger' style="margin-top:10px;">*Following Account Name Ledger's Have Error Kindly Edit & select Actual Account Name From Daybook</div>
            <div id="invalidGrid" style="height: 150px;width:100%; margin-top:10px;" class="ag-theme-balham"></div>`;

            $("#page-content").html(pageContent);

            var summaryRowData = data.sale;

            var summaryColumnDefs = [
                { headerName: "Department", field: "departmentName" },
                { headerName: "Monthly Summary", field: "monthlySummary" },
                { headerName: "Yearly Summary", field: "yearlySummary" }
            ];

            var summaryGridOptions = {
                columnDefs: summaryColumnDefs,
                rowData: summaryRowData
            };

            var invalidRowData = data2.transaction;

            var invalidColumnDefs = [
                { headerName: "Id", field: "id" },
                { headerName: "Date", field: "date" },
                { headerName: "Type", field: "type" },
                { headerName: "Debit Account", field: "debitAccountName" },
                { headerName: "Credit Account", field: "creditAccountName" },
                { headerName: "Narration", field: "narration" },
                { headerName: "Amount", field: "amount" },
                { headerName: "Entry By", field: "username" }
            ];

            var invalidGridOptions = {
                columnDefs: invalidColumnDefs,
                rowData: invalidRowData
            };

            // lookup the container we want the Grid to use
            var invalidGridDiv = document.querySelector('#invalidGrid');
            var summaryGridDiv = document.querySelector('#summaryGrid');

            // create the grid passing in the div to use together with the columns & data we want to use
            new agGrid.Grid(invalidGridDiv, invalidGridOptions);
            new agGrid.Grid(summaryGridDiv, summaryGridOptions);
        });
    });

    changePageTitle("Welcome To Shingar Plastic");

});