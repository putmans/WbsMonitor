<?php
	$mysqli = new mysqli("localhost", "root", "", "wbsmonitor");

	if ( $mysqli->connect_errno)
		throw new Exception($mysqli->connect_errno);