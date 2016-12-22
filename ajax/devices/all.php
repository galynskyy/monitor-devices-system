<?php
	try {
		$conn = new PDO("mysql:host=localhost;dbname=base", "user", "pass");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT name, ip, down, type FROM devices WHERE status = :status");
	$query->bindValue(":status", "0", PDO::PARAM_INT);
	$query->execute();
	$result = $query->fetchAll(PDO::FETCH_ASSOC);
	
	echo json_encode($result);
?>