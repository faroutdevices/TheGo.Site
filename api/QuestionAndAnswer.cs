using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;

namespace TheGoSite.Function
{
    public class QuestionAndAnswer : TableEntity
    {
        public QuestionAndAnswer(string skey, string srow)
        {
            this.PartitionKey = skey;
            this.RowKey = srow;
        }

        public QuestionAndAnswer() { }
        public string Question { get; set; }
        public string Answer { get; set; }
        public string Answer_Type { get; set; }
        public string Cookie_Previously_Set { get; set; }
    }
}
