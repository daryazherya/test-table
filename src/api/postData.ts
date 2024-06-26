import { FormData} from "../types";
const token = import.meta.env.VITE_AUTH_TOKEN;

export async function postData(body: FormData) {

    const url: string = `https://hcateringback-dev.unitbeandev.com/api/wh/items`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `${token}`,
            'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    return data

}

