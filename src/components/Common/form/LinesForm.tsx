
import AdapterDateFns from '@mui/lab/AdapterDateFns'; // Depending on the library you picked
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'formik-mui-lab';
import * as React from 'react';


export type ValuesType = {
    dateFrom: Date,
    dateTo: Date
  }

type PropsType = {
    handleSubmit: (values: ValuesType) => void
  }

export const LinesForm: React.FC<PropsType> = ({handleSubmit}) => {

    let today = new Date();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
                initialValues={{
                    dateFrom: today,
                    dateTo: today
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        
                        <Field
                            component={DatePicker}
                            //views={['month', 'year']}
                            name="dateFrom"
                            label="Дата від..."
                            //textField={{ helperText: 'Helper text', variant: 'filled' }}
                            inputFormat="dd/MM/yyyy"
                        />    
                        <Field
                            component={DatePicker}
                            //views={['month', 'year']}
                            name="dateTo"
                            label="Дата до..."
                            //textField={{ helperText: 'Helper text', variant: 'filled' }}
                            inputFormat="dd/MM/yyyy"
                        />             

                        <br />
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </LocalizationProvider>
    );
}