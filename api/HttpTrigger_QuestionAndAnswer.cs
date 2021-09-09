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
using System.Text.Json;

namespace TheGoSite.Function
{
    public class HttpTrigger_QuestionAndAnswer : DataConnectAzureAbstractClass
    {
        [FunctionName("HttpTrigger_QuestionAndAnswer")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", "put", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HttpTrigger_QuestionAndAnswer function processed a request.");


            string question = req.Query["Question"];
            string beenHereBefore = req.Query["BeenHereBefore"];
            string answer = req.Query["Answer"];
            string answerType = req.Query["AnswerType"];

            QuestionAndAnswer record = new QuestionAndAnswer();
            record.PartitionKey = "thegosite1";
            record.RowKey = Guid.NewGuid().ToString();
            record.Question = question;
            record.Cookie_Previously_Set = beenHereBefore;
            record.Answer = answer;
            record.Answer_Type = answerType;

            bool result = InsertIntoAzureTable(record);

            //create id to be set as cookie value identifying this client/browser
            MyResponseObject mRO = new MyResponseObject();
            // if (beenHereBefore == "")
            // {
            //   mRO.TheGoSiteClientID = Guid.NewGuid().ToString();
            // }

            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
            };
            var jsonVar = System.Text.Json.JsonSerializer.Serialize(mRO, options);

            return new OkObjectResult(jsonVar);

        }
        static Boolean InsertIntoAzureTable(QuestionAndAnswer record)
        {
          //ILogger log;
            Boolean bSuccess = false;
            var config = new ConfigurationBuilder().AddEnvironmentVariables().Build();

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(config["AzureTableConnection"]);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            CloudTable table = tableClient.GetTableReference("QuestionAndAnswer");
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
