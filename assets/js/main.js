// Global vars
var notifyTimer;

function init()
{
	$("#notification").hide();
	$("#project-add").on("click", onProjectAddButtonClick);
}

function onProjectAddButtonClick()
{
	$("#project-table > tbody").append(projectTemplate.clone());

	// Add project events again
	$(".project-remove").off().on("click", onProjectRemoveButtonClick);
	$(".project-save").off().on("click", onProjectSaveButtonClick);
}

// This function removes the preview object from the table
function onProjectRemoveButtonClick()
{
	$(this).parent().parent().remove();
}

// This function removes an existing project from the database
function onExistingProjectRemoveButtonClick()
{
	var projectId = $(this).data("project-id");

	if ( projectId !== undefined )
	{
		deleteProject(projectId);
	}
}

function onProjectSaveButtonClick()
{
	saveProjects();
}

function saveProjects()
{
	$.ajax(
	{
		method: "POST",
		url: "assets/inc/saveProjects.php",
		datatype: "JSON",
		data: $("#form-projects").serialize(),
		success: onProjectSaveCallBack,
		error: onProjectFailCallBack
	});
}

function fetchProjects()
{
	$.ajax(
	{
		method: "POST",
		url: "assets/inc/fetchProjects.php",
		datatype: "JSON",
		success: onProjectFetchCallBack,
		error: onProjectFailCallBack
	});
}

function deleteProject(projectId)
{
	$.ajax(
	{
		method: "POST",
		url: "assets/inc/deleteProject.php",
		datatype: "JSON",
		data: { projectId: projectId },

		success: function(result)
		{
			var data = JSON.parse(result);

			if ( data.status == 200 )
			{
				notifyUser("Project was successfully deleted");
				fetchProjects();
			}
			else
			{
				notifyUser("Could not delete project yo");
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

// Appends each existing project to a project template and inserts
// it into a nice table row cus that's how we roll
function onProjectFetchCallBack(data)
{
	var projects = JSON.parse(data);

	$("#project-table > tbody").empty();

	console.log(projects);

	$.each(projects["projects"], function(i, v)
	{
		var newProject = currentProjectTemplate.clone();

		newProject.find(".project-id").text(v.projectId);
		newProject.find(".project-name").text(v.projectName);
		newProject.find(".project-estimatedTime").text(v.projectEstimatedTime);
		newProject.find(".project-existing-remove").data("project-id", v.projectId);
		newProject.find(".link-project-id").attr("href", "addtask.php?projectId=" + v.projectId);
		newProject.find(".project-actualTime").text(secondsTimeSpanToHMS(v.projectActualTimeInSeconds));
		newProject.find(".project-estimatedTime").text(secondsTimeSpanToHMS(v.projectPlannedTimeInSeconds));

		$("#project-table > tbody").append(newProject);
	});

	$(".project-existing-remove").off().on("click", onExistingProjectRemoveButtonClick);
}

function onProjectSaveCallBack(data)
{
	var result = JSON.parse(data);

	if ( result.status == 200 )
	{
		notifyUser("Project(s) added");
	}
	else if ( result.status == 301 )
	{
		notifyUser("Could not add one or more projects, make sure every field is filled in correctly.");
	}
	else
	{
		notifyUser("Failed to add project(s), please try again.");
	}

	fetchProjects();
}

function onProjectFailCallBack(jqXhr, error, errorStr)
{
	console.log(error + ": " + errorStr);
}

// Events
$(document).ready(init);

// Fetch all projects
fetchProjects();