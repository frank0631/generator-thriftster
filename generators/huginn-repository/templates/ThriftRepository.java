package <%=s_namespace%>.<%=s_project%>.<%=t_object%>;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "<%=t_object%>", path = "<%=t_object%>")
public interface <%=s_object%>Repository extends CrudRepository<<%=s_object%>Entity, String> {

    //List<<%=s_object%>Entity> findByFieldName(@Param("fieldName") String fieldName);

}
