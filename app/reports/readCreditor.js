$(document).ready(function(){
    show();
});

function show(){
    $.getJSON("http://shingarplastic.com/api/reports/read.php?type=purchase", function(data){  // Change Needed HERE
 
read_html="";

read_html+="<div class='row'>";

read_html+="<table class='table table-striped table-bordered'>";
read_html+="    <thead>";
read_html+="      <tr>";
read_html+="        <th>Account Name</th>";
read_html+="        <th>Opening</th>";
read_html+="        <th>Nov</th>";
read_html+="        <th>Dec</th>";
read_html+="        <th>Jan</th>";
read_html+="        <th>Feb</th>";
read_html+="        <th>Mar</th>";
read_html+="        <th>Apr</th>";
read_html+="        <th>May</th>";
read_html+="        <th>Jun</th>";
read_html+="        <th>Jul</th>";
read_html+="        <th>Aug</th>";
read_html+="        <th>Sep</th>";
read_html+="        <th>Oct</th>";
read_html+="        <th>Closing</th>";
read_html+="     </tr>";
read_html+="   </thead>";

read_html+="   <tbody>";

$.each(data.reports, function(key, val) { 

payment = parseFloat(val.payment);
openingBalance = parseFloat(val.openingBalance);
november = parseFloat(val.november);
december = parseFloat(val.december);
january = parseFloat(val.january);
february = parseFloat(val.february);
march = parseFloat(val.march);
april = parseFloat(val.april);
may = parseFloat(val.may);
june = parseFloat(val.june);
july = parseFloat(val.july);
august = parseFloat(val.august);
september = parseFloat(val.september);
october = parseFloat(val.october);


if(openingBalance<0 && payment>=(openingBalance*-1) && payment!=0) {
    payment += openingBalance;
    openingBalance = 0;
} else if (openingBalance<0 && payment<(openingBalance*-1) && payment!=0) {
    openingBalance += payment;
    payment = 0;
}

if(november<0 && payment>=(november*-1) && payment!=0) {
    payment += november;
    november = 0;
} else if (november<0 && payment<(november*-1) && payment!=0) {
    november += payment;
    payment = 0;
}

if(december<0 && payment>=(december*-1) && payment!=0) {
    payment += december;
    december = 0;
} else if (december<0 && payment<(december*-1) && payment!=0) {
    december += payment;
    payment = 0;
}

if(january<0 && payment>=(january*-1) && payment!=0) {
    payment += january;
    january = 0;
} else if (january<0 && payment<(january*-1) && payment!=0) {
    january += payment;
    payment = 0;
}

if(february<0 && payment>=(february*-1) && payment!=0) {
    payment += february;
    february = 0;
} else if (february<0 && payment<(february*-1) && payment!=0) {
    february += payment;
    payment = 0;
}

if(march<0 && payment>=(march*-1) && payment!=0) {
    payment += march;
    march = 0;
} else if (march<0 && payment<(march*-1) && payment!=0) {
    march += payment;
    payment = 0;
}

if(april<0 && payment>=(april*-1) && payment!=0) {
    payment += april;
    april = 0;
} else if (april<0 && payment<(april*-1) && payment!=0) {
    april += payment;
    payment = 0;
}

if(may<0 && payment>=(may*-1) && payment!=0) {
    payment += may;
    may = 0;
} else if (may<0 && payment<(may*-1) && payment!=0) {
    may += payment;
    payment = 0;
}

if(june<0 && payment>=(june*-1) && payment!=0) {
    payment += june;
    june = 0;
} else if (june<0 && payment<(june*-1) && payment!=0) {
    june += payment;
    payment = 0;
}

if(july<0 && payment>=(july*-1) && payment!=0) {
    payment += july;
    july = 0;
} else if (july<0 && payment<(july*-1) && payment!=0) {
    july += payment;
    payment = 0;
}

if(august<0 && payment>=(august*-1) && payment!=0) {
    payment += august;
    august = 0;
} else if (august<0 && payment<(august*-1) && payment!=0) {
    august += payment;
    payment = 0;
}

if(september<0 && payment>=(september*-1) && payment!=0) {
    payment += september;
    september = 0;
} else if (september<0 && payment<(september*-1) && payment!=0) {
    september += payment;
    payment = 0;
}

if(october<0 && payment>=(october*-1) && payment!=0) {
    payment += october;
    october = 0;
} else if (october<0 && payment<(october*-1) && payment!=0) {
    october += payment;
    payment = 0;
}

read_html+="     <tr>";
read_html+="        <td>"+val.name+"</td>";
read_html+="        <td>"+openingBalance+"</td>";
read_html+="        <td>"+november+"</td>";
read_html+="        <td>"+december+"</td>";
read_html+="        <td>"+january+"</td>";
read_html+="        <td>"+february+"</td>";
read_html+="        <td>"+march+"</td>";
read_html+="        <td>"+april+"</td>";
read_html+="        <td>"+may+"</td>";
read_html+="        <td>"+june+"</td>";
read_html+="        <td>"+july+"</td>";
read_html+="        <td>"+august+"</td>";
read_html+="        <td>"+september+"</td>";
read_html+="        <td>"+october+"</td>";
read_html+="        <td>"+val.closingBalance+"</td>";
read_html+="     </tr>";

});

read_html+="   </tbody>";
read_html+="</table>";

read_html+="</div>";

$("#page-content").html(read_html);
changePageTitle("Supplier's Report");  // Change Needed HERE

}); 
}