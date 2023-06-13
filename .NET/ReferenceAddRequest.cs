using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interrogas.Models.Requests.Reference
{
    public class ReferenceAddRequest
    {
		[Required]
		public DateTime Date { get; set; }
		[Required]
		[StringLength (255, MinimumLength = 2)]
		public string RefName { get; set; }
		[Required]
		[Range(1, Int32.MaxValue)]
		public int FileId { get; set; }
		[Required]
		[Range(1992, 2060)]
		public int ElectionYear { get; set; }
		[Required]
		[Range(1,Int32.MaxValue)]
		public int StatusId { get; set; }
		[Required]
		[StringLength(255, MinimumLength = 2)]
		public string Name { get; set; }
		[Required]
		[Url]
		[StringLength(255, MinimumLength = 9)]
		public string SiteUrl { get; set; }
		[Required]
		[Url]
		[StringLength(255, MinimumLength = 9)]
		public string LogoUrl { get; set; }
		[Required]
		[Range(1,Int32.MaxValue)]
		public int StateId { get; set; }
		[Required]
		[StringLength(6, MinimumLength = 2)]
		public string Code { get; set; }
	}
}
