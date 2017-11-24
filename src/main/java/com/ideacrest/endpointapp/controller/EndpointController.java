package com.ideacrest.endpointapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Controller
public class EndpointController {
	
	private final RequestMappingHandlerMapping handlerMapping;

	@Autowired
	public EndpointController(RequestMappingHandlerMapping handlerMapping) {
		this.handlerMapping = handlerMapping;
	}
	
	@RequestMapping(value="/endpointdoc", method=RequestMethod.GET)
	public String show() {
		return "endpoints";
	}
	
	@ResponseBody
	@RequestMapping(value = "/endpoints", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE )
	public Map<String,String> getEndpoints() {
		Map<String,String> handlerMethodsJson = new HashMap<>();
		Map<RequestMappingInfo, HandlerMethod> handlerMethodsMap = this.handlerMapping.getHandlerMethods();

		for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : handlerMethodsMap.entrySet())
		{
			handlerMethodsJson.put(entry.getValue().toString(), entry.getKey().getPatternsCondition().getPatterns().toString());
		}
		return handlerMethodsJson;
	}
	
}
