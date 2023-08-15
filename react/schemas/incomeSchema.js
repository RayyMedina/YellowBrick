import * as Yup from "yup";

const incomeSchema = Yup.object().shape({
      clientId: Yup.number(),
      annualIncome: Yup.number().required("Annual Income is Required").min(0).typeError("Salary must be greater than or equal to 0"),
      bonus: Yup.number().min(0).typeError("must be number"),
      taxRefund: Yup.number().min(0).typeError("must be number"),
      commissions: Yup.number().min(0).typeError("must be number"),
      spouseAnnualIncome: Yup.number().min(0).typeError("must be number"),
      spouseBonus: Yup.number().min(0).typeError("must be number"),
      spouseTaxRefund: Yup.number().min(0).typeError("must be number"),
      spouseCommissions: Yup.number().min(0).typeError("must be number"),
      hasAdditionalIncome: Yup.bool(),

        addIncome: Yup.array().of(Yup.object().shape({

        additionalIncomeTypeId: Yup.number().min(0),
        
        amount: Yup.number().min(0).typeError("must be number")}))
  });


  export default incomeSchema;
