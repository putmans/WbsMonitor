<?php
require_once( "mysqli.php" );

$projects = array();
$result = $mysqli->query("SELECT * FROM projects");

while ( $project = $result->fetch_assoc() )
{
	$projects[] = $project;
}

echo json_encode( $projects );