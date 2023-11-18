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
<?php echo '<script src="app/materialIssue/create.js' ."?ts=". time() . '"></script>'; ?>

<script>

var apiURL2 = "https://shingarplastic.com/api";

    function getRate() {
        var id = $("#itemId option:selected").val();
                $.getJSON(apiURL2+"/item/readOne.php?id=" + id+"&ts="+Math.random(), function(data){  
                    var rate = data.jobRate;
                    $("#jobRate").val(rate);
                });
    }

function getIssues() {
        var jobberId = $("#jobberId option:selected").val();

        $.getJSON(apiURL2+"/materialIssue/read.php?type=jobber&id=" + jobberId+"&ts="+Math.random(), function(data){ 

            $("#issuedMaterials").hide();

            if(data.materialIssue != undefined) {
                $("#issuedMaterials tr td").remove();
                $("#issuedMaterials").show();
                $.each(data.materialIssue, function(key, val) {
                var table = $("#issuedMaterials").addClass("CSSTableGenerator");
                var rowClass = "class='danger'";
                if(val.pendingQuantity != "0") {
                    var row = $("<tr "+rowClass+"><td>"+val.id+"</td><td>"+val.date+"</td><td>"+val.quantity+"</td><td>"+val.pendingQuantity+"</td><td>"+val.itemName+"</td></tr>");
                    table.append(row);
            };
                });
            } 
        });
    }
</script>

</body>
</html>