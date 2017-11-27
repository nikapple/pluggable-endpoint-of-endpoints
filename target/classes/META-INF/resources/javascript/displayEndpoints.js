$(document).ready(function(){
	//get all endpoints
	console.log("js here!");
	$.ajax({
		url:ctx+'/endpoint/endpoints',
		type : 'GET',
		dataType:'json',
		success: function(response){
			addEndpointsHtml(response);
		}
	});

	//display endpoints response
	function addEndpointsHtml(endpointsMap)
	{
		var endpointList = $("<ul></ul>");
		$.each(endpointsMap, function(name,requestInfoMap){
			var endpointListItem = $("<li class='endpoint-item'></li>");
			endpointListItem.append("<button class='endpoint-details-dropdown-button'>"+name+"</button>");
			var dropdownEndpointDetails = $("<ul class='endpoint-details-dropdown-list'></ul>");
			dropdownEndpointDetails.hide();
			$.each(requestInfoMap, function(type,value){
				dropdownEndpointDetails.append("<li>"+type+" : "+value+"</li>");
			});
			endpointListItem.append(dropdownEndpointDetails);
			endpointList.append(endpointListItem);
		});
		$("#endpoint-details-container").append(endpointList);
	}

	//toggle endpoint details list
	$("#endpoint-details-container").on("click",".endpoint-details-dropdown-button",function(){
		$(this).parent().find(".endpoint-details-dropdown-list").toggle();
	})

});
