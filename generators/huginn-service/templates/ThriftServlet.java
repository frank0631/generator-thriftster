package <%=s_namespace%>.<%=s_project%>.<%=s_package%>;

import <%=t_namespace%>.<%=t_project%>.<%=t_package%>.<%=t_service%>;

import org.apache.thrift.protocol.TProtocolFactory;
import org.apache.thrift.server.TServlet;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.servlet.Servlet;
import java.util.ArrayList;

@Component
public class <%=s_package%>Servlet {

    @Bean
    public ServletRegistrationBean echo(TProtocolFactory protocolFactory, <%=s_service%> handler) {
        ServletRegistrationBean <%=s_package%>ServletRegisteration = new ServletRegistrationBean();
        Servlet <%=s_package%>Servlet = new TServlet(
            new <%=t_namespace%>.<%=t_project%>.<%=t_package%>.<%=t_service%>.Processor<<%=s_service%>>(handler), protocolFactory);
        ArrayList<String> thriftUrl = new ArrayList<String>();
        thriftUrl.add("/thrift/<%=s_package%>/*");
        <%=s_package%>ServletRegisteration.setServlet(<%=s_package%>Servlet);
        <%=s_package%>ServletRegisteration.setName("<%=s_package%>Servlet");
        <%=s_package%>ServletRegisteration.setUrlMappings(thriftUrl);
        return <%=s_package%>ServletRegisteration;
    }
}
