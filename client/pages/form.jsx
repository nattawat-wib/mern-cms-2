import { Avatar, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import Link from 'next/Link';
import axios from '../utils/axios';
import { MotionButton, MotionPaper } from '../components/motion-component';
import { useForm } from '../utils/use-form';
import { useState } from 'react';

export default function Contact() {
    const [convertForm, setConvertForm] = useState({});
    const [isFormData, setIsFormData] = useState(false);

    const [form, handleFormChange, handleFormSubmit] = useForm((form, setForm) => {
        axios('get', 'https://dog.ceo/api/breeds/image/random')
        setConvertForm(form);
    }, isFormData);

    return (
        <Container
            component='form'
            onSubmit={handleFormSubmit}
            sx={{ p: 4, mx: 'auto' }}
            maxWidth='md'
        >
            <Grid container spacing={2} justifyContent='space-around'>
                <Grid item xs={12} sm={6}>
                    <b> original data : </b>
                    <pre> {JSON.stringify(form, undefined, 2)} </pre>

                    <br />
                    <br />

                    <b> convert data : </b>
                    <pre> {JSON.stringify(convertForm, undefined, 2)} </pre>

                    <br />
                    <br />

                    <FormControlLabel
                        label="convert to FormData"
                        control={<Checkbox onChange={() => setIsFormData(prev => !prev)} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MotionPaper sx={{ p: 2 }} elevation={8}>
                        <Typography textAlign='center'> Form </Typography>

                        <TextField
                            onChange={handleFormChange}
                            value={form.firstName || ''}
                            name='firstName'
                            variant='standard'
                            label='first name'
                            sx={{ my: 0 }}
                        />

                        <TextField
                            onChange={handleFormChange}
                            value={form.tel || ''}
                            name='tel'
                            variant='standard'
                            label='tel'
                            type='number'
                        />

                        <TextField
                            onChange={handleFormChange}
                            value={form.htmlDate || ''}
                            name='htmlDate'
                            variant='outlined'
                            label='htmlDate'
                            type='date'
                            focused
                        />

                        <TextField
                            onChange={handleFormChange}
                            value={form.htmlTime || ''}
                            name='htmlTime'
                            variant='outlined'
                            label='htmlTime'
                            type='time'
                            focused
                        />

                        <DatePicker
                            label='birth date'
                            inputFormat='dd/MM/yyyy'
                            name='birthDate'
                            disableFuture
                            value={form.birthDate || null}
                            onChange={e => handleFormChange(e, 'birthDate', 'Date')}
                            renderInput={prop => <TextField {...prop} />}
                        />

                        <TimePicker
                            label='time'
                            inputFormat='HH:mm'
                            name='time'
                            ampm={false}
                            value={form.time || null}
                            onChange={e => handleFormChange(e, 'time', 'Time')}
                            renderInput={prop => <TextField {...prop} />}
                        />

                        <RadioGroup row name='gender' onChange={handleFormChange} value={form.gender || ''} >
                            <FormControlLabel value='female' control={<Radio />} label='Female' />
                            <FormControlLabel value='male' control={<Radio />} label='Male' />
                            <FormControlLabel value='other' control={<Radio />} label='Other' />
                        </RadioGroup>

                        <FormGroup row>
                            <FormControlLabel onChange={handleFormChange} checked={form.cookies || false} name='cookies' control={<Checkbox />} label="cookies" />
                            <FormControlLabel onChange={handleFormChange} checked={form.salad || false} name='salad' control={<Checkbox />} label="salad" />
                        </FormGroup>

                        <TextField
                            onChange={handleFormChange}
                            value={form.country || ''}
                            name='country'
                            select
                        >
                            <MenuItem disabled selected value=''> Select your country </MenuItem>
                            <MenuItem value='Thai'> Thai </MenuItem>
                            <MenuItem value='USA'> USA </MenuItem>
                            <MenuItem value='China'> China </MenuItem>
                            <MenuItem value='Korea'> Korea </MenuItem>
                        </TextField>

                        <Button component='label'>
                            {form.avatar && <Avatar src={URL.createObjectURL(form.avatar)} sx={{ mr: 1 }} />}
                            select image
                            <input
                                name='avatar'
                                onChange={handleFormChange}
                                type='file'
                                hidden
                            />
                        </Button>

                        <br />
                        <br />
                        <MotionButton
                            type='submit'
                            variant='contained'
                            fullWidth
                        >
                            Submit
                        </MotionButton>

                    </MotionPaper>
                    <br />
                </Grid>
            </Grid>
        </Container >
    )
}