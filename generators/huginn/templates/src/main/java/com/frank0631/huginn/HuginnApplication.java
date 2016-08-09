package <%=s_namespace%>.<%=s_project%>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class <%=s_application%> {

    public static void main(String[] args) {
        SpringApplication.run(<%=s_application%>.class, args);
    }

}
