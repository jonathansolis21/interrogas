public interface IReferenceService
{
    public int Add(ReferenceAddRequest model);
    void Update(ReferenceUpdateRequest model);
    public Reference Get(int id);
    public Paged<Reference> Pagination(int pageIndex, int pageSize);
    public void StatusUpdate(int id); 
}

