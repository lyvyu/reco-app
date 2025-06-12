import {Box, Stack, TextField, Typography} from "@mui/material";
import {DataGrid, type GridColDef, type GridFilterModel} from "@mui/x-data-grid";
import {useEffect, useMemo, useRef, useState} from "react";
import {useGridData} from "./hooks/useGridData.tsx";

export const Discovery = () => {
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

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });
    const queryOptions = useMemo(
        () => ({...paginationModel, filterModel}),
        [paginationModel, filterModel],
    );
    const {data, fetchData, isLoading} = useGridData();
    console.log(queryOptions);

    const rowCountRef = useRef(data?.totalCount || 0);

    const rowCount = useMemo(() => {
        if (data?.totalCount !== undefined) {
            rowCountRef.current = data.totalCount;
        }
        return rowCountRef.current;
    }, [data?.totalCount]);
    const applyFilter = (event: Event, filterName: string) => {
        setFilterModel({
            ...filterModel,
            [filterName]: event.target.name,
        })
    }

    useEffect(() => {
        const params = {
            pageNumber: queryOptions.page ?? 0,
            pageSize: queryOptions.pageSize ?? 25
        }

        fetchData(params)
    }, [fetchData, queryOptions]);

    return (
        <Stack direction="row" spacing={2}>
            <Box sx={{flexGrow: 1}}>
                <DataGrid
                    columns={columns}
                    rows={data?.appRows ?? []}
                    getRowId={(row) => row.appId}
                    rowCount={rowCount}
                    loading={isLoading}
                    pageSizeOptions={[25, 50]}
                    paginationModel={paginationModel}
                    filterModel={filterModel}
                    paginationMode="server"
                    filterMode="server"
                    onPaginationModelChange={setPaginationModel}
                    onFilterModelChange={setFilterModel}
                >

                </DataGrid>
            </Box>

            <Box sx={{flexGrow: 1, width: '250px'}}>
                <Stack direction="column" spacing={2}>
                    <Typography component='span'>Filters</Typography>

                    <TextField label="Name Filter" variant="outlined" onChange={(e) => applyFilter(e, 'appName')}/>
                    <TextField label="CategoryFilter" variant="outlined" onChange={(e) => applyFilter(e, 'category')}/>
                </Stack>
            </Box>
        </Stack>
    );
};

