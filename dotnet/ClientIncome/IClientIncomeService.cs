using Models.Domain;
using Models.Requests;

namespace Services.Interfaces
{
    public interface IClientIncomeService
    {
        int Add(ClientIncomeAddRequest model, int userId);

        ClientIncome GetByClientId(int clientId);

        ClientIncome GetByClientAdditional(int clientId);

        void Update(ClientIncomeUpdateRequest model, int userId);

        void Delete(int id);

        int AddWithAdditional(ClientIncomeWithAdditional model, int userId);

    }
}
