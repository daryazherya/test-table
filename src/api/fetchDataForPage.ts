import { token } from "./fetchToken";

export async function fetchDataForPage(page: number, pageSize: number) {

    const url: string = `https://hcateringback-dev.unitbeandev.com/api/wh/items?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type':'application/json',
        }
    })
    const data = await response.json();
    return data

}
