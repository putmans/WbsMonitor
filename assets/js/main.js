var projectTemplate = $(`
	<tr>
        <td>
            <input type="text" name="project-id[]" value="" disabled>
        </td>
        <td>
            <input type="text" name="project-name[]" value="">
        </td>
        <td>
            <input type="text" name="project-estimatedTime[]" value="">
        </td>
        <td>
        	<input type="text" name="project-actualTime[]" value="" disabled>
        </td>
        <td colspan="3">
        	<div class="btn btn-danger project-remove">Remove project</div>
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
		error: onProjectSaveFailCallBack
	});
}

function onProjectSaveCallBack(result)
{
	console.log(result);
}

function onProjectSaveFailCallBack(jqXhr, error, errorStr)
{
	console.log(error + ": " + errorStr);
}

// Events
$(document).ready(init);