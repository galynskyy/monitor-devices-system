<?php
	try {
		$conn = new PDO("mysql:host=localhost;dbname=monitor", "monitor", "monitor12qwaszxQWAS");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type AND status = :status");
	$query->bindValue(":type", "video", PDO::PARAM_STR);
	$query->bindValue(":status", "1", PDO::PARAM_STR);
	$query->execute();
	$result_online = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type AND status = :status");
	$query->bindValue(":type", "video", PDO::PARAM_STR);
	$query->bindValue(":status", "0", PDO::PARAM_STR);
	$query->execute();
	$result_offline = $query->fetchColumn();
	
	$query = $conn->prepare("SELECT COUNT(id) FROM devices WHERE type = :type");
	$query->bindValue(":type", "video", PDO::PARAM_STR);
	$query->execute();
	$result_total = $query->fetchColumn();
	
	if($result_online > 0)
	{
		$result_uptime = round(($result_online * 100) / $result_total);
	}
	else
	{
		$result_uptime = 0;
	}
	
	$result_data = [
		"online"	=>	$result_online,
		"offline"	=>	$result_offline,
		"total"	=>	$result_total,
		"uptime" => $result_uptime
	];
	
	echo json_encode($result_data);
?>