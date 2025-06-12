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
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ResponseType | null>(null);
    const fetchData = useCallback(async (options?: RequestOptions) => {
        setIsLoading(true);

        try {
            const response = await fetch('https://recotest.pythonanywhere.com/api/v1/app-service/get-apps', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...(options && {...options}),
                })
            });
            const json = await response.json();

            setData(json);
            // setIsLoading
            console.log(json);
        } catch (error) {
            console.log(error);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        data,
        fetchData,
        isLoading
    };
};
