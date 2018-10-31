<?php
if ( !isset($_POST["projectId"]) )
{
	die();
}

require_once( "mysqli.php" );

$tasks = array();
$projectId = $_POST["projectId"];
$result = $mysqli->query("SELECT * FROM tasks WHERE taskDeleted = 0 AND projectId = $projectId");

while ( $task = $result->fetch_assoc() )
{
	$tasks[] = $task;
}

echo json_encode( $tasks );