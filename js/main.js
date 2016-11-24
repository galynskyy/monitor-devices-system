/* Auto Run */
	$(function() {
		Run();
		Update();
	});
	function Run()
	{
		GetDevicesOffline();
		GetStatsServer();
		GetStatsNetwork();
		GetStatsPhone();
		GetStatsPrinter();
	}
	function Update()
	{
		setInterval(GetDevicesOffline, 3000);
		setInterval(GetStatsServer, 3000);
		setInterval(GetStatsNetwork, 3000);
		setInterval(GetStatsPhone, 3000);
		setInterval(GetStatsPrinter, 3000);
	}
/* /Auto Run */
/* Action */
	function GetDevicesOffline()
	{
		$.ajax({
			url: "../ajax/devices/all.php",
			dataType: "json",
			success: function(data){
				$("#offline_devices").html("");
				console.log("clear");
				$.each(data, function(i, item) {
					$("#offline_devices").append("<tr>\
						<td>" + item.name + "</td>\
						<td>" + item.ip + "</td>\
						<td>" + item.type + "</td>\
						<td>" + item.down + "</td>\
					</tr>");
				});
			}
		});
	}
	function GetStatsServer()
	{
		$.ajax({
			url: "../ajax/devices/server.php",
			dataType: "json",
			success: function(data){
				$("#monitor_server_online").html(data.online);
				$("#monitor_server_offline").html(data.offline);
				$("#monitor_server_total").html(data.total);
				$("#monitor_server_uptime").html(data.uptime + " %");
			}
		});
	}
	function GetStatsPrinter()
	{
		$.ajax({
			url: "../ajax/devices/printer.php",
			dataType: "json",
			success: function(data){
				$("#monitor_printer_online").html(data.online);
				$("#monitor_printer_offline").html(data.offline);
				$("#monitor_printer_total").html(data.total);
				$("#monitor_printer_uptime").html(data.uptime + " %");
			}
		});
	}
	function GetStatsNetwork()
	{
		$.ajax({
			url: "../ajax/devices/network.php",
			dataType: "json",
			success: function(data){
				$("#monitor_network_online").html(data.online);
				$("#monitor_network_offline").html(data.offline);
				$("#monitor_network_total").html(data.total);
				$("#monitor_network_uptime").html(data.uptime + " %");
			}
		});
	}
	function GetStatsPhone()
	{
		$.ajax({
			url: "../ajax/devices/phone.php",
			dataType: "json",
			success: function(data){
				$("#monitor_phone_online").html(data.online);
				$("#monitor_phone_offline").html(data.offline);
				$("#monitor_phone_total").html(data.total);
				$("#monitor_phone_uptime").html(data.uptime + " %");
			}
		});
	}
/* /Action */