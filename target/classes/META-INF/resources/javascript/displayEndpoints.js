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
			endpointListItem.append("<button class='endpoint-details-dropdown-button'>"+removeSquareBrackets(name)+"</button>");
			
			var dropdownEndpointDetailsContainer = $('<div class="endpoint-details-dropdown-container"></div>');
			dropdownEndpointDetailsContainer.hide();
			
			var dropdownEndpointDetailsTable = $("<table class='endpoint-details-dropdown-table'></table>");
			$.each(requestInfoMap, function(key,value){
				var formattedData = removeSquareBrackets(value);
				dropdownEndpointDetailsTable.append("<tr><th class="+key+" data-value="+formattedData+">"+key+"</th><td>"+formattedData+"</td></tr>");
			});
			dropdownEndpointDetailsTable.append("<tr><th><button class='endpoint-test-button'>Test Endpoint</button></th></tr>");
			dropdownEndpointDetailsContainer.append(dropdownEndpointDetailsTable);
			endpointListItem.append(dropdownEndpointDetailsContainer);
			endpointList.append(endpointListItem);
		});
		$("#endpoint-details-container").append(endpointList);
	}

	//toggle endpoint details list
	$("#endpoint-details-container").on("click",".endpoint-details-dropdown-button",function(){
		$(this).closest(".endpoint-item").find(".endpoint-details-dropdown-container").toggle();
	})
	
	function removeSquareBrackets(stringVal){
		if(stringVal.charAt(0)==='[')
			return stringVal.slice(1,stringVal.length-1);
		return stringVal;
	}

});
