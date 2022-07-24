/*
    REQUIRE:
        - npm i @mui/material @5.8.6
        - npm i @fortawesome/react-fontawesome @0.2.0
        - npm i @fortawesome/fontawesome-svg-core @6.1.1
        - npm i @fortawesome/free-solid-svg-icons @6.1.1

        { MotionButton } from './motion-component'
    
    EX:
        import DialogConfirm, { dialogConfirm } from './dialog-confirm.jsx';
        const [isDialogConfirmOpen, setIsDialogConfirmOpen] = useState(false);

        dialogConfirm(isDialogConfirmOpen, () => { alert('you confirm') }, 'confirm ?', 'please confirm this action');

        <DialogConfirm /> // recommended to import in app.js

    OPTIONS & PARAMETER:
        dialogConfirm(
            open = toggle is dialog open,
            callback = fire when click confirm in dialog,
            title = title in dialog : default 'Please Confirm'
            desc = desc in dialog : default 'Are you sure? this action cannot undo.'
        )
*/

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { useState } from "react";
import { MotionButton } from './motion-component';
import { Divider, IconButton } from '@mui/material';

export let dialogConfirm;

export default function DialogConfirm() {
    const defaultVal = {
        open: false,
        callback: () => { },
        title: 'Please Confirm',
        desc: 'Are you sure? this action cannot undo.'
    }

    const [config, setConfig] = useState(defaultVal);

    dialogConfirm = (open, callback, title, desc) => {
        setConfig({
            open: open || defaultVal.open,
            callback: callback || defaultVal.callback,
            title: title || defaultVal.title,
            desc: desc || defaultVal.desc
        })
    }

    return (
        <Dialog
            open={config.open}
            maxWidth='xs'
            fullWidth
            sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
        >
            <Stack justifyContent='space-between' alignItems='center' sx={{ px: 2, py: 1 }}>
                <Typography color='primary' variant='h6' sx={{ mb: -1 }} > <b> {config.title} </b> </Typography>
                <IconButton
                    sx={{ bgcolor: ({ palette }) => palette.iconButton.bg, color: ({ palette }) => palette.iconButton.color }}
                    onClick={() => dialogConfirm(false)}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider sx={{ my: 0 }} />
            <DialogContent >
                <Typography > {config.desc} </Typography>
                <br />
                <br />
                <Stack justifyContent='end' spacing={2} >
                    <MotionButton onClick={() => dialogConfirm(false)} > CANCEL </MotionButton>
                    <MotionButton
                        variant='contained'
                        onClick={() => {
                            config.callback();
                            dialogConfirm(false);
                        }}
                    >
                        CONFIRM
                    </MotionButton>
                </Stack>

            </DialogContent>
        </Dialog>
    )
}
