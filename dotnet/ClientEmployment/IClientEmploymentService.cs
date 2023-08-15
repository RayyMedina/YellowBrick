using Models.Domain;
using Models.Requests;

namespace Services.Interfaces
{
    public interface IClientEmploymentService
    {
        int Add(ClientEmploymentAddRequest model, int userId);

        ClientEmployment GetByClientId(int clientId);

        void Update(ClientEmploymentUpdateRequest model, int userId);

        void Delete(int id);
    }
}
