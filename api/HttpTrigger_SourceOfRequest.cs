using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.Extensions.Configuration;

namespace TheGoSite.Function
{
    public class HttpTrigger_SourceOfRequest : DataConnectAzureAbstractClass
    {
        [FunctionName("HttpTrigger_SourceOfRequest")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HttpTrigger_SourceOfRequest function processed a request.");

            string sourceOfRequest = req.Query["SourceOfRequest"];
            string beenHereBefore = req.Query["BeenHereBefore"];
            string remoteIpAddress = req.HttpContext.Connection.RemoteIpAddress.ToString();

            RecordEntity record = new RecordEntity();
            record.PartitionKey = "thegosite1";
            record.RowKey = Guid.NewGuid().ToString();
            record.SourceOfRequst = sourceOfRequest;
            record.Client_IP_Address = remoteIpAddress;
            record.Cookie_Previously_Set = beenHereBefore;

            bool result = InsertIntoAzureTable(record);

            return new OkObjectResult(result);
        }
        static Boolean InsertIntoAzureTable(RecordEntity record)
        {
          //ILogger log;
            Boolean bSuccess = false;
            var config = new ConfigurationBuilder().AddEnvironmentVariables().Build();

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(config["AzureTableConnection"]);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference("SourceOfRequest");
            table.CreateIfNotExistsAsync();
            TableOperation insertOperation = TableOperation.Insert(record);

            try
            {
                table.ExecuteAsync(insertOperation);
                bSuccess = true;
                //this seems to return true even when an insert isn't successful
            }
            catch (Exception ex)
            {
                bSuccess = false;
            }

            return bSuccess;
        }

    }
}
