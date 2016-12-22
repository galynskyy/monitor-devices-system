<?php
	/* SQL */
		/* Connect */
			try
			{
				$conn = new PDO("mysql:host=localhost;dbname=base", "user", "pass");
				$conn->exec("set names utf8");
			}
			catch (PDOException $e)
			{
				echo "Connection error: " . $e->getMessage();
			}
		/* /Connect */
		/* Query */
			$query = $conn->prepare("SELECT COUNT(id) FROM devices");
			$query->execute();
			$dev_count = $query->fetchColumn();
			
			$query = $conn->prepare("SELECT COUNT(DISTINCT(name)) AS amount, time, status FROM info WHERE time > DATE_SUB(NOW(), INTERVAL 7 DAY) AND status = :status GROUP BY EXTRACT(DAY FROM time) ORDER BY time");
			$query->bindValue(":status", "0", PDO::PARAM_STR);
			$query->execute();
			$result = $query->fetchAll();
			foreach($result as $row)
			{
				if(count($result) == 0)
				{
					$amount[] = 100;
				}
				else
				{
					$amount[] = (100 - (round(($row["amount"] * 100) / $dev_count)));
				}
			}
			
			foreach($result as $row)
			{
				$time[] = date("d.m.y", strtotime($row["time"]));
			}
			
			echo json_encode(array(
				"amount" => $amount,
				"time" => $time
			), JSON_NUMERIC_CHECK);
		/* /Query */
	/* /SQL */
?>