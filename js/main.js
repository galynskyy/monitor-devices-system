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
		NotifyDeviceOn();
		NotifyDeviceOff();
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
		setInterval(NotifyDeviceOn, 5000);
		setInterval(NotifyDeviceOff, 5000);
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
				if(data.uptime == 100)
				{
					$("#monitor_server_status").removeClass("status-offline");
					$("#monitor_server_status").addClass("status-online");
					$("#monitor_server_status").html("Отлично");
				}
				else
				{
					$("#monitor_server_status").removeClass("status-online");
					$("#monitor_server_status").addClass("status-offline");
					$("#monitor_server_status").html("Плохо");
				}
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
				if(data.uptime == 100)
				{
					$("#monitor_computer_status").removeClass("status-offline");
					$("#monitor_computer_status").addClass("status-online");
					$("#monitor_computer_status").html("Отлично");
				}
				else
				{
					$("#monitor_computer_status").removeClass("status-online");
					$("#monitor_computer_status").addClass("status-offline");
					$("#monitor_computer_status").html("Плохо");
				}
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
				if(data.uptime == 100)
				{
					$("#monitor_video_status").removeClass("status-offline");
					$("#monitor_video_status").addClass("status-online");
					$("#monitor_video_status").html("Отлично");
				}
				else
				{
					$("#monitor_video_status").removeClass("status-online");
					$("#monitor_video_status").addClass("status-offline");
					$("#monitor_video_status").html("Плохо");
				}
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
				if(data.uptime == 100)
				{
					$("#monitor_printer_status").removeClass("status-offline");
					$("#monitor_printer_status").addClass("status-online");
					$("#monitor_printer_status").html("Отлично");
				}
				else
				{
					$("#monitor_printer_status").removeClass("status-online");
					$("#monitor_printer_status").addClass("status-offline");
					$("#monitor_printer_status").html("Плохо");
				}
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
				if(data.uptime == 100)
				{
					$("#monitor_network_status").removeClass("status-offline");
					$("#monitor_network_status").addClass("status-online");
					$("#monitor_network_status").html("Отлично");
				}
				else
				{
					$("#monitor_network_status").removeClass("status-online");
					$("#monitor_network_status").addClass("status-offline");
					$("#monitor_network_status").html("Плохо");
				}
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
				if(data.uptime == 100)
				{
					$("#monitor_phone_status").removeClass("status-offline");
					$("#monitor_phone_status").addClass("status-online");
					$("#monitor_phone_status").html("Отлично");
				}
				else
				{
					$("#monitor_phone_status").removeClass("status-online");
					$("#monitor_phone_status").addClass("status-offline");
					$("#monitor_phone_status").html("Плохо");
				}
			}
		});
	}
	function NotifyDeviceOn()
	{
		$.ajax({
			url: "../ajax/notify/on.php",
			dataType: "json",
			success: function(data){
				$.each(data, function(i, item) {
					$.notify("Устройство " + item.name + " включилось", "success");
				});
			}
		});
	}
	function NotifyDeviceOff()
	{
		$.ajax({
			url: "../ajax/notify/off.php",
			dataType: "json",
			success: function(data){
				$.each(data, function(i, item) {
					$.notify("Устройство " + item.name + " выключилось", "error");
				});
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
					if(data.status == 0)
					{
						$("#status_result_find").removeClass("status-online");
						$("#status_result_find").addClass("status-offline");
						$("#status_result_find").html("Выключен");
					}
					else
					{
						$("#status_result_find").removeClass("status-offline");
						$("#status_result_find").addClass("status-online");
						$("#status_result_find").html("Работает");
					}
				}
			});
		}
	});
	
	$("#form_add").on("submit", function()
	{
		var name_form = $("#name_form_add");
		var ip_form = $("#ip_form_add");
		var type_form = $("#type_form_add");
		var pass_form = $("#pass_form_add");
		
		if(name_form.val() == "")
		{
			name_form.focus();
		} else if (ip_form.val() == "") {
			ip_form.focus();
		} else if (type_form.val() == "") {
			type_form.focus();
		} else if (pass_form.val() == "") {
			pass_form.focus();
		} else
		{
			$.ajax({
				type: "POST",
				url: "../ajax/other/add.php",
				data: {"name": name_form.val(), "ip": ip_form.val(), "type": type_form.val(), "pass": pass_form.val()},
				dataType: "json",
				success: function(data){
					$.notify(data.status, "info");
				}
			});
		}
	});
	
	$("#form_remove").on("submit", function()
	{
		var ip_form = $("#ip_form_remove");
		var pass_form = $("#pass_form_remove");
		
		if(ip_form.val() == "")
		{
			ip_form.focus();
		} else if (pass_form.val() == "") {
			pass_form.focus();
		} else
		{
			$.ajax({
				type: "POST",
				url: "../ajax/other/remove.php",
				data: {"ip": ip_form.val(), "pass": pass_form.val()},
				dataType: "json",
				success: function(data){
					$.notify(data.status, "info");
				}
			});
		}
	});
	$("#form_change").on("submit", function()
	{
		var test = $("#sel-test").val();
		console.log(test);
	});
/* /Action */