/* 
    REQUIRE:
        - npm i axios @0.27.2
        - npm i react-hot-toast @2.2.0
    
    EX:
        import axios from './axios.js';
        const [isLoading, setIsLoading] = useState(false);

        axios.('post', '/register', form, resp => {
            console.log(resp)
        }, err => {
            console.log(err)
        }, true, [setIsLoading]);

    OPTIONS & PARAMETER:
        axios.(
            method, = http method [get, post, patch, put, delete, ...other]
            apiURL, 
            data, = data that send to api
            callbackSuccess, = fire when request is success : default () => {}
            callbackFail, = fire when request is fail : default () => {}
            isToast, = define is toast showing : default true
            toggleList = state that value true before request and false when request was end, irrespective success or fail : default []
        );
*/

import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const cancelToken = axios.CancelToken.source();

export default async (
    method,
    url,
    form,
    cbSuccess = () => { },
    cbFail = () => { },
    isToast = true,
    toggleList = []
) => {
    // console.log(useState);
    // console.log('useState +++++');
    // const [id, setId] = useState();

    // loop toggle
    toggleList.forEach(toggle => toggle(true));

    // if (isToast) setId(toast.loading('processing...'));
    // let id;
    // if (isToast) id = toast.loading('processing...');

    return await axios
        .create({
            baseURL: '',
            // withCredentials: true,
            // timeout: 1000 * 10
        })
    [method](url, form)
        .then(resp => {
            try {
                if (cbSuccess) cbSuccess(resp.data);
                // if (isToast) toast.success(resp?.data?.msg || 'success', { id });

                return resp;
            } catch (err) {
                throw (err)
            }
        })
        .catch(err => {
            if (cbFail) cbFail(err);
            // if (isToast) toast.error(err?.response?.data?.msg || err.message || 'fail', { id });

            return err;
        })
        .finally(() => {
            toggleList.forEach(toggle => toggle(false));
        })

    // if (isToast) {
    //     toast.promise(resp, {
    //         loading: 'processing...',
    //         success: resp => resp?.data?.msg || 'success',
    //         error: err => err?.response?.data?.msg || 'fail',
    //     })
    // }
}