// Global vars
var notifyTimer;
var projectId;

function init()
{
	projectId = $("input[name='project-id']").val();

	$("#notification").hide();
	$("#task-add").on("click", onTaskAddButtonClick);

	fetchTasks();
}

function onTaskAddButtonClick()
{
	$("#task-table > tbody").append(taskTemplate.clone());

	// Add task events again
	$(".task-remove").off().on("click", onTaskRemoveButtonClick);
	$(".task-save").off().on("click", onTaskSaveButtonClick);
}

// This function removes the preview object from the table
function onTaskRemoveButtonClick()
{
	$(this).parent().parent().remove();
}

// This function removes an existing task from the database
function onExistingTaskRemoveButtonClick()
{
	var taskId = $(this).data("task-id");

	if ( taskId !== undefined )
	{
		deleteTask(taskId);
	}
}

function onTaskSaveButtonClick()
{
	saveTasks();
}

function saveTasks()
{
	console.log($("#form-tasks").serialize());
	
	$.ajax(
	{
		method: "POST",
		url: "assets/inc/saveTasks.php",
		datatype: "JSON",
		data: $("#form-tasks").serialize(),
		success: onTaskSaveCallBack,
		error: onTaskFailCallBack
	});
}

function fetchTasks()
{
	$.ajax(
	{
		method: "POST",
		url: "assets/inc/fetchTasks.php",
		datatype: "JSON",
		data: { projectId: projectId },
		success: onTaskFetchCallBack,
		error: onTaskFailCallBack
	});
}

function deleteTask(taskId)
{
	$.ajax(
	{
		method: "POST",
		url: "assets/inc/deleteTask.php",
		datatype: "JSON",
		data: { taskId: taskId },

		success: function(result)
		{
			var data = JSON.parse(result);

			if ( data.status == 200 )
			{
				notifyUser("Task was successfully deleted");
				fetchTasks();
			}
			else
			{
				notifyUser("Could not delete task yo");
			}
		},
		
		error: function(jqXhr, error, errorStr)
		{
			console.log(error + ": " + errorStr);
		}
	});
}

function notifyUser(userNote)
{
	$("#notification p").text(userNote);
	$("#notification").slideDown(250, function()
		{
			notifyTimer = setTimeout(hideNotification, 2000);
		});
}

function hideNotification()
{
	$("#notification").slideUp(250)
}

// Appends each existing task to a task template and inserts
// it into a nice table row cus that's how we roll
function onTaskFetchCallBack(data)
{
	var tasks = JSON.parse(data);

	$("#task-table > tbody").empty();

	$.each(tasks, function(i, v)
	{
		var newTask = currentTaskTemplate.clone();

		newTask.find(".task-id").val(v.taskId);
		newTask.find(".task-id-text").text(v.taskId);
		newTask.find(".task-name").val(v.taskName);
		newTask.find(".task-preDecessor").val(v.taskPredecessor);
		newTask.find(".task-owner").val(v.taskOwner);
		newTask.find(".task-moscow").val(v.taskMoscowType);
		newTask.find(".task-plan").val(v.taskPlannedTime);
		newTask.find(".task-do").val(v.taskActualTime);
		newTask.find(".task-check").val(v.taskCheckNote);
		newTask.find(".task-act").val(v.taskActNote);

		console.log("Moscow type: " + v.taskMoscowType);

		$("#task-table > tbody").append(newTask);
	});

	$(".task-existing-remove").off().on("click", onExistingTaskRemoveButtonClick);
}

function onTaskSaveCallBack(data)
{
	var result = JSON.parse(data);

	if ( result.status == 200 )
	{
		notifyUser("Task(s) added");
		fetchTasks();
	}
	else
	{
		notifyUser("Failed to add task(s), please try again.");
	}
}

function onTaskFailCallBack(jqXhr, error, errorStr)
{
	console.log(error + ": " + errorStr);
}

// Events
$(document).ready(init);