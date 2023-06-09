using Microsoft.AspNetCore.Mvc;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.LookUps;
using Sabio.Models.Requests.Reference;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ReferenceService : IReferenceService
    {
        IDataProvider _data = null;
        IInstitutionMapper _institutionMapper = null;
        public ReferenceService(IDataProvider data, IInstitutionMapper institutionMapper)
        {
            _data = data;
            _institutionMapper = institutionMapper; 
        }
        public int Add(ReferenceAddRequest model)
        {
            string procName = "[dbo].[References_Insert]";
            int id = 0;
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection refCol)
            {
                MapParams(model, refCol); 
                SqlParameter refIdOut = new SqlParameter("@Id", SqlDbType.Int);
                refIdOut.Direction = ParameterDirection.Output;
                refCol.Add(refIdOut);
            },
            delegate (SqlParameterCollection returnRefCol)
            {
                object oId = returnRefCol["@Id"].Value;
                Int32.TryParse(oId.ToString(), out id);
            });
            return id; 
        }
        public void Update(ReferenceUpdateRequest model)
        {
            string procName = "[dbo].[References_Update]";
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection refCol)
            {
                refCol.AddWithValue("@Id", model.Id);
                MapParams(model, refCol); 
            },
            returnParameters: null); 
        }
        public Reference Get(int id)
        {
            string procName = "[dbo].[References_SelectByIdV2]";
            Reference reference = null;
            _data.ExecuteCmd(procName,
            delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@Id", id);
            },
            delegate (IDataReader reader, short set)
            {
                reference = MapReference(reader, out int startingIndex);
            });
            return reference; 
        }
        public Paged<Reference> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[References_SelectAllV2]";
            Paged<Reference> pagedList = null;
            List<Reference> list = null;
            int totalCount = 0;
            _data.ExecuteCmd(procName,
            (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                Reference aReference = MapReference(reader, out int startingIndex);
                totalCount = reader.GetInt32(startingIndex++);
                if (list == null)
                {
                    list = new List<Reference>();
                }
                list.Add(aReference);
            });
            if (list != null)
            {
                pagedList = new Paged<Reference>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void StatusUpdate(int id)
        {
            string procName = "[dbo].[References_DeleteByStatusUpdate]";
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection refCol)
            {
                refCol.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }
        public Reference MapReference(IDataReader reader, out int startingIndex)
        {
            Reference aReference = new Reference();
            startingIndex = 0;
            aReference.Id = reader.GetSafeInt32(startingIndex++);
            aReference.Name = reader.GetSafeString(startingIndex++);
            aReference.Date = reader.GetSafeDateTime(startingIndex++); 
            aReference.FileId = reader.GetSafeInt32(startingIndex++);
            aReference.FileName = reader.GetSafeString(startingIndex++);
            aReference.ElectionYear = reader.GetSafeInt32(startingIndex++);
            aReference.StatusId = reader.GetSafeInt32(startingIndex++);
            aReference.Status = reader.GetSafeString(startingIndex++);
            aReference.Institution = _institutionMapper.MapInstitution(reader, ref startingIndex);
            return aReference;
        }
        private static void MapParams(ReferenceAddRequest model, SqlParameterCollection refCol)
        {
            refCol.AddWithValue("@Date", model.Date);
            refCol.AddWithValue("@RefName", model.RefName);
            refCol.AddWithValue("@FileId", model.FileId);
            refCol.AddWithValue("@ElectionYear", model.ElectionYear);
            refCol.AddWithValue("@StatusId", model.StatusId);
            refCol.AddWithValue("@Name", model.Name);
            refCol.AddWithValue("@SiteUrl", model.SiteUrl);
            refCol.AddWithValue("@LogoUrl", model.LogoUrl);
            refCol.AddWithValue("@StateId", model.StateId);
            refCol.AddWithValue("@Code", model.Code);
        }
    }
}

