<?php
    include("assets/includes/db.php");
?>

<!DOCTYPE html>
<html>
<head>
	<!-- Character set   -->
	<meta charset="utf-8">

	<!-- Tells the Internet Explorer to display the webpage in the highest mode available.   -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- For rendering on mobile devices and touch zooming   -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSS Twitter Bootstrap FrameWork-->
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">

    <!-- Your own CSS file -->
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

	<title>WBS monitor</title>
</head>
<body>
    <h1 id = "test"></h1>
    <div class="container">

        <h1>WBS monitor</h1>
        <hr>
        <input type="button" id="js-update-shows" class="btn btn-success" value="Add a project" />  
        <table class="table">
            <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Estimated time</td>
                <td>Actual time</td>
                <td>View</td>
                <td>Add</td>
                <td>Delete</td>
            </tr>

            <!-- Form used for serialize() -->
            <form id="update-shows-form">

                <!-- Shows example -->
                <?php 

                    $getShows = "SELECT * FROM `projects`";

                    $result = mysqli_query($con, $getShows);

                    while($row = mysqli_fetch_assoc($result))
                    {   

                ?>
                    <input type="hidden" name="projectId[]" value="<?php echo $row['projectId']; ?>" />
                    <tr>
                        <td>
                            <?php echo $row['projectId']; ?>
                        </td>
                        <td>
                            <input type="text" class="show-name" name="projectName[]" value="<?php echo $row['projectName']; ?>">
                        </td>
                        <td>
                            <input type="text" class="show-release-date" name="projectEstimatedTime[]" value="<?php echo $row['projectEstimatedTime']; ?>">
                        </td>
                        <td>
                            <input type="text" class="show-poster" name="projectActualTime[]" value="<?php echo $row['projectActualTime']; ?>">
                        </td>
                        <td>
                            <input type="button" class="btn btn-success" name="View" value="View">
                        </td>
                        <td>
                            <input type="button" class="btn btn-success" name="Add task" value="Add task">
                        </td>
                        <td>
                            <input type="button" class="btn btn-success" name="Delete" value="Delete">
                        </td>
                    </tr>
                    </tr>
                <?php }  ?>
            </form>
        </table> 
    </div>
    
	<!-- jQuery -->
	<script src="assets/js/jquery-3.1.0.min.js"></script>

    <!-- Custom js  -->
    <script src="assets/js/main.js"></script>
</body>
</html>