package com.albatross.bareungeulssi.web.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class CustomRequestInterceptor implements HandlerInterceptor {

    //request URI 로그 찍기
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().equals("POST")) {
            log.info("{} :: {}", request.getMethod(), request.getRequestURI().toString());
        }
        //log.info("{} :: {}", request.getMethod(), request.getRequestURI().toString());
        return true;
    }
}
