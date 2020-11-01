$(document).ready(function(){

var currentHeading = ""; 
var navList = "";
var date=new Date();
var username = $.cookie('username');

	$.getJSON(apiURL+"/navBar/read.php?username="+username+"&ts="+Math.random(), function(data){
		$.each(data.navBar, function(key, val){
			$.each(val.navGroup, function(key2, val2){
				if (currentHeading != val2.heading) {
					currentHeading = val2.heading;
					if (navList != ""){
						navList += "	</ul>";
						navList += "</li>";
					}
					navList += "<li class='dropdown'>";
					navList += "	<a class='dropdown-toggle' data-toggle='dropdown' href='#'>"+currentHeading+" <span class='caret'></span></a>";
					navList += "<ul class='dropdown-menu'>";
				}
				
				navList += "<li><a href='"+val2.url+"'>"+val2.name+"</a></li>";
			});
		});


	var create_html="";

	create_html += "<nav class='navbar navbar-inverse'>";
	create_html += "  <div class='container-fluid'>";
	create_html += "    <div class='navbar-header'>";
	create_html += "      <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>";
	create_html += "        <span class='icon-bar'></span>";
	create_html += "        <span class='icon-bar'></span>";
	create_html += "        <span class='icon-bar'></span>";                       
	create_html += "      </button>";
	create_html += "      <a class='navbar-brand' href='../home.php'>SP</a>";
	create_html += "    </div>";
	create_html += "    <div class='collapse navbar-collapse' id='myNavbar'>";
	create_html += "      <ul class='nav navbar-nav'>";
	create_html +=         navList;
	create_html += "      </ul>";;
	create_html += "      <li class='text-center'><a style='color:red !important'>Financial Year : "+ $.cookie('financialYear')  +"<BR>"+$.cookie('startDate') +" : "+$.cookie('endDate') +"</a></li>";
	create_html += "      <li><a>Date : "+ date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(); +"</a></li>";
	create_html += "      <li><a>User : "+$.cookie('username');+"</a></li>";
	create_html += "      <li><a href='index.php'><span class='glyphicon glyphicon-log-out'></span> Logout</a></li>";
	create_html += "    </div>";
	create_html += "  </div>";
	create_html += "</nav>";

	$("#nav").html(create_html);
	});
});