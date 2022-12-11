import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import React, { useEffect, useMemo, useRef, } from "react";
import moment, { Moment } from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TextField } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

interface DateInputProps {
    defaultValue?: string;
    onChange?: (value: string) => void
}
const DateInput: React.FC<DateInputProps> = (props: DateInputProps) => {

    const [date, setDate] = React.useState<Moment>();

    useEffect(() => {
        if (props.defaultValue) {
            setDate(moment(props.defaultValue));
            props.onChange?.(moment(props.defaultValue).toISOString())
        } else {
            setDate(moment());
            props.onChange?.(moment().toISOString())
        }
    }, [props.defaultValue]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className="flex flex-col w-full gap-2">
                <DatePicker
                    value={date}
                    openTo="day"
                    onChange={(newDate) => {
                        const date = newDate as moment.Moment;
                        setDate(date);
                        props.onChange?.(date.toISOString())
                    }}
                    componentsProps={{ actionBar: { actions: ["today", "accept"] } }}
                    renderInput={(params) =>
                        <div onClick={params.onClick} className="px-3 py-1 flex flex-row rounded-xl w-full">
                            <TodayIcon color="secondary" sx={{ mr: 1, position: "relative" }} />
                            วันที่ {date?.format("DD/MM/YYYY")}
                            <EditRoundedIcon color="secondary" sx={{ ml: 1, position: "relative" }} />
                        </div>
                    }
                />
                <TimePicker
                    value={date}
                    onChange={(newDate) => {
                        const date = newDate as moment.Moment;
                        setDate(date);
                        props.onChange?.(date.toISOString())
                    }}
                    renderInput={(params) =>
                        <div onClick={params.onClick} className="px-3 py-1 flex flex-row rounded-xl w-full">
                            <TodayIcon color="secondary" sx={{ mr: 1, position: "relative" }} />
                            เวลา {date?.format("HH:mm")}
                            <EditRoundedIcon color="secondary" sx={{ ml: 1, position: "relative" }} />
                        </div>
                    }
                />
            </div>
        </LocalizationProvider>
    )
}

export default DateInput;