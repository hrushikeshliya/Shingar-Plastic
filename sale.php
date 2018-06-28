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
    var total = 0;
    var discountAmount = 0;
    var taxableAmount = 0;
    var tax = 0;
    var totalAmount = 0;

    function addItem() {    

            var selectedIndex = $("#itemIdList").prop("selectedIndex");    
            var quantity = $("#quantity").val();

            if(quantity !=0 && selectedIndex != 0) {
                var id = $("#itemIdList option:selected").val();
                $.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){   // Change Needed HERE

                            var rate = data.saleRate;
                            var amount = (rate * quantity)
                            total += amount;
                            var markup = "<tr id='"+items+"'>";
                            markup += "<td><input name='itemId' value='"+data.id+"' class='form-control' type='hidden'><input name='itemName' value='"+data.name+"' class='form-control' readOnly></td>";
                            markup += "<td><input name='quantity' value='"+quantity+"' class='form-control' readOnly></td>";
                            markup += "<td><input name='rate' value='"+rate+"' class='form-control' readOnly></td>";
                            markup += "<td><input name='amount' value='"+amount+"' class='form-control amount' readOnly></td>";
                            markup += "<td><a onclick=deleteItem("+items+","+data.id+","+amount+") class='btn btn-danger'>Remove</a></td>";
                            markup += "</tr>";
                            $("#itemNameList").append(markup);
                            items++;

                            getBillAmount();
                    });  
                    $("#itemIdList option[value=" + id + "]").attr('disabled','disabled');
                    $("#itemIdList").prop("selectedIndex", 0);
                    $("#quantity").val(1);

            } else {
                if(selectedIndex == 0) {
                    $("#itemIdList").focus();
                } else {
                    $("#quantity").focus();
                }
            } 
    }
        
    function deleteItem(id,itemId,amount) {  
        $("#itemIdList option[value=" + itemId + "]").removeAttr('disabled');  
        $("#"+id).remove();
        total -= amount;
        items--;
        getBillAmount();
    }
    
    
    function getBillAmount() {
              var discount = $("#discount").val();
              var tax = $("#tax option:selected").val();
              tax = tax=0? 0: tax/100;
              var discountAmount = total*(discount/100);
              var taxableAmount = total - discountAmount;
              var taxAmount = taxableAmount * tax;
              var totalAmount = taxableAmount + taxAmount;

              $("#total").val(total);
              $("#discountAmount").val(discountAmount);
              $("#taxableAmount").val(taxableAmount);
              $("#taxAmount").val(taxAmount);
              $("#totalAmount").val(totalAmount);
    }
</script>
    

</body>
</html>