import { color } from "@libs/color-map"
import { Button } from "@mui/material"
import AutoInput from "components/common/AutoInput"
import { useEffect, useState } from "react"

interface ListProps {
    label: string,
    value?: string[],
    data?: string[],
    onCancel?: () => void
    onSave?: (value: string[]) => void
}

const EditForm: React.FC<ListProps> = (props) => {

    const [select, setSelect] = useState<string[]>()
    const [data, setData] = useState<string[]>()

    useEffect(() => {

        setSelect(props.value ?? [])
        setData(props.data ?? [])

    }, [props.value, props.data])

    return (
        <div className="relative w-screnn h-[calc(100vh*0.5)] bg-white overflow-auto shadow-out flex flex-col justify-start items-center gap-3 p-4">
            <div className="text-left w-full py-2">
                <h3>{props.label}</h3>
            </div>
            <AutoInput label={props.label}
                value={select}
                onChange={(v) => setSelect(v)}
                list={data}
                color={color}
            />
            <div className="bg-white flex flex-row justify-between w-full p-4 mt-auto absolute bottom-0 shadow-out">
                <Button color="inherit" onClick={() => props.onCancel?.()}>
                    กลับ
                </Button>
                <Button onClick={() => props.onSave?.(select ?? [])}>
                    บันทึก
                </Button>
            </div>
        </div>
    )
}

export default EditForm;

