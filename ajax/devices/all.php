<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	try {
		$conn = new PDO("mysql:host=localhost;dbname=monitor", "monitor", "monitor12qwaszxQWAS");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT name, ip, down, type FROM devices WHERE status = :status");
	$query->bindValue(":status", "0", PDO::PARAM_INT);
	$query->execute();
	$result = $query->fetchAll(PDO::FETCH_ASSOC);
	/*printf ($result->fetchColumn());*/
	echo json_encode($result);
?>