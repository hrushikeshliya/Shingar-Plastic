$(document).ready(function(){

    var monthlyTotal = 0;
    var yearlyTotal = 0;

$.getJSON(apiURL+"/sale/read.php?type=monthlySummary"+"&ts="+Math.random(), function(data){  

    $.getJSON(apiURL+"/sale/read.php?type=yearlySummary"+"&ts="+Math.random(), function(data2){  
    
        var pageContent = "";

        pageContent += "	<img src='images/factory.jpg' style='margin-left:25%; '>";
        
        pageContent += `
        <HR>
        <table class='table table-responsive table-bordered' style='margin-top:50px'>
        <tr>
        <td>Department</td>
        <td>Monthly Summary</td>
        <td>Yearly Summary <BR>(7th Nov 2018 - 31st Oct 2019)</td>
        </tr>
        `;

        // CHANGE IN QUERY AS WELL
        


        $.each(data.sale, function(key, val) {  
            $.each(data2.sale, function(key2, val2) {  
                if (val.departmentName == val2.departmentName) {
                    monthlyTotal += +parseFloat(val.netSale).toFixed(2);
                    yearlyTotal += +parseFloat(val2.netSale).toFixed(2);
                    pageContent += `
                    <tr>
                    <td>`+val.departmentName+`</td>
                    <td>`+parseFloat(val.netSale).toFixed(2)+`</td>
                    <td>`+parseFloat(val2.netSale).toFixed(2)+`</td>
                    </tr>
                    `;
                }
            });
        });
        pageContent += `

        <tr>
        <td>TOTAL</td>
        <td>`+parseFloat(monthlyTotal).toFixed(2)+`</td>
        <td>`+parseFloat(yearlyTotal).toFixed(2)+`</td>
        </tr>
        </table>

        `;

    $("#page-content").html(pageContent);
    });
});



changePageTitle("Welcome To Shingar Plastic");
 
});