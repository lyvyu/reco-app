import {Box, Stack,} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../sidebar/Sidebar.tsx";

export const MainLayout = () => {

    return (
        <Box sx={{height: '100vh'}}>
            <Stack direction="row" spacing={2} sx={{height: '100%'}}>
                <Sidebar/>

                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Outlet></Outlet>
                </Box>
            </Stack>
        </Box>
    );
};
