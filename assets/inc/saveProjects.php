<?php
if ( !isset( $_POST["project-name"] ) )
{
	die();
}

require_once( "mysqli.php" );

$status = 200;
$projectNames = $_POST["project-name"];

for ( $i = 0; $i < count( $projectNames ); $i++ )
{
	$projectName = $projectNames[$i];

 	if ( !empty( $projectName ) )
 	{
 		$result = $mysqli->query("INSERT INTO projects (projectName) VALUES ('$projectName')");

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