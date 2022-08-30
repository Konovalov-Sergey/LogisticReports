
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DesktopDatePicker } from 'formik-mui-lab';
import Button from '@mui/material/Button';

const DisplayingErrorMessagesSchema =  yup.object().shape({
  dateFrom: yup
    .date().nullable()
    .typeError('Start date is required')
    .required('Start Date is required'),

  dateTo: yup
    .date().nullable()
    .when("dateFrom",
    (dateFrom, yup) => dateFrom && yup.min(dateFrom, "End date cannot be before start time"))
    .required('End Date is required')            
    .typeError('Enter a value End date')   
});

type PropsType = {
 handleSubmit: (values: ValuesType) => void
}

export type ValuesType = {
  dateFrom: null | Date,
  dateTo: null | Date
}

export const DateValidationWithFormik: React.FC<PropsType> = ({handleSubmit}) => {

  let today = new Date();

  return (
   <div>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
     <Formik
       initialValues={{
         dateFrom: null,
         dateTo: null,
       }}
       validationSchema={DisplayingErrorMessagesSchema}
       onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false)
      }}
     >
       {({ errors, touched, values }) => (
         <Form>
           <Field 
              component={DesktopDatePicker}
              views={['year', 'month', 'day' ]}
              inputFormat="dd/MM/yyyy"
              name="dateFrom"
              label="Дата від..."              />
           {touched.dateFrom && errors.dateFrom && <div>{errors.dateFrom}</div>}

           <Field              
              component={DesktopDatePicker}
              name="dateTo"
              label="Дата до..."
              views={['year', 'month', 'day']}
              inputFormat="dd/MM/yyyy"
            />
            {touched.dateTo && errors.dateTo && <div>{errors.dateTo}</div>}
           
            <Button
              type="submit"
              variant="contained"
              color="primary"              
            >
              Submit
            </Button>
         </Form>
       )}
     </Formik>
     </LocalizationProvider>
   </div>

     )  
}