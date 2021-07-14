using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text.Json;
using System.Linq;


namespace TheGoSite.Function
{
    public abstract class DataConnectAzureAbstractClass
    {
        public static string connectionString = "DefaultEndpointsProtocol=https;AccountName=thegosite1;AccountKey=PrDRf2DX/SY/FXW42vCF4868+ggQnLIQs/96b3+WtMB3pFGc8TC+/dhiD70uFEW+8cO3VDaTgJ3KrsbQUURXOg==;EndpointSuffix=core.windows.net";
    }
}
