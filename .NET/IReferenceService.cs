using Microsoft.AspNetCore.Mvc;
using Interrogas.Models;
using Interrogas.Models.Domain;
using Interrogas.Models.Requests.Reference;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IReferenceService
    {
        public int Add(ReferenceAddRequest model);
        void Update(ReferenceUpdateRequest model);
        public Reference Get(int id);
        public Paged<Reference> Pagination(int pageIndex, int pageSize);
        public void StatusUpdate(int id); 
    }
}
