[Route("api/references")]
[ApiController]
public class ReferenceApiController : BaseApiController
{
    private IReferenceService _service = null;
    public ReferenceApiController(IReferenceService service, ILogger<ReferenceApiController> logger) : base(logger)
    {
        _service = service;
    }
    [HttpPost]
    public ActionResult<ItemResponse<int>> Create(ReferenceAddRequest model)
    {
        ObjectResult result = null;
        try 
        {
            int id = _service.Add(model);
            ItemResponse<int> response = new ItemResponse<int>() { Item = id }; ;
            result = Created201(response);
        }
        catch (Exception ex)
        {
            base.Logger.LogError(ex.ToString());
            ErrorResponse response = new ErrorResponse(ex.Message);
            result = StatusCode(500, response);
        }
        return result;
    }
    [HttpPut("{id:int}")]
    public ActionResult<SuccessResponse> Update(ReferenceUpdateRequest model)
    {
        int code = 200;
        BaseResponse response = null;
        try
        {
            _service.Update(model);
            response = new SuccessResponse();
        }
        catch (Exception ex)
        {
            code = 500;
            response = new ErrorResponse(ex.Message);
        }
        return StatusCode(code, response);
    }
    [HttpGet("{id:int}")]
    public ActionResult<ItemResponse<Reference>> Get(int id)
    {
        int iCode = 200;
        BaseResponse response = null;
        try 
        { 
            Reference reference = _service.Get(id);
            if (reference == null)
            {
                iCode = 404;
                response = new ErrorResponse("Application resource not found."); 
            }
            else
            {
                response = new ItemResponse<Reference> { Item = reference };
            }
        }
        catch (Exception ex)
        {
            iCode = 500;
            base.Logger.LogError(ex.ToString());
            response = new ErrorResponse($"Generic Error: {ex.Message}"); 
        }
        return StatusCode(iCode, response); 
    }
    [HttpGet("paginate")]
    public ActionResult<ItemResponse<Paged<Reference>>> Pagination(int pageIndex, int pageSize)
    {
        ActionResult result = null;
        try
        {
            Paged<Reference> paged = _service.Pagination(pageIndex, pageSize);
            if (paged == null)
            {
                result = NotFound404(new ErrorResponse("Pagination Resource Not Found."));
            }
            else
            {
                ItemResponse<Paged<Reference>> response = new ItemResponse<Paged<Reference>>();
                response.Item = paged;
                result = Ok200(response);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
        }
        return result;
    }
    [HttpPut("status/{id:int}")] 
    public ActionResult<SuccessResponse> DeleteReference(int id)
    {
        int code = 200;
        BaseResponse response = null;
        try
        {
            _service.StatusUpdate(id);
            response = new SuccessResponse();
        }
        catch (Exception ex)
        {
            code = 500;
            response = new ErrorResponse(ex.Message);
        }
        return StatusCode(code, response);
    }
}

