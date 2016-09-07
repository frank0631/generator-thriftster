package <%=s_namespace%>.<%=s_project%>.<%=s_package%>;

import <%=t_namespace%>.<%=t_project%>.<%=t_package%>.<%=t_service%>;
import org.springframework.stereotype.Component;
import org.apache.thrift.TException;

@Component
public class <%=s_service%> implements <%=t_service%>.Iface {

    // public String echo(String input) throws TException {
    //     return input;
    // }

}