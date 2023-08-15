using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models.Domain;
using Models.Requests;
using Services;
using Services.Interfaces;
using Web.Controllers;
using Web.Models.Responses;
using System;

namespace Web.Api.Controllers
{
    [Route("api/clients/income")]
    [ApiController]
    public class ClientIncomeApiController : BaseApiController
    {
        private IClientIncomeService _service = null;
        private IAuthenticationService<int> _authService = null;
        public ClientIncomeApiController(IClientIncomeService service
        , ILogger<LookUpApiController> logger
        , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }



        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ClientIncomeWithAdditional model)
        {

            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddWithAdditional(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
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


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<ClientIncome>> GetByClientAdditional(int Id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                ClientIncome clientIncome = _service.GetByClientAdditional(Id);
                if (clientIncome == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<ClientIncome> { Item = clientIncome };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        }


        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(ClientIncomeUpdateRequest modelUpdate)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(modelUpdate, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }


        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
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
}
