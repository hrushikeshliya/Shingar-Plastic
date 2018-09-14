$(document).ready(function(){
    show();
});

function show(){
    $.getJSON("http://shingarplastic.com/api/transaction/read.php?type=dayBook", function(data){  // Change Needed HERE
 
   
read_html="";

read_html+="<div class='row'>";

read_html+="<table class='table table-striped table-bordered'>";
read_html+="    <thead>";
read_html+="      <tr>";
read_html+="        <th>Account Name</th>";
read_html+="        <th>Closing</th>";
read_html+="        <th>Oct</th>";
read_html+="        <th>Sep</th>";
read_html+="        <th>Aug</th>";
read_html+="        <th>Jul</th>";
read_html+="        <th>Jun</th>";
read_html+="        <th>May</th>";
read_html+="        <th>Apr</th>";
read_html+="        <th>Mar</th>";
read_html+="        <th>Feb</th>";
read_html+="        <th>Jan</th>";
read_html+="        <th>Dec</th>";
read_html+="        <th>Nov</th>";
read_html+="        <th>Opening</th>";
read_html+="     </tr>";
read_html+="   </thead>";
read_html+="   <tbody>";
read_html+="   </tbody>";
read_html+="</table>";

read_html+="</div>";

$("#page-content").html(read_html);
changePageTitle("Credit Report");  // Change Needed HERE

}); 
}