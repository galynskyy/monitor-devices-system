<?php
	try {
		$conn = new PDO("mysql:host=localhost;dbname=monitor", "monitor", "monitor12qwaszxQWAS");
		$conn->exec("set names utf8");
	}
	catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	
	$query = $conn->prepare("SELECT name, ip, down, up, type, status FROM devices WHERE ip = :ip");
	$query->bindParam(":ip", $_POST["ip"], PDO::PARAM_STR, 18);
	$query->execute();
	$result = $query->fetchAll(PDO::FETCH_ASSOC);
	
	$query = $conn->prepare("SELECT COUNT(id) FROM info WHERE status = :status and ip = :ip");
	$query->bindValue(":status", "0", PDO::PARAM_STR);
	$query->bindParam(":ip", $_POST["ip"], PDO::PARAM_STR, 18);
	$query->execute();
	$result_offline = $query->fetchColumn();
	
	echo json_encode(array(
		"name" => $result[0]["name"],
		"ip" => $result[0]["ip"],
		"down" => $result[0]["down"],
		"up" => $result[0]["up"],
		"type" => $result[0]["type"],
		"offline" => $result_offline[0],
		"status" => $result[0]["status"]
	));
?>