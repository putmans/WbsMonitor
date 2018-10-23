<?php
	$con = new mysqli("localhost", "root", "", "wbsmonitor");

	if ($con->connect_errno)
		throw new Exception($con->connect_errno);
?>