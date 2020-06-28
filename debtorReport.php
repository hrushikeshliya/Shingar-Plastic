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

	<link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css">
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css">

</head>
<body>

<!-- our navBar will be injected here --> 
<div id="nav"></div>


<!-- our app will be injected here -->
<div id="app"></div>

<script src="app/assets/js/jquery.js"></script> 
<script src="app/assets/js/jquery.cookie.js"></script> 
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="app/assets/js/bootbox.min.js"></script>

<script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>

<?php echo '<script src="app/app.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/navBar/createNavBar.js' ."?ts=". time() . '"></script>'; ?>
<?php echo '<script src="app/reports/readDebtor.js' ."?ts=". time() . '"></script>'; ?>

</body>
</html>