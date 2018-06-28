$(document).ready(function(){
 
    $(document).on('click', '.delete-button', function(){
        
	var id = $(this).attr('data-id');

	bootbox.confirm({
	 
	    message: "<h4>Are you sure?</h4>",
	    buttons: {
	        confirm: {
	            label: '<span class="glyphicon glyphicon-ok"></span> Yes',
	            className: 'btn-danger'
	        },
	        cancel: {
	            label: '<span class="glyphicon glyphicon-remove"></span> No',
	            className: 'btn-primary'
	        }
	    },
	    callback: function (result) {
	        if(result==true){
		    $.ajax({
		        url: "http://shingarplastic.com/api/sale/delete.php",  // Change Needed HERE
		        type : "POST",
		        dataType : 'json',
		        data : JSON.stringify({ id: id }),
		        success : function(result) {
		            show();
		        },
		        error: function(xhr, resp, text) {
		            console.log(xhr, resp, text);
		        }
		    });
		 
		}
	    }
	});

    });
});