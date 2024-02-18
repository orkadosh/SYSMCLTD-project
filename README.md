
# WebApi-SYSMCLTD.customerManagment.Api(Net 7.0)
Open SYSMCLTD.customerManagment.Api project in terminal and type the commands below:

# 1.Add migrations:
 dotnet ef migrations add CustomerMigration -c CustomerDbContext
# 2.Create the database: 
 dotnet ef database update --context CustomerDbContext


# Client app-SYSMCLTD.customerManagment.Web(Angular 17)
Open SYSMCLTD.customerManagment.Web project and open the terminal In src folder   project :

run npm install
Type command : ng serve


# Database:
* Server/Host: localhost or 127.0.0.1 
* Username: sa
* Password: StrongP@ssw0rd
