<?php
if ( !isset( $_POST["project-name"] ) )
{
	die();
}

require_once( "mysqli.php" );

$status = 200;
$projectNames 			= $_POST["project-name"];
$projectEstimatedTimes 	= $_POST["project-estimatedTime"];

for ( $i = 0; $i < count( $projectNames ); $i++ )
{
	$projectName = $projectNames[$i];
	$projectEstimatedTime = $projectEstimatedTimes[$i];

 	if ( !empty( $projectName ) && !empty( $projectEstimatedTime ) )
 	{
 		$result = $mysqli->query("INSERT INTO projects (projectName, projectEstimatedTime) VALUES ('$projectName', '$projectEstimatedTime')");

 		if ( !$result )
 		{
 			$status = 300;
 		}
 	}
 	else
 	{
 		$status = 301;
 	}
}

echo json_encode( array( 'status' => $status ));