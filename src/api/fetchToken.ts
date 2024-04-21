const body = {
    login: 'admin',
    password: 'admin'
}

async function fetchToken() {
    const url: string = `https://hcateringback-dev.unitbeandev.com/api/auth/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(body)
    })
    
    const data = await response.json();
    return data;
}

export const token = await fetchToken().then(data => data.access_token)
