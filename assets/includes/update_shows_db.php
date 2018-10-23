<?php
	
	//Database connection
	include("db.php");

	//Input arrays
	$showId = $_POST['showId'];
	$showName = $_POST['showName'];
	$show_release_date = $_POST['showReleaseDate'];
	$showPoster = $_POST['showPoster'];


	for($i = 0; $i < count($showId); $i++)
	{	
		$updateShows = "UPDATE showinfo 
       				SET name ='" . $showName[$i] . "',
       					release_date ='" . $show_release_date[$i] . "',
       					poster ='" . $showPoster[$i] . "'
       				WHERE id='" . $showId[$i] . "'";

       	mysqli_query($con, $updateShows);
	}
	
	if (mysqli_query($con, $updateShows)) {
		echo "Successfully Updated";   
	} else {
	    echo "Error updating record: " . mysqli_error($con);
	}

?>