using Amazon.Runtime.Internal;
using Newtonsoft.Json;
using Data;
using Data.Providers;
using Models.Domain;
using Models.Requests;
using Services.ClientServices;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace Services
{
    public class ClientIncomeService : IClientIncomeService
    {
        IDataProvider _data = null;
        IMapBaseUser _mapBaseUser = null;
        IClientService _clientService = null;
        public ClientIncomeService(IDataProvider data, IMapBaseUser mapBaseUser, IClientService clientService)
        {
            _data = data;
            _mapBaseUser = mapBaseUser;
            _clientService = clientService;
        }

        public int Add(ClientIncomeAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[ClientIncome_Insert]";
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

        public int AddWithAdditional(ClientIncomeWithAdditional model, int userId)
        {
            int id = 0;
            DataTable dataTable = null;

            string procName = "[dbo].[ClientIncome_InsertV2]";

            if (model.HasAdditionalIncome && model.AddIncome != null)
            {
                dataTable = new DataTable();
                dataTable.Columns.Add("AdditionalIncomeTypes", typeof(int));
                dataTable.Columns.Add("Amount", typeof(int));

                foreach (var additionalIncome in model.AddIncome)
                {
                    dataTable.Rows.Add(additionalIncome.AdditionalIncomeTypeId, additionalIncome.Amount);
                }
            }

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ClientId", model.ClientId);
                col.AddWithValue("@AnnualIncome", model.AnnualIncome);
                col.AddWithValue("@Bonus", model.Bonus);
                col.AddWithValue("@TaxRefund", model.TaxRefund);
                col.AddWithValue("@Commissions", model.Commissions);
                col.AddWithValue("@SpouseAnnualIncome", model.SpouseAnnualIncome);
                col.AddWithValue("@SpouseBonus", model.SpouseBonus);
                col.AddWithValue("@SpouseTaxRefund", model.SpouseTaxRefund);
                col.AddWithValue("@SpouseCommissions", model.SpouseCommissions);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@HasAdditionalIncome", model.HasAdditionalIncome);
                col.AddWithValue("@AddIncome", dataTable);



                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object objId = returnCol["@Id"].Value;
                int.TryParse(objId.ToString(), out id);
            });

            return id;
        }


        public ClientIncome GetByClientId(int clientId)
        {
            string procName = "[dbo].[ClientIncome_Select_ByClientId]";
            ClientIncome aClientIncome = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@ClientId", clientId);
            }, delegate (IDataReader reader, short set)
            {
                int idx = 0;
                aClientIncome = MapClientIncome(reader, ref idx);
            });
            return aClientIncome;
        }


        public ClientIncome GetByClientAdditional(int id)
        {
            string procName = "[dbo].[ClientIncome_Select_ByClientId]";
            ClientIncome aClientIncome = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int idx = 0;
                aClientIncome = MapClientIncome(reader, ref idx);
            });
            return aClientIncome;
        }


        public void Update(ClientIncomeUpdateRequest model, int userId)
        {
            string procName = "[dbo].[ClientIncome_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            });
        }


        public void Delete(int id)
        {
            string procName = "[dbo].[ClientIncome_DeleteById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }


        public ClientIncome MapClientIncome(IDataReader reader, ref int startingIndex)
        {
            ClientIncome aClientIncome = new ClientIncome();

            aClientIncome.Id = reader.GetSafeInt32(startingIndex++);
            aClientIncome.Client = _clientService.MapClientBase(reader, ref startingIndex);
            aClientIncome.AnnualIncome = reader.GetSafeDecimal(startingIndex++);
            aClientIncome.Bonus = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.TaxRefund = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.Commissions = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.SpouseAnnualIncome = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.SpouseBonus = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.SpouseTaxRefund = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.SpouseCommissions = reader.GetSafeDecimalNullable(startingIndex++);
            aClientIncome.HasAdditionalIncome = reader.GetSafeBool(startingIndex++);
            aClientIncome.AddIncome = reader.DeserializeObject<List<ClientAdditionalIncome>>(startingIndex++);
            aClientIncome.CreatedBy = _mapBaseUser.MapBaseUser(reader, ref startingIndex);
            aClientIncome.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            return aClientIncome;
        }

        private static void AddCommonParams(ClientIncomeAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@ClientId", model.ClientId);
            col.AddWithValue("@AnnualIncome", model.AnnualIncome);
            col.AddWithValue("@Bonus", model.Bonus);
            col.AddWithValue("@TaxRefund", model.TaxRefund);
            col.AddWithValue("@Commissions", model.Commissions);
            col.AddWithValue("@SpouseAnnualIncome", model.SpouseAnnualIncome);
            col.AddWithValue("@SpouseBonus", model.SpouseBonus);
            col.AddWithValue("@SpouseTaxRefund", model.SpouseTaxRefund);
            col.AddWithValue("@SpouseCommissions", model.SpouseCommissions);
            col.AddWithValue("@HasAdditionalIncome", model.HasAdditionalIncome);
            col.AddWithValue("@UserId", userId);
        }
    }
}
