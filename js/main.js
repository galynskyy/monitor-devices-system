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
		GetStatsVideo();
		GetStatsComputer();
	}
	function Update()
	{
		setInterval(GetDevicesOffline, 3000);
		setInterval(GetStatsServer, 3000);
		setInterval(GetStatsNetwork, 3000);
		setInterval(GetStatsPhone, 3000);
		setInterval(GetStatsPrinter, 3000);
		setInterval(GetStatsVideo, 3000);
		setInterval(GetStatsComputer, 3000);
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
	function GetStatsComputer()
	{
		$.ajax({
			url: "../ajax/devices/computer.php",
			dataType: "json",
			success: function(data){
				$("#monitor_computer_online").html(data.online);
				$("#monitor_computer_offline").html(data.offline);
				$("#monitor_computer_total").html(data.total);
				$("#monitor_computer_uptime").html(data.uptime + " %");
			}
		});
	}
	function GetStatsVideo()
	{
		$.ajax({
			url: "../ajax/devices/video.php",
			dataType: "json",
			success: function(data){
				$("#monitor_video_online").html(data.online);
				$("#monitor_video_offline").html(data.offline);
				$("#monitor_video_total").html(data.total);
				$("#monitor_video_uptime").html(data.uptime + " %");
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
	$("#form_find").on("submit", function()
	{
		var ip_form = $("#ip_form_find");
		
		if(ip_form.val() == "")
		{
			ip_form.focus();
		} else
		{
			$.ajax({
				type: "POST",
				url: "../ajax/other/find.php",
				data: {"ip": ip_form.val()},
				dataType: "json",
				success: function(data){
					$("#name_result_find").html(data.name);
					$("#ip_result_find").html(data.ip);
					$("#timed_result_find").html(data.down);
					$("#timeu_result_find").html(data.up);
					$("#type_result_find").html(data.type);
					$("#offline_result_find").html(data.offline);
					$("#status_result_find").html(data.status);
				}
			});
		}
	});
/* /Action */