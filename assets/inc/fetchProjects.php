<?php
require_once( "mysqli.php" );

$projects = array(
	"projects" => array()
);

$result = $mysqli->query("SELECT * FROM projects WHERE projectDeleted = 0");

while ( $project = $result->fetch_assoc() )
{
	$projectId = $project["projectId"];
	$taskQuery = $mysqli->query("SELECT sum(taskActualTime) AS projectActualTime, sum(taskPlannedTime) AS projectPlannedTime FROM tasks WHERE projectId = $projectId");
	$taskResult = $taskQuery->fetch_assoc();

	$project["projectActualTimeInSeconds"] = $taskResult["projectActualTime"];
	$project["projectPlannedTimeInSeconds"] = $taskResult["projectPlannedTime"];

	$projects["projects"][] = $project;
}

echo json_encode( $projects );