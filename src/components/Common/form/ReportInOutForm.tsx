
import AdapterDateFns from '@mui/lab/AdapterDateFns'; // Depending on the library you picked
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from 'formik-mui-lab';
import { Select } from 'formik-mui';
import * as React from 'react';
import { MenuItem } from '@mui/material';

export type ValuesType = {
    wh: string,
    dateFrom: Date,
    dateTo: Date
  }

type PropsType = {
    handleSubmit: (values: ValuesType) => void
  }

export const ReportInOutForm: React.FC<PropsType> = ({handleSubmit}) => {

    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
                initialValues={{
                    wh: 'all',
                    dateFrom: yesterday,
                    dateTo: yesterday
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Field
                            component={Select}
                            id="wh"
                            name="wh"
                            labelId="Warehouse"
                            label="Склад"                            
                        >
                            <MenuItem value={2}>A</MenuItem>
                            <MenuItem value={3}>B</MenuItem>
                            <MenuItem value={1}>C</MenuItem>
                            <MenuItem value={5}>F</MenuItem>
                            <MenuItem value={4}>G</MenuItem>
                            <MenuItem value={'all'}>Всі</MenuItem>
                        </Field>
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