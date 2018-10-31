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
        	<a href="addtask.php" class="link-project-id"><div class="btn btn-info">View project</div></a>
        </td>
        <td>
        	<a href="addtask.php" class="link-project-id"><div class="btn btn-success">Add task</div></a>
        </td>
        <td>
        	<div class="btn btn-danger project-existing-remove">Remove project</div>
        </td>
    </tr>
`);

var taskTemplate = $(`
    <tr>
        <input type="hidden" class="task-id" name="task-id[]" value="new">
        
        <td>
            <p class="task-id-text"></p>
        </td>
        <td>
            <input type="text" class="task-name" name="task-name[]" value="">
        </td>
        <td>
            <input type="text" class="task-preDecessor" name="task-preDecessor[]" value="0">
        </td>
        <td>
            <input type="text" class="task-owner" name="task-owner[]" value="">
        </td>
        <td>
            <select name="task-moscow[]">
                <option value="0" selected>Must</option>
                <option value="1">Should</option>
                <option value="2">Could</option>
                <option value="3">Wont</option>
            </select>
        </td>
        <td>
            <input type="text" class="task-plan" name="task-plan[]" value="">
        </td>
        <td>
            <input type="text" class="task-do" name="task-do[]" value="">
        </td>
        <td>
            <textarea name="task-check"></textarea>
        </td>
        <td>
            <textarea name="task-act"></textarea>
        </td>
        <td colspan="2">
            <div class="btn btn-danger task-remove">Remove task</div>
        </td>
    </tr>
`);

var currentTaskTemplate = $(`
    <tr>
        <input type="hidden" class="task-id" name="task-id[]" value="">

        <td>
            <p class="task-id-text"></p>
        </td>
        <td>
            <input type="text" class="task-name" name="task-name[]" value="">
        </td>
        <td>
            <input type="text" class="task-preDecessor" name="task-preDecessor[]" value="">
        </td>
        <td>
            <input type="text" class="task-owner" name="task-owner[]" value="">
        </td>
        <td>
            <select name="task-moscow[]">
                <option value="0">Must</option>
                <option value="1">Should</option>
                <option value="2">Could</option>
                <option value="3">Wont</option>
            </select>
        </td>
        <td> 
            <input type="text" class="task-plan" name="task-plan[]" value="">
        </td>
        <td>
            <input type="text" class="task-do" name="task-do[]" value="">
        </td>
        <td>
            <textarea name="task-check"></textarea>
        </td>
        <td>
            <textarea name="task-act"></textarea>
        </td>
        <td>
            <div class="btn btn-success task-start">Start</div>
        </td>
        <td>
            <div class="btn btn-danger task-remove">Remove task</div>
        </td>
    </tr>
`);