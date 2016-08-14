package <%=s_namespace%>.<%=s_project%>.<%=t_object%>;

import <%=t_namespace%>.<%=t_project%>.<%=t_object%>.<%=s_object%>;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class <%=s_object%>Entity extends <%=s_object%> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    public <%=s_object%>Entity() {
    }

    public <%=s_object%>Entity(<%=s_object%> <%=t_object%>) {
        super(<%=t_object%>);
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return String.format("<%=s_object%>[id=%d]",id);
    }
}
