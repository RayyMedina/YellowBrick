import * as Yup from "yup";

const employmentSchema = Yup.object().shape({

      clientId: Yup.number(),
      isSelfEmployed: Yup.string().min(1).required("Self Employed Field is Required!"),
      clientOccupation: Yup.string().min(2).required("Client Occupation is Required!"),
      employer: Yup.string().min(2).typeError("Required if Employed"),
      jobTitle: Yup.string().min(2).typeError("Required if Job Title"),
      yearsEmployed: Yup.number().required("Years Employed is Required!"),
      isSpouseSelfEmployed: Yup.string().min(1).nullable(),
      spouseOccupation: Yup.string().nullable(),
      spouseEmployer: Yup.string().nullable(),
      spouseYearsEmployed: Yup.number().nullable(),
  });

  export default employmentSchema;
