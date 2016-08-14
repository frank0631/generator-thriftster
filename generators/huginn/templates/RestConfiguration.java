package <%=s_namespace%>.<%=s_project%>;

// #===== yeoman hook import Entity =====#
// import com.frank0631.huginn.thriftobj.ThriftEntity;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
@EnableAutoConfiguration
public class RestConfiguration extends RepositoryRestMvcConfiguration {
    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        // #===== yeoman hook exposeIdsFor =====#
        // config.exposeIdsFor(ThriftEntity.class);
        config.setReturnBodyOnCreate(true);
        config.setReturnBodyOnUpdate(true);
        config.setBaseUri("data/");
    }
}