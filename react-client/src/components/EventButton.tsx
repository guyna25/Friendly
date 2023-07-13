import { Button } from "@mui/material"
import React from "react"
import { BUTTON_TEXT_COLOR, CARD_BACKGROUND_COLOR, CARD_TEXT_COLOR } from "../theme/Colors"

const BUTTON_STYLE = { color: BUTTON_TEXT_COLOR, borderColor: CARD_TEXT_COLOR, backgroundColor: CARD_BACKGROUND_COLOR }

const EventButton = (props: {
    content: string, onClick?: React.MouseEventHandler<HTMLButtonElement | undefined>, type?: string | undefined
}) => {
    if (props.type==="submit") {
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