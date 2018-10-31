<?php
if ( !isset( $_POST["task-name"] ) )
{
	die();
}

require_once( "mysqli.php" );

$status = 200;

for ( $i = 0; $i < count( $_POST["task-name"] ); $i++ )
{
	// TODO: store all field keys and values in an array
	/////////////////////////////////////////////////////

	$taskId 			= $_POST["task-id"][$i];
	$taskName 			= $_POST["task-name"][$i];
	$taskPreDecessor 	= $_POST["task-preDecessor"][$i];
	$taskOwner 			= $_POST["task-owner"][$i];
	$taskMoscow 		= $_POST["task-moscow"][$i];
	$taskPlan 			= $_POST["task-plan"][$i];
	$taskDo 			= $_POST["task-do"][$i];
	$taskCheck 			= $_POST["task-check"][$i];
	$taskAct 			= $_POST["task-act"][$i];
	$projectId			= $_POST["project-id"];

	if ( $taskId == "new" ) // Insert new task
	{
		$taskQueryString = "
			INSERT INTO tasks
			(
				taskName,
				taskPredecessor,
				taskOwner,
				taskMoscowType,
				taskPlannedTime,
				taskActualTime,
				taskCheckNote,
				taskActNote,
				projectId
			)
			VALUES
			(
				'$taskName',
				'$taskPreDecessor',
				'$taskOwner',
				$taskMoscow,
				'$taskPlan',
				'$taskDo',
				'$taskCheck',
				'$taskAct',
				$projectId
			)";
	}
	else // Update task
	{
		$taskQueryString = "
			UPDATE tasks
			SET
				taskName = '$taskName',
				taskPredecessor = '$taskPreDecessor',
				taskOwner = '$taskOwner',
				taskMoscowType = $taskMoscow,
				taskPlannedTime = '$taskPlan',
				taskActualTime = '$taskDo',
				taskCheckNote = '$taskCheck',
				taskActNote = '$taskAct'
			WHERE
				taskId = $taskId
			LIMIT 1";
	}

	$taskQueryResult = $mysqli->query($taskQueryString);

	if ( !$taskQueryResult )
	{
		$status = $mysqli->error;
	}
}

echo json_encode( array( 'status' => $status ));