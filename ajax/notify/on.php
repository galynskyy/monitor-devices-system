<?php
	try {
		$conn = new PDO("mysql:host=localhost;dbname=monitor", "monitor", "monitor12qwaszxQWAS");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT name, ip FROM devices WHERE status = :status AND up >= DATE_SUB(NOW(), INTERVAL 5 SECOND)");
	$query->bindValue(":status", "1", PDO::PARAM_INT);
	$query->execute();
	$result = $query->fetchAll(PDO::FETCH_ASSOC);
	
	echo json_encode($result);
?>