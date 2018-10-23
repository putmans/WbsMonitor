<?php
	
	define("HOST", "localhost");
	define("USERNAME", "root");
	define("PASSWORD", "usbw");
	define("DATABASE", "netflixshows");

	$con = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);

	if ( mysqli_connect_errno()) 
	{
		echo "Failed to connect to database" . mysqli_connect_error();
	}
?>