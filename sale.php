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

<link href="app/assets/css/style.css" rel="stylesheet" />

</head>
<body>

<!-- our navBar will be injected here --> 
<div id="nav"></div>

<!-- our alerts will be injected here --> 
<div id="alert"></div>

<!-- our app will be injected here -->
<div id="app"></div>

<script src="app/assets/js/jquery.js"></script> 
<script src="app/assets/js/jquery.cookie.js"></script> 
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="app/assets/js/bootbox.min.js"></script>


<?php echo '<script src="app/app.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/navBar/createNavBar.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/sale/create.js' ."?ts=". time() . '"></script>'; ?>

<script>

    var items = 1;
    var subTotal = 0;
    var taxableAmount = 0;
    var taxAmount = 0;
    var grandTotal = 0;

    function getRate() {
        var id = $("#itemIdList option:selected").val();
                $.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){  
                    var rate = data.saleRate;
                    $("#itemRate").val(rate);
                });
                $("#quantity").val(1);
    }

    function getInvoiceId() {
        var id = $("#departmentId option:selected").val();
                $.getJSON("http://shingarplastic.com/api/department/read.php?id=" + id, function(data){  
                    $("#salesInvoiceId").val(data.department[0].billSeriesSales);
                });
    }

    function getBillLimit() {
        var id = $("#accountId").val();
                $.getJSON("http://shingarplastic.com/api/account/readOne.php?id=" + id, function(data){  
                    $("#billLimit").val(data.billLimit);
                });
    }

    function addItem() {    

            var selectedIndex = $("#itemIdList").prop("selectedIndex");    
            var quantity = $("#quantity").val();
            var itemNarration = $("#itemsNarration").val();
            var rate = $("#itemRate").val();

            if(quantity !=0 && selectedIndex != 0) {
                var id = $("#itemIdList option:selected").val();
                $.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){   // Change Needed HERE

                            var taxable = data.hsnSac == "7117" ? '*':'';
                            var amount = (rate * quantity)
                            subTotal += amount;

                            if(taxable == "*") {
                                taxableAmount += amount;
                            }

                            var markup = "<tr id='"+items+"'>";
                            
                            markup += "<td><input name='itemId' value='"+data.id+"' class='form-control' type='hidden'><input name='itemName' value='"+data.name+"' class='form-control' readOnly></td>";
                            markup += "<td><input name='itemNarration' value='"+itemNarration+"' class='form-control'></td>";
                            markup += "<td><input name='quantity' class='listQuantity' value='"+quantity+"' class='form-control' onkeyup=getBillAmount()></td>";
                            markup += "<td><input name='rate' class='listRate' value='"+rate+"' class='form-control' onkeyup=getBillAmount()></td>";
                            markup += "<td><input name='amount' class='listAmount' value='"+amount+"' class='form-control amount' readOnly></td>";
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
        taxableAmount = 0;

        for (i = 0; i < listLength; i++) { 
            var amount = $(".listQuantity").eq(i).val() * $(".listRate").eq(i).val();
            $(".listAmount").eq(i).val(amount);
            subTotal += amount;

            if($(".listTaxable").eq(i).val() == '*') {
                taxableAmount += $(".listQuantity").eq(i).val() * $(".listRate").eq(i).val();
            }
        }

              var tax = $("#tax option:selected").val();
              tax = tax=0? 0: tax/100;

              taxAmount = taxableAmount * tax;
              grandTotal = subTotal + taxAmount;

              $("#subTotal").val(subTotal);
              $("#taxableAmount").val(taxableAmount);
              $("#taxAmount").val(taxAmount);
              $("#grandTotal").val(grandTotal);
    }
</script>
    

</body>
</html>