$(document).ready(function(){
 
    $(document).on('click', '.read-one-button', function(){

	var id = $(this).attr('data-id');
	var  materialReceiveDetail = "";
	var totalCharge = 0;
	var totalQuantity = 0;
	$.getJSON(apiURL+"/materialIssue/readOne.php?id=" + id+"&ts="+Math.random(), function(data){   // Change Needed HERE

	$.getJSON(apiURL+"/materialReceive/read.php?issueId="+id+"&ts="+Math.random(), function(data1){    // Change Needed HERE
		
		$.each(data1.materialReceive, function(key, val) {   // Change Needed HERE
			totalCharge += +val.jobCharge;
			totalQuantity += +val.quantity;
			materialReceiveDetail += "<tr><th>"+val.id+"</th><th>"+val.date+"</th><th>"+val.quantity+"</th><th>"+val.rate+"</th><th>"+parseFloat(val.jobCharge).toFixed(2)+"</th><th>"+val.username+"</th><th>"+val.narration+"</th></tr>";	 
		});
	 
		if(totalCharge != 0) {
			materialReceiveDetail += "<tr><th></th><th>TOTAL</th><th>"+totalQuantity+"</th><th></th><th>"+parseFloat(totalCharge).toFixed(2)+"</th><th></th><th></th></tr>";	 
		}

		var read_one_html="";
		
		read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
		    read_one_html+="<span class='glyphicon glyphicon-arrow-left'></span> Go Back";
		read_one_html+="</div>";
		

		read_one_html+="<table class='table table-bordered table-hover'>";
		 

		    read_one_html+="<tr>";
		        read_one_html+="<td>Id</td>";
		        read_one_html+="<td>" + data.id + "</td>";
		        read_one_html+="<td>Date</td>";
		        read_one_html+="<td>" + data.date + "</td>";
		    read_one_html+="</tr>";

		    read_one_html+="<tr>";
		        read_one_html+="<td>Jobber Name</td>";
				read_one_html+="<td>" + data.aliasName + "</td>";
				read_one_html+="<td>Item Name</td>";
		        read_one_html+="<td>" + data.itemName + "</td>";
		    read_one_html+="</tr>";			

		    read_one_html+="<tr>";
		        read_one_html+="<td>Issued Quantity</td>";
				read_one_html+="<td>" + data.quantity + "</td>";
				read_one_html+="<td>Pending Quantity</td>";
		        read_one_html+="<td>" + data.pendingQuantity + "</td>";
		    read_one_html+="</tr>";			

		    read_one_html+="<tr>";
		        read_one_html+="<td>Entry By</td>";
				read_one_html+="<td>" + data.username+ "</td>";
				read_one_html+="<td>Narration</td>";
				read_one_html+="<td>" + data.narration + "</td>";
		    read_one_html+="</tr>";			


		read_one_html+="</table>";
		
		read_one_html += "<HR>";

		read_one_html += "<h4>Material Receive Detail</h4>";

		read_one_html += "<table class='table table-hover table-responsive table-bordered'>";
		read_one_html += "<tr><th>Receive Id</th><th>Date</th><th>Quantity</th><th>Rate</th><th>Job Charge</th><th>Entry By</th><th>Narration</th></tr>";
		read_one_html += materialReceiveDetail;
		read_one_html += "</table>";
		
		$("#page-content").html(read_one_html);
		 
		changePageTitle("Material Issue Details");  // Change Needed HERE
	});

    });
});
});