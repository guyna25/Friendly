import { Box, Typography } from "@mui/material"
import React from "react";
import { HEADER_BACKGROUND_COLOR } from "../theme/Colors";

const AppHeader = (props: { title: string }) => {
    return <Box sx={{ backgroundColor: HEADER_BACKGROUND_COLOR}}>
        <Typography variant="h1"> {props.title} </Typography>;
    </Box>;
};

export default AppHeader;