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
<?php echo '<script src="app/saleReturn/create.js' ."?ts=". time() . '"></script>'; ?>

<script>
    
    var items = 1;
    var total = 0;
    var totalAmount = 0;
    var currentMaxLimit = 0;

    function getInvoiceId() {
        var accountId = $("#accountId option:selected").val();
        $('#invoiceId')
        .empty()
        .append($("<option>Select Invoice Id</option>")
        .attr("value",""));

        $.getJSON("http://shingarplastic.com/api/sale/read.php?type=distinctInvoiceId&id=" + accountId, function(data){ 
            $.each(data.sale, function(key, val) {
 
                var d = new Date(val.date);
                var n = d.getFullYear();

                $('#invoiceId')
                .append($("<option></option>")
                .attr("value",val.id)
                .text(val.billCode + "/"+val.invoiceId+"/"+ n +"/"+(n+1)));
                    });
                
        });
    }
    
    function getInvoiceItems() {
        var invoiceId = $("#invoiceId option:selected").val();
        $('#itemIdList')
        .empty()
        .append($("<option>Select Return Item [Returnable Quantity] </option>")
        .attr("value",""));


        $.getJSON("http://shingarplastic.com/api/invoiceDetail/read.php?type=sale&id=" + invoiceId, function(data){ 
            $.each(data.invoiceDetail, function(key, val) {
                $('#itemIdList')
                .append($("<option></option>")
                .attr("value",val.id+"|"+val.itemId+"|"+(val.quantity-val.returnQuantity)+"|"+val.rate)
                .text(val.itemName+" ["+(val.quantity-val.returnQuantity)+" Pcs]"));

                $("#returnId").val(val.billSeriesSalesReturn);
                $("#departmentId").val(val.departmentId);

                    });
        });
    }

    function setQuantityLimit() {
        var quantity = $("#itemIdList option:selected").val().split("|")[2];
         $('#quantity')
                .attr("value",quantity);
                currentMaxLimit = quantity;
    }

    function validateQuantity() {
        var quantity = $("#quantity").val();
        if(parseInt(quantity)>parseInt(currentMaxLimit)) {
            $("#quantity").val(currentMaxLimit);
            alert("Value Cannot Exceed Than Pending Quantity : "+currentMaxLimit);
        }
        
    }

    function addItem() {    

            var selectedIndex = $("#itemIdList").prop("selectedIndex");
            var maxQuantity = $("#itemIdList option:selected").val().split("|")[2];

            var quantity = $("#quantity").val();

            if(quantity !=0 && selectedIndex != 0) {
                var detailId = $("#itemIdList option:selected").val().split("|")[0];
                var id = $("#itemIdList option:selected").val().split("|")[1];
                var rate = $("#itemIdList option:selected").val().split("|")[3];

                $.getJSON("http://shingarplastic.com/api/item/readOne.php?id=" + id, function(data){   // Change Needed HERE

                            var amount = (rate * quantity) 
                            total += amount;
                            var markup = "<tr id='"+items+"'>";
                            markup += "<td><input name='detailId' value='"+detailId+"' class='form-control' type='hidden'><input name='itemId' value='"+data.id+"' class='form-control' type='hidden'><input name='itemName' value='"+data.name+"' readOnly></td>";
                            markup += "<td><input name='quantity' class='listQuantity form-control' onkeyup=getBillAmount() value='"+quantity+"' type='number' min='1' max='"+maxQuantity+"'></td>";
                            markup += "<td><input name='rate' class='listRate form-control' value='"+rate+"' readOnly></td>";
                            markup += "<td><input name='amount' value='"+amount+"' class='form-control listAmount' readOnly></td>";
                            markup += "<td><a onclick=deleteItem("+items+","+selectedIndex+") class='btn btn-danger'>Remove</a></td>";
                            markup += "</tr>";
                            $("#itemNameList").append(markup);
                            items++;

                            getBillAmount();
                    });  

                    $("#itemIdList option:selected").attr('disabled','disabled');
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
        
    function deleteItem(id,index) {  
        $("#itemIdList").prop("selectedIndex", index);
        $("#itemIdList option:selected").removeAttr('disabled'); 
        $("#"+id).remove();
        getBillAmount();
    }
    
    function getBillAmount2() {
              var totalAmount = total;
              $("#totalAmount").val(totalAmount);
    }

    function getBillAmount() {
        var listLength = $(".listQuantity").length;
        subTotal = 0;

        for (i = 0; i < listLength; i++) { 
            var amount = $(".listQuantity").eq(i).val() * $(".listRate").eq(i).val();
            $(".listAmount").eq(i).val(amount);
            subTotal += amount;

        }

              $("#totalAmount").val(subTotal);
    }
</script>
    

</body>
</html>