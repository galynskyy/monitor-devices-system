<?php
	try {
		$conn = new PDO("mysql:host=localhost;dbname=monitor", "monitor", "monitor12qwaszxQWAS");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type AND status = :status");
	$query->bindValue(":type", "server", PDO::PARAM_STR);
	$query->bindValue(":status", "1", PDO::PARAM_STR);
	$query->execute();
	$result_online = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type AND status = :status");
	$query->bindValue(":type", "server", PDO::PARAM_STR);
	$query->bindValue(":status", "0", PDO::PARAM_STR);
	$query->execute();
	$result_offline = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type");
	$query->bindValue(":type", "server", PDO::PARAM_STR);
	$query->execute();
	$result_total = $query->fetchColumn();
	
	$result_data = [
		"online"	=>	$result_online,
		"offline"	=>	$result_offline,
		"total"	=>	$result_total
	];
	
	echo json_encode($result_data);
?>