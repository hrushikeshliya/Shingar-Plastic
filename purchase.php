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

<!-- our alerts will be injected here --> 
<div id="alert"></div>

<!-- our app will be injected here -->
<div id="app"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script> 
<script src="app/assets/js/jquery.cookie.js"></script> 
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="app/assets/js/bootbox.min.js"></script>


<?php echo '<script src="app/app.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/navBar/createNavBar.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/purchase/create.js' ."?ts=". time() . '"></script>'; ?>

<script>

    var items = 1;
    var subTotal = 0;
    var grandTotal = 0;
    var apiURL2 = "http://shingarplastic.com.cp-in-14.webhostbox.net/api";

    function getRate() {
        var id = $("#itemIdList option:selected").val();
                $.getJSON(apiURL2+"/item/readOne.php?id=" + id, function(data){  
                    var rate = data.purchaseRate;
                    $("#itemRate").val(rate);
                });
                $("#quantity").val(1);
    }

    function getInvoiceId() {
        var id = $("#departmentId option:selected").val();
                $.getJSON(apiURL2+"/department/read.php?id=" + id, function(data){  
                    console.log('IN HERE : '+data.department[0].billSeriesPurchase);
                    $("#purchaseInvoiceId").val(data.department[0].billSeriesPurchase);
                });
    }

    function getBillLimit() {
        var id = $("#accountId").val();
                $.getJSON(apiURL2+"/account/readOne.php?id=" + id, function(data){  
                    //$("#billLimit").val(data.billLimit);
                });
    }

    function addItem() {    

        var selectedIndex = $("#itemIdList").prop("selectedIndex");    
        var quantity = $("#quantity").val();
        var itemNarration = $("#itemsNarration").val();
        var rate = $("#itemRate").val();

            if(quantity !=0 && selectedIndex != 0) {
                var id = $("#itemIdList option:selected").val();
                $.getJSON(apiURL2+"/item/readOne.php?id=" + id, function(data){   // Change Needed HERE

                            var taxable = '';
                            var amount = (rate * quantity)
                            subTotal += amount;

                            var markup = "<tr id='"+items+"'>";
                            markup += "<td><input name='itemId' value='"+data.id+"' class='form-control' type='hidden'><input name='itemName' value='"+data.name+"' class='form-control' readOnly></td>";
                            markup += "<td><input name='itemNarration' value='"+itemNarration+"' class='form-control'></td>";
                            markup += "<td><input type='number' name='quantity' value='"+quantity+"' class='form-control listQuantity' min=1 onkeyup=getBillAmount() onchange=getBillAmount()></td>";
                            markup += "<td><input type='number' name='rate' value='"+rate+"' class='form-control listRate' min=0.001 step=0.001 onkeyup=getBillAmount() onchange=getBillAmount()></td>";
                            markup += "<td><input name='amount' value='"+amount+"' class='form-control amount listAmount' readOnly></td>";
                            markup += "<td class='text-danger'><input type='hidden' class='listTaxable' value='"+taxable+"'>"+taxable+"</td>";
                            markup += "<td><a onclick=deleteItem("+items+") class='btn btn-danger'>Remove</a></td>";
                            markup += "</tr>";
                            $("#itemNameList").append(markup);
                            items++;

                            getBillAmount();
                    });  
                    
                    $("#itemIdList").prop("selectedIndex", 0);
                    $("#quantity").val(1);
                    $("#itemsNarration").val("");
                    $("#itemRate").val("");
            } else {
                if(selectedIndex == 0) {
                    $("#itemIdList").focus();
                } else {
                    $("#quantity").focus();
                }
            } 
    }
        
    function deleteItem(id) {  
        $("#"+id).remove();
        getBillAmount();
    }
    
    function getBillAmount() {

        var listLength = $(".listQuantity").length;
        subTotal = 0;

        for (i = 0; i < listLength; i++) { 
            var rate = parseFloat($(".listRate").eq(i).val()).toFixed(3);
            var amount = parseFloat($(".listQuantity").eq(i).val() * rate).toFixed(3);
            $(".listRate").eq(i).val(rate);
            $(".listAmount").eq(i).val(amount);
            subTotal += +amount;
        }

              grandTotal = parseFloat(subTotal).toFixed(3);

              $("#grandTotal").val(grandTotal);
    }
</script>
    

</body>
</html>