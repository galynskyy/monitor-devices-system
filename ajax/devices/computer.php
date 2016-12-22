<?php
	try {
		$conn = new PDO("mysql:host=localhost;dbname=base", "user", "pass");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type AND status = :status");
	$query->bindValue(":type", "computer", PDO::PARAM_STR);
	$query->bindValue(":status", "1", PDO::PARAM_STR);
	$query->execute();
	$result_online = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type AND status = :status");
	$query->bindValue(":type", "computer", PDO::PARAM_STR);
	$query->bindValue(":status", "0", PDO::PARAM_STR);
	$query->execute();
	$result_offline = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type");
	$query->bindValue(":type", "computer", PDO::PARAM_STR);
	$query->execute();
	$result_total = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT id, type, status, time FROM info WHERE type = :type AND status = :status AND DATE(time) >= DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY) GROUP BY name");
	$query->bindValue(":type", "computer", PDO::PARAM_STR);
	$query->bindValue(":status", "0", PDO::PARAM_STR);
	$query->execute();
	$result_status = $query->rowCount();
	
	if($result_status > 0)
	{
		$result_uptime = (100 - (round(($result_status * 100) / $result_total)));
	}
	else
	{
		$result_uptime = 100;
	}
	
	$result_data = [
		"online"	=>	$result_online,
		"offline"	=>	$result_offline,
		"total"	=>	$result_total,
		"uptime" => $result_uptime
	];
	
	echo json_encode($result_data);
?>