$(document).ready(function(){
	//get all endpoints
	console.log("js here!");
	$.ajax({
		url:ctx+'/endpoint/endpoints',
		type : 'GET',
		dataType:'json',
		success: function(response){
			addEndpoints(response);
		}
	});
	
	function addEndpoints(endpointsMap)
	{
		var endpointList = $("<ul></ul>");
		$.each(endpointsMap, function(name,requestInfoMap){
			endpointList.append("<li>"+name+"</li>");
			$.each(requestInfoMap, function(type,value){
				endpointList.append("<li>"+type+" : "+value+"</li>");
			});
		});
		$("#endpoint-details-container").append(endpointList);
	}
	
});

