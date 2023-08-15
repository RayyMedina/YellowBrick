using Data;
using Data.Providers;
using Models.Domain;
using Models.Requests;
using ClientServices;
using Services.Interfaces;
using System;
using System.Data;
using System.Data.SqlClient;


namespace Services
{
    public class ClientEmploymentService : IClientEmploymentService
    {
        IDataProvider _data = null;
        IMapBaseUser _mapBaseUser = null;
        IClientService _clientService = null;
        public ClientEmploymentService(IDataProvider data, IMapBaseUser mapBaseUser, IClientService clientService)
        {
            _data = data;
            _mapBaseUser = mapBaseUser;
            _clientService = clientService;
        }


        public int Add(ClientEmploymentAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[ClientEmployment_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                Int32.TryParse(oId.ToString(), out id);
            });
            return id;
        }


        public ClientEmployment GetByClientId(int Id)
        {
            string procName = "[dbo].[ClientEmployment_Select_ByClientId]";
            ClientEmployment aClientEmployment = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", Id);
            }, delegate (IDataReader reader, short set)
            {
                int idx = 0;
                aClientEmployment = MapClientEmployment(reader, ref idx);

            });
            return aClientEmployment;
        }


        public void Update(ClientEmploymentUpdateRequest model, int userId)
        {
            string procName = "[dbo].[ClientEmployment_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            });
        }


        public void Delete(int id)
        {
            string procName = "[dbo].[ClientEmployment_DeleteById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }


        public ClientEmployment MapClientEmployment(IDataReader reader, ref int startingIndex)
        {
            ClientEmployment aClientEmployment = new ClientEmployment();
            aClientEmployment.Id = reader.GetSafeInt32(startingIndex++);
            aClientEmployment.Client = _clientService.MapClientBase(reader, ref startingIndex);
            aClientEmployment.IsSelfEmployed = reader.GetBoolean(startingIndex++);
            aClientEmployment.ClientOccupation = reader.GetSafeString(startingIndex++);
            aClientEmployment.Employer = reader.GetSafeString(startingIndex++);
            aClientEmployment.JobTitle = reader.GetSafeString(startingIndex++);
            aClientEmployment.YearsEmployed = reader.GetSafeInt32Nullable(startingIndex++);
            aClientEmployment.IsSpouseSelfEmployed = reader.GetBoolean(startingIndex++);
            aClientEmployment.SpouseOccupation = reader.GetSafeString(startingIndex++);
            aClientEmployment.SpouseEmployer = reader.GetSafeString(startingIndex++);
            aClientEmployment.SpouseYearsEmployed = reader.GetSafeInt32Nullable(startingIndex++);
            aClientEmployment.CreatedBy = _mapBaseUser.MapBaseUser(reader, ref startingIndex);
            aClientEmployment.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            return aClientEmployment;
        }

        private static void AddCommonParams(ClientEmploymentAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@ClientId", model.ClientId);
            col.AddWithValue("@isSelfEmployed", model.isSelfEmployed);
            col.AddWithValue("@ClientOccupation", model.ClientOccupation);
            col.AddWithValue("@Employer", model.Employer);
            col.AddWithValue("@JobTitle", model.JobTitle);
            col.AddWithValue("@YearsEmployed", model.YearsEmployed);
            col.AddWithValue("IsSpouseSelfEmployed", model.IsSpouseSelfEmployed);
            col.AddWithValue("@SpouseOccupation", model.SpouseOccupation);
            col.AddWithValue("@SpouseEmployer", model.SpouseEmployer);
            col.AddWithValue("@SpouseYearsEmployed", model.SpouseYearsEmployed);
            col.AddWithValue("@UserId", userId);
        }
    }
}
