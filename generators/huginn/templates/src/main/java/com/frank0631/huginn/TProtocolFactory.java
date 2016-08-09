package <%=s_namespace%>.<%=s_project%>;

import org.apache.thrift.protocol.TJSONProtocol;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class TProtocolFactory {

    @Bean
    public org.apache.thrift.protocol.TProtocolFactory tProtocolFactory() {
        //return new TBinaryProtocol.Factory();
        return new TJSONProtocol.Factory();
    }
}
