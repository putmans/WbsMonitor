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
        	<div class="btn btn-danger">Remove project</div>
        </td>
    </tr>
`);

function init()
{
	$("#project-add").on("click", onProjectAddButtonClick);
}

function onProjectAddButtonClick()
{
	$("#project-table > tbody").append(projectTemplate.clone());

	// Add project events again
	$(".project-remove").off().on("click", onProjectRemoveButtonClick);
	$(".project-save").off().on("click", onProjectSaveButtonClick);
}

function onProjectRemoveButtonClick()
{
	$(this).parent().parent().remove();
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

		$("#project-table > tbody").append(newProject);
	});
}

function onProjectSaveCallBack(data)
{
	var result = JSON.parse(data);

	if ( result.status == 200 )
	{
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
fetchProjects();