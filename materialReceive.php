<?php
        session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
 
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
 
    <title>Shingar Plastic</title>

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
 
    <link href="app/assets/css/style.css?<?php echo date('l jS \of F Y h:i:s A'); ?>" rel="stylesheet" />
</head>
<body>
 
<!-- our navBar will be injected here --> 
<div id="nav"></div>

<!-- our app will be injected here -->
<div id="app"></div>
 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script> 
<script src="app/assets/js/jquery.cookie.js"></script> 
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="app/assets/js/bootbox.min.js"></script>
 

<?php echo '<script src="app/app.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/navBar/createNavBar.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/materialReceive/create.js' ."?ts=". time() . '"></script>'; ?>

<script>
    
    function getIssues() {
        var jobberId = $("#jobberId option:selected").val();

        $('#issueId')
        .empty();
        $('#selectedIssue').val("");
        $('#issuedQuantity').val("");
        $('#pendingQuantity').val("");
        $('#quantity').val("");
        $('#rate').val("");
        $('#jobCharge').val("");

        $.getJSON("http://shingarplastic.com/api/materialIssue/read.php?type=jobber&id=" + jobberId, function(data){ 

            if(data.materialIssue != undefined) {
                $('#issueId')
                .append($("<option></option>")
                .attr("value","")
                .text("Id => Date |Issued Quantity (Psc) |Pending Quantity (Psc) | Item Name"));
            } else {
                $('#issueId')
                .append($("<option></option>")
                .attr("value","")
                .text("No Material Issued To Selected Jobber"));
            }
            $.each(data.materialIssue, function(key, val) {
                if(val.pendingQuantity != 0) {
                    $('#issueId')
                    .append($("<option></option>")
                    .attr("value",val.id)
                    .text(val.id+" => "+val.date+" | "+val.quantity+"(Psc) | "+val.pendingQuantity+"(Psc) | "+val.itemName));
                }
                });
                
        });
    }
    
    function getStats() {
        var issueId =  $("#issueId option:selected").val();

        $.getJSON("http://shingarplastic.com/api/materialIssue/readOne.php?id=" + issueId, function(data){ 
            $('#selectedIssue').val(issueId);
            $('#issuedQuantity').val(data.quantity);
            $('#pendingQuantity').val(data.pendingQuantity);
            $('#rate').val(parseFloat(data.jobRate).toFixed(3));
            $('#quantity')
            .attr("max",data.pendingQuantity)
            .val("");
            $('#jobCharge').val("");
        });
    }
</script>

</body>
</html>