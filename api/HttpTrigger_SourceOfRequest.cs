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

namespace TheGoSite.Function
{
    public class HttpTrigger_SourceOfRequest : DataConnectAzureAbstractClass
    {
        [FunctionName("HttpTrigger_SourceOfRequest")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["SourceOfRequest"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a SourceOfRequest in the query string to use."
                : $"This HTTP triggered function executed successfully and a SourceOfRequest was recorded.";

                RecordEntity record = new RecordEntity();
                record.PartitionKey = "thegosite1";
                record.RowKey = Guid.NewGuid().ToString();
                record.SourceOfRequst = name;

                bool result = InsertIntoAzureTable(record);
                responseMessage = "Table insert resulted in: " + result.ToString();

            return new OkObjectResult(responseMessage);
        }


        static Boolean InsertIntoAzureTable(RecordEntity record)
        {
          //ILogger log;
            Boolean bSuccess = false;

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
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
