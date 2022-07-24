/*
    v.1.0.0
    REQUIRE:
    
    EX:
        import useForm from './use-form.js'
    
        const [form, handleFormChange, handleFormSubmit] = useForm((form, setForm, ogForm) => {
            console.log(form);
            setForm({});
        }, 'formData');

        <form onSubmit={handleFormSubmit}>
            <input onChange={handleFormChange} />
            <input type='number' onChange={handleFormChange} />
            <input type='file' onChange={handleFormChange} />
            <button type='submit'> submit </button>

            for MUI Date Picker or Time Picker (add 4 parameter e, fieldName, pickerType)
            <TimePicker onChange={e => handleFormChange(e, 'birthDate', 'Date')} /> 
        </form>
    
    OPTIONS & PARAMETER:
        const [form, handleFormChange, handleFormSubmit] = useForm(submitCallback(cleanForm, setForm, orForm), FormData);

        form = form state (same as ogForm in submitCallback())
        handleFormChange = fire when input change (put to onChange of input in form)
        handleFormSubmit = fire suddenly when form submit (put to onSubmit of form)

        useForm(
            submitCallback = fire in handleFormSubmit after form already convert
            ( 
                cleanForm, = form after convert to formData or convert date time string
                setForm, = setSate for ogForm
                ogForm = original form state before convert
            ),
            contentType = contentType enum ['formData', 'json'] : default 'json'
        )
*/

import { useState, useEffect } from "react";

export const useForm = (submitCallback, isFormData) => {
    const [form, setForm] = useState({});
    const [convertForm, setConvertForm] = useState({});

    // reset form state
    useEffect(() => {
        if (Object.keys(form).length === 0) setConvertForm({})
    }, [form])

    const handleFormChange = (e, pickerName, pickerType) => {
        let value = e?.target?.value, convertValue = e?.target?.value;

        // custom for MUI date & time picker
        if (!isNaN(new Date(e))) {
            setForm(prev => ({ ...prev, [pickerName]: e }));
            setConvertForm(prev => ({ ...prev, [pickerName]: e?.[`toLocale${pickerType}String`]('en-GB') || null }));
            return
        }
        
        else if (e.target.type === 'file') {
            value = convertValue = e.target.files[0];
        }
        else if (e.target.type === 'checkbox') {
            value = convertValue = e.target.checked;
        }
        else if (e.target.type === 'date') {
            value = e.target.value;
            convertValue = new Date(e.target.value).toLocaleDateString('en-Gb');
        }

        setForm(prev => ({ ...prev, [e.target.name]: value }))
        setConvertForm(prev => ({ ...prev, [e.target.name]: convertValue }))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        if (!isFormData) return submitCallback(convertForm, setForm, form);

        // convert to formData
        const formData = new FormData();
        for (const key in convertForm) formData.append(key, form[key]);
        submitCallback(formData, setForm, form);
    }

    return [form, handleFormChange, handleFormSubmit];
}