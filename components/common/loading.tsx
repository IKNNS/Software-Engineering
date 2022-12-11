import { Backdrop, CircularProgress } from "@mui/material"

interface Props {
    screen?: boolean
}

const Loading: React.FC<Props> = (props) => {


    if (props.screen) {
        return (
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="info" size={30} />
            </Backdrop>
        )
    }

    return (
        <div className={`w-full h-full p-10 flex justify-center items-center`} >
            <CircularProgress color="info" size={30} />
        </div>

    )
}

export default Loading;