import { FormData } from "../types";
const token = import.meta.env.VITE_AUTH_TOKEN;

export async function patchData(body: Partial<FormData>,id: string) {

    const url: string = `https://hcateringback-dev.unitbeandev.com/api/wh/items${id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `${token}`,
            'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    return data

}