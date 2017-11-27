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
			var dropdownEndpointDetailsTable = $("<table class='endpoint-details-dropdown-table'></table>");
			dropdownEndpointDetailsTable.hide();
			$.each(requestInfoMap, function(type,value){
				dropdownEndpointDetailsTable.append("<tr><th>"+type+"</th><td>"+removeSquareBrackets(value)+"</td></tr>");
			});
			endpointListItem.append(dropdownEndpointDetailsTable);
			endpointList.append(endpointListItem);
		});
		$("#endpoint-details-container").append(endpointList);
	}

	//toggle endpoint details list
	$("#endpoint-details-container").on("click",".endpoint-details-dropdown-button",function(){
		$(this).parent().find(".endpoint-details-dropdown-table").toggle();
	})
	
	function removeSquareBrackets(stringVal){
		if(stringVal.charAt(0)==='[')
			return stringVal.slice(1,stringVal.length-1);
		return stringVal;
	}

});
