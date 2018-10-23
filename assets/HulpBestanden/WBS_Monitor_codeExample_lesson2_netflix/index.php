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
    <link rel="stylesheet" type="text/css" href="css/style.css">

	<title>WBS - AJAX Lesson 2</title>
</head>
<body>
    <h1 id = "test"></h1>
    <div class="container">

        <h1>Netflix CMS</h1>
        <table class="table">
            <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Release</td>
                <td>Posters</td>
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
                    </tr>
                <?php }  ?>
            </form>
        </table> 

        <input type="button" id="js-update-shows" class="btn btn-success" value="Save Shows" />   
    </div>
    
	<!-- jQuery -->
	<script src="js/jquery-3.1.0.min.js"></script>

    <!-- Custom js  -->
    <script src="js/main.js"></script>
</body>
</html>