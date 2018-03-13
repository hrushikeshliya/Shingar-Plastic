$(document).ready(function(){

var pageContent = "";

pageContent += "<div class='row'>";

pageContent += "<div class='col-sm-4'>";
pageContent += "	<h4 class='text-center'>Summary</h4>";
pageContent += "</div>";
pageContent += "<div class='col-sm-4'>";
pageContent += "	<img src='images/factory.jpg'>";
pageContent += "</div>";
pageContent += "<div class='col-sm-4'>";
pageContent += "	<h4 class='text-center'>Sales Summary</h4>";
pageContent += "</div>";



pageContent += "</div>";


$("#page-content").html(pageContent);
changePageTitle("Welcome To Shingar Plastic");
 
    
});