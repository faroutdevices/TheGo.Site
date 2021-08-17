using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.Extensions.Configuration;
//using System.Text.Json;

//using Microsoft.WindowsAzure.Storage.Table.TableQuery;
//using Microsoft.Azure.CosmosDB.


namespace TheGoSite.Function
{
    public static class HttpTrigger_GetUserList
    {
        [FunctionName("HttpTrigger_GetUserList")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HttpTrigger_GetUserList function processed a request.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            string responseMessage = string.IsNullOrEmpty(name)
                ? "nothing in querystring or body"
                : "got the {name}";

                GetFromAzureTable();

            return new OkObjectResult(responseMessage);
        }


        public static async Task GetFromAzureTable()
        {
          //ILogger log;
            Boolean bSuccess = false;
            var config = new ConfigurationBuilder().AddEnvironmentVariables().Build();

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(config["AzureTableConnection"]);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference("SourceOfRequest");


            CustomerEntity customer = new CustomerEntity("Harp", "Walter")
            {
                Email = "Walter@contoso.com",
                PhoneNumber = "425-555-0101"
            };

            //MergeUser(table, customer).Wait();
            //QueryUser2(table, "Harp", "Walter").Wait();
            QueryUser3(table);

// var query = from entity in dataServiceContext.CreateQuery<RecordEntity>(table)
//                  where entity.PartitionKey == "MyPartitionKey"
//                  select new { entity.RowKey };
          // TableQuery<RecordEntity> query = new TableQuery<RecordEntity>(); //.Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "thegosite1"));
          // //TableQuery<RecordEntity> query = new TableQuery<RecordEntity>().Select(new string[] { "Path_Requested" });

          // TableContinuationToken continuationToken = null;
          // TableQuerySegment<RecordEntity> tableQueryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);

            // try

            // catch (Exception ex)
            // {
            //     bSuccess = false;
            // }

            //string kdkdkd = "sdfdsfa";
            //return kdkd;
            //return bSuccess;
        }

                public static async Task MergeUser(CloudTable table, CustomerEntity customer) {
            TableOperation insertOrMergeOperation = TableOperation.InsertOrMerge(customer);

            // Execute the operation.
            TableResult result = await table.ExecuteAsync(insertOrMergeOperation);
            CustomerEntity insertedCustomer = result.Result as CustomerEntity;

            Console.WriteLine("Added user.");
        }

        public static async Task QueryUser(CloudTable table, string firstName, string lastName) {
            TableOperation retrieveOperation = TableOperation.Retrieve<CustomerEntity>(firstName, lastName);

            TableResult result = await table.ExecuteAsync(retrieveOperation);
            CustomerEntity customer = result.Result as CustomerEntity;

            if (customer != null)
            {
                Console.WriteLine("Fetched \t{0}\t{1}\t{2}\t{3}",
                    customer.PartitionKey, customer.RowKey, customer.Email, customer.PhoneNumber);
            }
        }

        //well this gets one specific record based on partition and rowkey
        public static async Task QueryUser2(CloudTable table, string firstName, string lastName) {
            TableOperation retrieveOperation = TableOperation.Retrieve<RecordEntity>("thegosite1","*");
            //TableOperation retrieveOperation = TableOperation.Retrieve<RecordEntity>("thegosite1","1340c39e-f783-4935-8fc2-4570ab8f8d4b");
            TableResult result = await table.ExecuteAsync(retrieveOperation);
            RecordEntity customer = result.Result as RecordEntity;
            if (customer != null)
            {
                Console.WriteLine("Fetched \t{0}\t{1}\t{2}\t{3}",
                    customer.PartitionKey, customer.RowKey, customer.Timestamp);
            }
        }

        public static async Task QueryUser3(CloudTable table) {
                TableQuery<RecordEntity> query = new TableQuery<RecordEntity>();
                //.Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "thegosite1"));

    TableContinuationToken tct = null;
            //TableResult result = await TableQuery.
    var blah = await table.ExecuteQuerySegmentedAsync(query,tct);

            // foreach (RecordEntity customer in table.ExecuteAsync(query))
            // {
            //     //Console.WriteLine(customer.CustomerName + " " + customer.CustomerEmail);
            // }

        }






//         public static async Task QueryUser3(CloudTable table, string firstName, string lastName) {
// TableQuery<RecordEntity> query = new TableQuery<RecordEntity>();

// TableResult result = await table.ExecuteAsync(query);

// foreach (RecordEntity entity in table.ExecuteQuery(query))
// {
//     Console.WriteLine("{0}, {1}\t{2}\t{3}", entity.PartitionKey, entity.RowKey,
//                         entity.Field1, entity.Field2);
// }


            // TableOperation retrieveOperation = TableOperation.

            // TableResult result = await table.ExecuteAsync(retrieveOperation);
            // RecordEntity customer = result.Result as RecordEntity;
            // if (customer != null)
            // {
            //     Console.WriteLine("Fetched \t{0}\t{1}\t{2}\t{3}",
            //         customer.PartitionKey, customer.RowKey, customer.Timestamp);
            // }
       // }


    public class CustomerEntity : TableEntity
    {
        public CustomerEntity() {}
        public CustomerEntity(string lastName, string firstName)
        {
            PartitionKey = lastName;
            RowKey = firstName;
        }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    }


// public Async myasynchMethod()
// {

// do
// {
//     // Retrieve a segment (up to 1,000 entities).
//     TableQuerySegment<RecordEntity> tableQueryResult = await table.ExecuteQuerySegmentedAsync(query, continuationToken);

//     // Assign the new continuation token to tell the service where to
//     // continue on the next iteration (or null if it has reached the end).
//     continuationToken = tableQueryResult.ContinuationToken;

//     // Print the number of rows retrieved.
//     Console.WriteLine("Rows retrieved {0}", tableQueryResult.Results.Count);

// // Loop until a null continuation token is received, indicating the end of the table.
// } while(continuationToken != null);

// }

}
