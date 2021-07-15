using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;

namespace TheGoSite.Function
{
    public class RecordEntity : TableEntity
    {
        public RecordEntity(string skey, string srow)
        {
            this.PartitionKey = skey;
            this.RowKey = srow;
        }

        public RecordEntity() { }
        public string SourceOfRequst { get; set; }
        public string Client_IP_Address { get; set; }
        public bool Cookie_Previously_Set { get; set; }
    }
}
