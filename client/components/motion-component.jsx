import Paper from '@mui/material/Paper'
import LoadingButton from '@mui/lab/LoadingButton'
import { motion } from "framer-motion"

export const MotionButton = props => {
    return (
        <LoadingButton
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            {...props}
        >
            {props.children}
        </LoadingButton>
    )
}

export const MotionPaper = props => {
    return (
        <Paper
            component={motion.div}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring", bounce: .5, }}
            viewport={{ once: true }}
            {...props}
        >
            {props.children}
        </Paper>
    )
}