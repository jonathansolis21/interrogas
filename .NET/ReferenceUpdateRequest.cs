public class ReferenceUpdateRequest : ReferenceAddRequest, IModelIdentifier
{
	[Required]
	[Range(1,Int32.MaxValue)]
	public int Id { get; set; }
}
