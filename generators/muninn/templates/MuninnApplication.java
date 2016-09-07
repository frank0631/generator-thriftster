package <%=j_namespace%>.<%=j_project%>;

// #===== yeoman hook import Entity =====#
// import com.frank0631.Nidhogg.book.Book;
// import com.frank0631.Nidhogg.book.BookFormat;

// #===== yeoman hook import Service =====#
// import com.frank0631.Nidhogg.echo.echoService;

import org.apache.thrift.TException;
import org.apache.thrift.TSerializer;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TJSONProtocol;
import org.apache.thrift.protocol.TSimpleJSONProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.THttpClient;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;

import javax.ws.rs.client.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.lang.reflect.Field;

public class <%=j_application%> {
    
    // #===== yeoman hook service endpoint =====#
    private static String echo_endpoint = "/thrift/echo/echo/";
    private static String book_endpoint = "/data/book/";

    private static final int PORT = 9000;
    private static final String HOST = "http://localhost:";

    public static void main(String[] args) {
        try {

            // #===== yeoman hook client setup =====#
            // // Echo setup
            // TTransport echo_transport = new THttpClient(HOST + PORT + echo_endpoint);
            // TProtocol echo_protocol = new TJSONProtocol(echo_transport);
            // echoService.Client echo_client = new echoService.Client(echo_protocol);
            
            // #===== yeoman hook client calls =====#
            // // Echo call
            // echo_transport.open();
            // String echo = echo_client.echo("test for echo");
            // System.out.println("echoService: "+echo);
            // echo_transport.close();
            
            // #===== yeoman hook repository setup =====#
            // // Books setup
            // Book example_book = new Book(
            //     "Philip K. Dick","Do Androids Dream of Electric Sheep?",
            //     "1780220383","9781780220383",BookFormat.PAPERBACK,-63158400);
            // TSerializer serializer = new TSerializer(new TSimpleJSONProtocol.Factory());
            // String book_json = serializer.toString(example_book);
            
            // Client book_client = ClientBuilder.newClient();
            // WebTarget book_target = book_client.target(HOST + PORT + book_endpoint);
            
            // #===== yeoman hook repository calls =====#
            // // Books call
            // Response book_response_post = book_target.request(MediaType.APPLICATION_JSON_TYPE).post(Entity.json(book_json));
            // System.out.println("Book post status: "+book_response_post.getStatus());
            // System.out.println("Book post body: \n"+book_response_post.readEntity(String.class));
            
            // Response book_response_get = book_target.request(MediaType.APPLICATION_JSON_TYPE).get();
            // System.out.println("Book get status: "+book_response_get.getStatus());
            // System.out.println("Book get body: \n"+book_response_get.readEntity(String.class));
            
        } catch (TTransportException e) {
            e.printStackTrace();
        } catch (TException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
