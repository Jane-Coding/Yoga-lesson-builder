
async function fetchData(url, id){
    try {
        const response = await fetch(`${url}/${id}`)
        const data = await response.json()
        return data
    }
    catch(err){
        console.log(err);
    }
}

export default fetchData