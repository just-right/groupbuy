package com.example.demo.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

public class ServiceFilter extends ZuulFilter {
    private static Logger logger = LoggerFactory.getLogger(ServiceFilter.class);

    //ip黑名单
    private final static List<String> ipList = Arrays.asList("127.0.0.1");
    @Autowired
    private FilterUtils filterUtils;


    //定义过滤器类型 1)PRE 2)ROUTING 3)POST 4)ERROR
    @Override
    public String filterType() {
        return "pre";
    }

    //定义过滤器优先级 最高为0
    @Override
    public int filterOrder() {
        return 0;
    }

    //是否开启该过滤器
    @Override
    public boolean shouldFilter() {
        return true;
    }

    //是否有关联ID
    private boolean isCorrelationId(){
        if (filterUtils.getCorrelationId()!=null){
            return true;
        }
        return false;
    }

    //主体方法
    @Override
    public Object run() throws ZuulException {
        //获取请求的上下文
        RequestContext context = RequestContext.getCurrentContext();
        //获取request对象
        HttpServletRequest request = context.getRequest();
        String ip =  this.getIpAddr(request);
        //可以设置黑名单

        //避免乱码
        context.getResponse().setHeader("Content-type", "text/json;charset=UTF-8");
        context.getResponse().setCharacterEncoding("UTF-8");


        logger.info(request.getMethod()+request.getRequestURI());


        if (ipList.contains(ip+"test")){
            context.setSendZuulResponse(false);
            context.setResponseBody("您已进入黑名单：非法访问！");
            context.setResponseStatusCode(404);
            //可添加额外参数
            context.set("status","error");
        }
//        if (!isCorrelationId()){ //创建关联ID
//            filterUtils.setCorrelationId(UUID.randomUUID().toString());
//        }
        return null;
    }

    public  String getIpAddr(HttpServletRequest request){

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

}
