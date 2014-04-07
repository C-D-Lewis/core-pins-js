//Success handler, unused
var success = function(data, textStatus, jqXHR) {
	console.log("Success? '" + (textStatus == "success" ? "true" : "false") + "'");
}

//Send the request to the Core
var sendRequest = function(pin, on, device_id, access_token) {
	var url;
	if(on) {
		url = "https://api.spark.io/v1/devices/" + device_id + "/on?access_token=" + access_token;
	} else {
		url = "https://api.spark.io/v1/devices/" + device_id + "/off?access_token=" + access_token;
	}

	console.log("jQuery AJAX: Requesting pin " + pin + " " + (on == true ? "on" : "off") + "...");

	//Send request using jQuert AJAX
	$.ajax({
	  type: "POST",
	  url: url,
	  data: {"args":pin},
	  success: success,
	  dataType: "json"
	});
}

//Setup programmatic behavior when layout is ready using jQuery
$(document).ready(function() {
	//Setup button listeners
	var onButton = document.getElementById("b_on");
	onButton.addEventListener("click", function() {
		//Assign objects
		var device_id = document.getElementById('device_id').value;
		var access_token = document.getElementById('access_token').value;
		var pin_number = document.getElementById('pin_number').value;

		sendRequest(pin_number, true, device_id, access_token);
	}, false);

	var offButton = document.getElementById("b_off");
	offButton.addEventListener("click", function() {
		//Assign objects
		var device_id = document.getElementById('device_id').value;
		var access_token = document.getElementById('access_token').value;
		var pin_number = document.getElementById('pin_number').value;

		sendRequest(pin_number, false, device_id, access_token);
	}, false);
});