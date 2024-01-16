export async function getClient() {
    try{
        const response = await fetch("http://localhost:9000/api/clients");
        if (!response.ok){
            throw new NetworkError();
        }
        const data = await response.json();
        return data;
    }catch(err){
        throw err;
    }
}

class NetworkError extends Error {
    constructor () {
        super("Network error");
    }
}