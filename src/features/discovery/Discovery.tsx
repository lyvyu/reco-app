import {Box, Stack, TextField, Typography} from "@mui/material";
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {useEffect, useState } from "react";
import {useGridData} from "./hooks/useGridData.tsx";

export const Discovery = () => {
    const {data, fetchData} = useGridData();
    const columns: GridColDef[] = [
        {field: 'appName', headerName: 'Name', flex: 1},
        {field: 'category', headerName: 'Category', flex: 1},
        {
            field: 'appSources',
            headerName: 'Connection',
            flex: 1,
            valueGetter: (value: string[]) => {
                return value?.join(', ') ?? '';
            }
        },
    ];
    const applyFilter = (event: Event, filterName: string) => {
        const value = event?.target.value;

        if (value) {
            fetchData({[filterName]: value})
        } else {
            fetchData();
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Stack direction="row" spacing={2}>
            <Box sx={{flexGrow: 1}} >
                <DataGrid
                    columns={columns}
                    rows={data ?? []}
                    getRowId={(row) => row.appId}
                    pageSizeOptions={[5, 10, 25]}
                >

                </DataGrid>
            </Box>

            <Box sx={{flexGrow: 1, width: '250px'}}>
                <Stack direction="column" spacing={2}>
                    <Typography component='span'>Filters</Typography>

                    <TextField label="Name Filter" variant="outlined" onChange={(e) => applyFilter(e, 'appName')} />
                    <TextField label="CategoryFilter" variant="outlined" onChange={(e) => applyFilter(e, 'category')} />
                </Stack>
            </Box>
        </Stack>
    );
};

