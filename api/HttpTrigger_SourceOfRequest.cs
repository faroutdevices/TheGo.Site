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

using System.Collections.Generic;

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

                //IDictionary<string, string> queryParams = req.GetQueryParameterDictionary();
                //string keke = req.GetQueryParameterDictionary["REMOTE_ADDR"].ToString();
                string remoteIpAddress = req.HttpContext.Connection.RemoteIpAddress.ToString();

                bool beenHereBefore = false;
                string cookieValue = req.Cookies["BeenHereBefore"];

                if (String.IsNullOrEmpty(cookieValue))
                {
                  beenHereBefore = false;
                }
                else
                {
                  beenHereBefore = true;
                }


                // Set a cookie
                CookieOptions option = new CookieOptions();
                option.Expires = DateTime.Now.AddYears(1);
                option.Domain = "www.thego.site";
                option.HttpOnly = true;
                //// A little non logical way to actually get the HttpResponse (from the HttpRequest and its HttpContext)
                req.HttpContext.Response.Cookies.Append("BeenHereBefore", "true", option);


                RecordEntity record = new RecordEntity();
                record.PartitionKey = "thegosite1";
                record.RowKey = Guid.NewGuid().ToString();
                record.SourceOfRequst = name;
                record.Client_IP_Address = remoteIpAddress;
                record.Cookie_Previously_Set = beenHereBefore;
                //Add other details of the users, like client type, language, etc

                bool result = InsertIntoAzureTable(record);
                responseMessage = "Table insert resulted in: " + result.ToString();


            return new OkObjectResult("Client has been here before: " + beenHereBefore.ToString());
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
