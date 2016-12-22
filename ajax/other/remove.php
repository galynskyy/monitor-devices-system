<?php
	if($_POST["pass"] == "pass")
	{
		try {
			$conn = new PDO("mysql:host=localhost;dbname=base", "user", "pass");
			$conn->exec("set names utf8");
		}
		catch (PDOException $e) {
			echo "Connection failed: " . $e->getMessage();
		}
	
		$query = $conn->prepare("DELETE FROM devices WHERE ip = :ip");
		$query->bindParam(":ip", $_POST["ip"], PDO::PARAM_STR, 18);
		$query->execute();
		$result = $query->fetchColumn();
		
		
		if($query->rowCount() > 0)
		{
			$status = "Запись успешно удалена";
		}
		else
		{
			$status = "Запись не найдена";
		}
		
		echo json_encode(array(
			"status" =>	$status
		));
	}
	else
	{
		echo json_encode(array(
			"status" =>	"Пароль не правильный"
		));
	}
?>