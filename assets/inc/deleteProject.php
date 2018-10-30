<?php
if ( !isset( $_POST["projectId"] ) )
{
	die();
}

require_once( "mysqli.php" );

$status = 200;
$projectId = $_POST["projectId"];

if ( !empty( $projectId ) )
{
	$result = $mysqli->query("UPDATE projects SET projectDeleted = 1 WHERE projectId = $projectId LIMIT 1");

	if ( !$result )
	{
		$status = 300;
	}
}

echo json_encode( array( 'status' => $status ));