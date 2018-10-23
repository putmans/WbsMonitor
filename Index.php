<?php
    include("includes/db.php");
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
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">

    <!-- Your own CSS file -->
    <link rel="stylesheet" type="text/css" href="../Css/Styles.css">

	<title>Personal WBS</title>
</head>
<body>
    <h1 id = "test"></h1>
    <div class="container">

        <h1>Personal WBS</h1>
        <table class="table">
            <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Estimated Time</td>
                <td>Actual Time</td>
                <td>View</td>
                <td>Add Task</td>
                <td>Delete</td>
            </tr>

            <!-- Form used for serialize() -->
            <form id="update-shows-form">

                <!-- Shows example -->
                <?php 

                    $getShows = "SELECT * FROM `showinfo`";

                    $result = mysqli_query($con, $getShows);

                    while($row = mysqli_fetch_assoc($result))
                    {   

                ?>
                    <input type="hidden" name="showId[]" value="<?php echo $row['id']; ?>" />
                    <tr>
                        <td>
                            <?php echo $row['id']; ?>
                        </td>
                        <td>
                            <input type="text" class="show-name" name="showName[]" value="<?php echo $row['name']; ?>">
                        </td>
                        <td>
                            <input type="text" class="show-release-date" name="showReleaseDate[]" value="<?php echo $row['release_date']; ?>">
                        </td>
                        <td>
                            <input type="text" class="show-poster" name="showPoster[]" value="<?php echo $row['poster']; ?>">
                        </td>
                        <td>
                            <input type="button" class="btn btn-success" name="View" value="View">
                        </td>
                        <td>
                            <input type="button" class="btn btn-success" name="Add" value="Add">
                        </td>
                        <td>
                            <input type="button" class="btn btn-success" name="Delete" value="Delete">
                        </td>
                    </tr>
                <?php }  ?>
            </form>
        </table> 

        <input type="button" id="js-update-shows" class="btn btn-success" value="Add Show" />   
    </div>
    
	<!-- jQuery -->
	<script src="js/jquery-3.1.0.min.js"></script>

    <!-- Custom js  -->
    <script src="js/main.js"></script>
</body>
</html>