import { Button } from "@mui/material"
import React from "react"
import { BUTTON_STYLE } from "../theme/Colors"

const EventButton = (props: {
    content: string, onClick?: React.MouseEventHandler<HTMLButtonElement | undefined>, type?: string | undefined
}) => {
    if (props.type === "submit") {
        return <>
            <Button
                variant='contained'
                type={props.type}
                sx={BUTTON_STYLE}
            >
                {props.content}
            </Button></>
    }
    return <Button
        variant='contained'
        sx={BUTTON_STYLE}
        onClick={props.onClick}    >
        {props.content}
    </Button>
}
export default EventButton;