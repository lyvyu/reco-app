import {useCallback, useState} from "react";

type Row = {
    appId: string;
    appName: string;
    appSources: string[];
    category: string;
};
type ResponseType = {
    appRows: Row[];
    totalCount: number;
};
type RequestOptions = {
    appName: string;
    category: string;
};

export const useGridData = () => {
    const [data, setData] = useState<ResponseType | null>(null);
    const fetchData = useCallback(async (options?: RequestOptions) => {
        try {
            const response = await fetch('https://recotest.pythonanywhere.com/api/v1/app-service/get-apps', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...(options && {...options}),
                    pageNumber: 0,
                    pageSize: 25
                })
            });
            const json = await response.json();

            setData(json.appRows);
            console.log(json);
        } catch (error) {
            console.log(error);
            setData(null);
        }
    }, []);

    return {
        data,
        fetchData
    };
};
