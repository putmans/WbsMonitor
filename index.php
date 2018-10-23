<?php
	require_once("assets/inc/mysqli.php");
?>
<!DOCTYPE html>
<html>
	<head>
		<title>WBS Monitor</title>

		<link rel="stylesheet" href="assets/lib/bootstrap/bootstrap.min.css">
	</head>
	<body>
	    <div class="container">

	        <h1>WBS Monitor</h1>
	        <hr>

	        <form id="form-projects">
		        <table class="table" id="project-table">
		        	<thead>
			            <tr>
			                <th>#</th>
			                <th>Name</th>
			                <th>Estimated time</th>
			                <th>Actual time</th>
			                <th>View details</th>
			                <th>Add task</th>
			                <th>Delete</th>
			            </tr>
			        </thead>
			        <tbody>
		            </tbody>
		        </table> 
	        </form>

	        <div class="btn btn-success" id="project-add">Add project</div>
            <div class="btn btn-success project-save">Save projects</div>
	    </div>

		<script src="assets/lib/jquery/jquery-3.3.1.slim.min.js"></script>
		<script src="assets/lib/popper/popper.min.js"></script>
		<script src="assets/lib/bootstrap/bootstrap.min.js"></script>

		<script src="assets/js/main.js"></script>
	</body>
</html>