import React from 'react';
import {TextField, Grid, Input} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

const FormInput = ({ name, label}) => {

    const {control} = useForm();
    return (
        <Grid item xs={12} sm={6}>
            {/*<Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label={label} fullWidth required />}
            />*/}
        <Controller
            render={({ field }) => <Input {...field} placeholder={ label } fullWidth />}
            name={name}
            control={ control }
            defaultValue=""
        />
        </Grid>
    );
};

export default FormInput;
