$(document).ready(function()
{
	//display test endpoint form on clicking test button
	$("#endpoint-details-container").on("click",".endpoint-test-button",function()
	{
		displayTestEndpointForm($(this).closest(".endpoint-details-dropdown-container"));
	});
	
	//process submission of test endpoint form
	$("#endpoint-details-container").on('submit','.test-endpoint-form',function(event)
	{
		event.preventDefault();
		endpointItem = $(this).closest(".endpoint-item");
		endpointUrl = endpointItem.find('.endpoint-details-dropdown-button').text();
		requestMethod = endpointItem.find('.requestMethod').data('value');
		var form = $(this);
		$.ajax({
			url:ctx + endpointUrl,
			type : requestMethod,
			headers: getHeaders(form.serializeArray()),
			success: function(response){
				form.closest(".endpoint-item").append(response);
			}
		});
	});
	
	function getHeaders(formData){
		var headers = {};
		for(var i=0 ; i<=formData.length-1 ; i+=2)
		{
			headers[formData[i].value] = formData[i+1].value;
		}
		return headers;
	}
	
	function displayTestEndpointForm(endpointDetailsDropdownContainer)
	{
		// create if not present or toggle form
		endpointDetailsDropdownContainer.has('.test-endpoint-form-container').length ? endpointDetailsDropdownContainer.find('.test-endpoint-form-container').toggle() : createTestEndpointForm(endpointDetailsDropdownContainer);
	}
	
	function createTestEndpointForm(endpointDetailsDropdownContainer)
	{
		var table = $('<table class="test-endpoint-form-container"></table>');
		var form = $('<form class="test-endpoint-form"></form>');
		table.append('<tr><th>Test Request Form</th></tr>');
		table.append('<tr><td><button class="add-header-button" type="button">Add Header</button></td></tr>');
		form.append('<tr><td><input class="fire-request-button" type="submit" value="Fire Request"/></td></tr>');
		table.append(form);
		endpointDetailsDropdownContainer.append(table);
	}
	
	//add header key value inputs to endpoint request form 
	$("#endpoint-details-container").on('click','.add-header-button',function(event){
		event.preventDefault();
		$(this).closest('.test-endpoint-form-container').find(".test-endpoint-form").prepend(createHeaderFormElements());
	});
	
	function createHeaderFormElements(){
		var row = $("<tr></tr>");
		row.append("<th><label for='key'>Key:</label></th>");
		row.append("<td><input type='text' id='key' name='header_key'></td>");
		row.append("<th><label for='value'>Value:</label></th>");
		row.append("<td><input type='text' id='value' name='header_value'></td>");
		return row;
	}
});