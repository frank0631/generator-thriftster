# Hraesvelgr

the root project contains the build logic written in Gradle. It declares each of the subprojects, sets up the relationships between them, and also includes some common docker properties needed to build images and containers.

# Veorfolnir
A container for the mongo database. It does not use volumes to mount data outside the container, so when the container is destroyed, so is the data.

# Nidhogg
This contains the thrift source, and generates the Javascript and Java sources then packages them into zip files (this could also be pushed to an artifact repo). The zipped up generated classes then get coppied and expanded to the other subprojects.

# Huginn
A Spring Boot backend. It uses the generated thrift Service interfaces and Classes to implement Spring Boot defined handelers, controllers, and repositories. It uses JPA for annotating extensions of the thrift classes to be mapped to the MongoDB. It links to Veorfolnir in the container.

# Ratatoskr
An angular frontend scaffoled by the yeoman angular generator. It demonstrates how to use both the thrift generated async calls and using rest endpoints. When run locally, it uses compass to serve the frontend, and ng-constant to change where the Huginn address is. When dockerized, it uses a nginx proxyy to route api and data calls to the Huginn address, which is given through docker environment variables set through linking containers. It links to Huginn in the container.

# Muninn
A Java client that demonstrates how to use the thrift generated Java classes as a client to Huginn.

 ***

# TODO
-    Document all the nooks and crannies of getting thrift classes mapped with Hibernate/JPA (orm.xml)
-    Document the routing of the api & data endpoints through nginx (proxy.conf)
-    Document the creation of the docker containers locally vs on the web
-    Document the nick nacks of HATEOS endpoints in angular clients
-    Site the resources used to help make this project (credit where credit is due)
-    Wrap the whole thing up into a yeoman generator to reuse this fullstack out of the box
