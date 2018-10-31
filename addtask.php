<?php
	if ( !isset( $_GET["projectId"] ) )
	{
		header("Location: index.php");
		die();
	}

	// Requirements
	require_once("assets/inc/mysqli.php");

	// Init vars
	$projectId = $_GET["projectId"];
?>
<!DOCTYPE html>
<html>
	<head>
		<title>WBS Monitor - Add task</title>

		<link rel="stylesheet" href="assets/lib/bootstrap/bootstrap.min.css">
		<link rel="stylesheet" href="assets/css/style.css">
	</head>
	<body>
	    <div class="container">

	        <h1>WBS Monitor - Add task</h1>
	        <hr>

	        <div id="notification">
	        	<p></p>
	        </div>

	        <form id="form-tasks">
		        <table class="table" id="task-table">
		        	<input type="hidden" name="project-id" value="<?php echo $projectId; ?>">

		        	<thead>
			            <tr>
			                <th>#</th>
			                <th>Task</th>
			                <th>PreDecessor</th>
			                <th>Task Owner</th>
			                <th>MoSCoW</th>
			                <th>Plan (min)</th>
			                <th>Do (min)</th>
			                <th>Check</th>
			                <th>Act</th>
			                <th>Start</th>
			                <th>Delete</th>
			            </tr>
			        </thead>
			        <tbody>
		            </tbody>
		        </table> 
	        </form>

	        <div class="btn btn-success" id="task-add">Add task</div>
            <div class="btn btn-success task-save">Save all tasks</div>
            <a href="index.php"><div class="btn btn-info">Return to projects overview</div></a>
	    </div>

		<script src="assets/lib/jquery/jquery-3.3.1.js"></script>
		<script src="assets/lib/popper/popper.min.js"></script>
		<script src="assets/lib/bootstrap/bootstrap.min.js"></script>

		<script src="assets/js/templates.js"></script>
		<script src="assets/js/task.js"></script>
	</body>
</html>