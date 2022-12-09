import { FormControl, Input, InputLabel } from "@mui/material"
import React, { ReactNode, useState } from "react";

import ShowIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import HiddenIcon from '@mui/icons-material/VisibilityOffOutlined';

interface Props {
    value?: string | number;
    onChange?: (value: string) => void;
    label?: string;
    type?: string;
    start?: ReactNode
    icon?: ReactNode
    required?: boolean
    err?: boolean
    onlyText?: boolean
    param?: any
}

const InputText: React.FC<Props> = ({ param, onlyText, err, required, icon, value, onChange, label, type, start }) => {

    const isPassword = type && type == "password"
    const [hidden, setHidden] = useState(true)

    const HiddenButton = isPassword && (
        <div className=" cursor-pointer" onClick={() => setHidden(!hidden)}>
            {
                hidden ? <ShowIcon color='secondary' /> : <HiddenIcon color='secondary' />
            }
        </div>
    )

    const handleInput = (value: string) => {
        if (onlyText && value.match(/[^\u0E00-\u0E7FA-Z]/ig)) return;
        onChange?.(value)
    }

    return (
        <div className="flex items-center justify-center gap-3 w-full">
            {icon}
            <FormControl fullWidth variant="standard">
                <InputLabel>{label}</InputLabel>
                < Input type={hidden ? type : 'text'}
                    value={value}
                    onChange={(e) => handleInput(e.target.value)}
                    endAdornment={HiddenButton}
                    required={required}
                    error={err}
                />
            </FormControl>
        </div>
    )
}

export default InputText