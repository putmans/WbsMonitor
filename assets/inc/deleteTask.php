<?php
if ( !isset( $_POST["taskId"] ) )
{
	die();
}

require_once( "mysqli.php" );

$status = 200;
$taskId = $_POST["taskId"];

if ( !empty( $taskId ) )
{
	$result = $mysqli->query("UPDATE tasks SET taskDeleted = 1 WHERE taskId = $taskId LIMIT 1");

	if ( !$result )
	{
		$status = 300;
	}
}

echo json_encode( array( 'status' => $status ));