import { Autocomplete, AutocompleteRenderGetTagProps, Chip, TextField } from "@mui/material"
import React, { ReactNode } from "react";

interface Props {
    value?: string[];
    onChange?: (value: string[]) => void;
    label?: string;
    icon?: ReactNode
    list?: string[]
    color?: Map<string, string>
}

const AutoInput: React.FC<Props> = ({ list, icon, value, onChange, label, color }) => {

    return (
        <div className="flex flex-row items-start justify-center gap-3 w-full">
            {icon}
            <Autocomplete
                multiple
                limitTags={5}
                id="multiple-limit-tags"
                options={list ?? []}
                value={value ?? []}
                onChange={(e, v) => onChange?.(v)}
                getOptionLabel={(option) => option}
                renderTags={(value, props) => <RenderTags value={value} props={props} color={color} />}
                renderInput={(params) => (
                    <TextField {...params} placeholder={label} variant="standard" />
                )}
                sx={{ width: "100%" }}
            />
        </div>
    )
}

export default AutoInput

interface RenderTagsProps {
    value: string[],
    props: AutocompleteRenderGetTagProps
    color?: Map<string, string>
}

const RenderTags: React.FC<RenderTagsProps> = ({ value, props, color }) => {

    return (
        <React.Fragment>
            {
                value.map((value, index) =>
                    <React.Fragment key={index}>
                        <Chip {...props({ index })}
                            label={value}
                            sx={{ background: color?.get(value) }}
                        />
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}