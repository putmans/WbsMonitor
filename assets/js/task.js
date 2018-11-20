// Global vars
var notifyTimer;
var projectId;
var checkTimer;

function init()
{
	projectId = $("input[name='project-id']").val();

	$("#notification").hide();
	$("#task-add").on("click", onTaskAddButtonClick);
	$(".task-save").off().on("click", onTaskSaveButtonClick);

	fetchTasks();
}

function onTaskAddButtonClick()
{
	$("#task-table > tbody").append(taskTemplate.clone());

	// Add task events again
	$(".task-remove").off().on("click", onTaskRemoveButtonClick);
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

			if ( data.status == 200 ) // HTTP STATUS CODE OK, BRO
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

// These 2 functions handle notifications mayn
// self explanatory dont need these comments boiii / Jesse @ 23:22
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
		newTask.find(".task-existing-remove").data("task-id", v.taskId);
		newTask.find(".task-do").data("task-timer-enabled", false)
		newTask.find(".task-do").data("task-timer-start", hmsToSecondsOnly(v.taskActualTime));

		$("#task-table > tbody").append(newTask);
	});

	initTaskTimers();
	initTaskTimerCheck();
	updateTaskTotalTime();

	$(".task-existing-remove").off().on("click", onExistingTaskRemoveButtonClick);
	$(".task-start").off().on("click", onTaskStartButtonClick);
}

// UPDATES TOTAL TASK TIME (ACTUAL TIME AND PLANNED TIME)
// ALSO SELF EXPLNATORY IF YOU READ THE FUNCTION NAMe
function updateTaskTotalTime()
{
	var totalTimeActualSeconds = 0;
	var totalTimePlannedSeconds = 0;

	// Actual time
	$.each($(".task-do"), function(index,elem)
	{
		var actualTimeInSeconds = hmsToSecondsOnly($(elem).val());
		var plannedTimeInSeconds = hmsToSecondsOnly($(elem).parent().parent().find(".task-plan").val());

		totalTimeActualSeconds += actualTimeInSeconds;
		totalTimePlannedSeconds += plannedTimeInSeconds;
	});

	$(".time-total-actual").text( secondsTimeSpanToHMS(totalTimeActualSeconds) );
	$(".time-total-planned").text( secondsTimeSpanToHMS(totalTimePlannedSeconds) );
}

// This function compares each tasks' planned time and total time
// if the tasks' current time is greater than the planned time
// this function will change the tasks' row bg to red
function initTaskTimerCheck()
{
	$.each($(".task-do"), function(index, elem)
	{
		var currentTime = $(elem).data('seconds');
    	var plannedTime = $(elem).parent().parent().find(".task-plan").val();
    	var plannedTimeInSeconds = hmsToSecondsOnly(plannedTime);

    	if ( currentTime > plannedTimeInSeconds )
    	{
    		$(elem).parent().parent().css("background-color", "rgba(255, 0, 0, 0.5)");
    	}
    	else
    	{
    		// Optional else condition, won't need it if you decide to make times un-editable / Jesse
    		$(elem).parent().parent().css("background-color", "rgba(255, 255, 255, 1)");
    	}
	});

	updateTaskTotalTime();
	checkTimer = setTimeout(initTaskTimerCheck, 500);
}

// this function will initialize each tasks' timers
function initTaskTimers()
{
	$.each($(".task-do"), function(index, elem)
	{
		var currentTime = $(elem).data("task-timer-start");

		$(elem).timer({
		    format: '%H:%M:%S',
		    seconds: currentTime
		});

		$(elem).timer("pause");
	});
}

// handles tasks' start timer button click, and changes text & status according to timer status
function onTaskStartButtonClick()
{
	var taskTimer = $(this).parent().parent().find(".task-do");
	var taskTimerEnabled = $(this).parent().parent().find(".task-do").data("task-timer-enabled");

	if ( !taskTimerEnabled )
	{
		taskTimer.timer("resume");
		$(this).addClass("btn-danger").removeClass("btn-success").text("Pause");
	}
	else
	{
		taskTimer.timer("pause");
		$(this).removeClass("btn-danger").addClass("btn-success").text("Resume");
	}

	taskTimer.data("task-timer-enabled", !taskTimerEnabled);
}

function onTaskSaveCallBack(data)
{
	var result = JSON.parse(data);

	if ( result.status == 200 )
	{
		notifyUser("Task(s) saved");
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

// Stackoverflow: https://stackoverflow.com/a/9640417
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

// StackOverflow: https://stackoverflow.com/questions/11792726/turn-seconds-into-hms-format-using-jquery
// Modified & added hour zero padding too / Jesse
function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); // zero padding on minutes and seconds (added hours too / Jesse)
}

// Events
$(document).ready(init);