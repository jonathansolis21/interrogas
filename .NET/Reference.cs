using Sabio.Models.Domain.LookUps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Reference
    {
        public int Id { get; set; }
        public Institution Institution { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public int FileId { get; set; }
        public string FileName { get; set; }
        public int ElectionYear { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
    }
}
