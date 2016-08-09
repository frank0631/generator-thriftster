package <%=s_namespace%>.<%=s_project%>;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;


@Configuration
class AppConfigMongoDB extends AbstractMongoConfiguration {

    @Autowired
    private Environment env;

    @Override
    @Bean
    public Mongo mongo() throws Exception {
        try {
            String host = env.getProperty("VEOR_PORT_27017_TCP_ADDR");
            int port = Integer.parseInt(env.getProperty("VEOR_PORT_27017_TCP_PORT"));
            System.out.println("MongoConfig host:" + host + " port:" + port);
            return new MongoClient(host, port);
        } catch (Exception ex) {
            return new MongoClient();
        }
    }

    @Override
    protected String getDatabaseName() {
        return "springdata";
    }

}