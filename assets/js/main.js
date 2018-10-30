var projectTemplate = $(`
	<tr>
        <td>
            <input type="text" class="project-id" name="project-id[]" value="-1" disabled>
        </td>
        <td>
            <input type="text" class="project-name" name="project-name[]" value="">
        </td>
        <td>
            <input type="text" class="project-estimatedTime" name="project-estimatedTime[]" value="">
        </td>
        <td>
        	<input type="text" class="project-actualTime" name="project-actualTime[]" value="-1" disabled>
        </td>
        <td colspan="3">
        	<div class="btn btn-danger project-remove">Remove project</div>
        </td>
    </tr>
`);

var currentProjectTemplate = $(`
	<tr>
        <td>
            <p class="project-id"></p>
        </td>
        <td>
            <p class="project-name"></p>
        </td>
        <td>
            <p class="project-estimatedTime"></p>
        </td>
        <td>
        	<p class="project-actualTime"></p>
        </td>
        <td>
        	<div class="btn btn-info">View project</div>
        </td>
        <td>
        	<div class="btn btn-success">Add task</div>
        </td>
        <td>
        	<div class="btn btn-danger project-existing-remove">Remove project</div>
        </td>
    </tr>
`);

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

	$.each(projects, function(i, v)
	{
		var newProject = currentProjectTemplate.clone();

		newProject.find(".project-id").text(v.projectId);
		newProject.find(".project-name").text(v.projectName);
		newProject.find(".project-estimatedTime").text(v.projectEstimatedTime);
		newProject.find(".project-existing-remove").data("project-id", v.projectId);

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
		fetchProjects();
	}
	else
	{
		// Show error message
	}
}

function onProjectFailCallBack(jqXhr, error, errorStr)
{
	console.log(error + ": " + errorStr);
}

// Events
$(document).ready(init);

// Fetch all projects
fetchProjects();