<!DOCTYPE html>
<html lang="en">
<head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
  <title>Shingar Plastic</title>
  
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

	<div class="container text-center topcenter" >

		<form class="form-horizontal" action="api/user/authenticate.php" method="post">
		  <div class="form-group">
		    <div class="col-md-offset-4 col-sm-4">
		      <h1 class="text-danger" style="margin-top:10%;margin-bottom:2%">SHINGAR PLASTIC</h1>
		      <input type="username" class="form-control" name="username" id="username" placeholder="Enter Username" required>
		    </div>
		  </div>
		  
		  <div class="form-group">
		    <div class="col-md-offset-4 col-sm-4"> 
		      <input type="password" class="form-control" name="password" id="password" placeholder="Enter Password" required>
		    </div>
		  </div>
		
		  <div class="form-group"> 
		    <div class="col-md-offset-4 col-sm-4 col-md-offset-4">
		      <button type="submit" class="btn btn-primary btn-block">Login</button>
		    </div>
		  </div>
		</form>
		
		<?php
		
		if($_GET["status"]=="failed"){
			echo '<div class="alert alert-danger col-sm-offset-4 col-sm-4 col-sm-offset-4"><strong>Authentication Failed</strong></div>';
		}
		
		?>
		
	</div>

</body>
</html>