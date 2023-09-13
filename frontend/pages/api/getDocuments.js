const getDocuments = async () => {
    const queryURL = new URL('http://localhost:8000/documents/');

    try {
        const response = await fetch(queryURL, {mode: 'cors'});
        if (!response.ok) {
            return {text: 'Error in query', sources: [] };
        }
    
        const documentsList = await response.json()
        return documentsList
    } catch {
        return []
    }
    
}

export default getDocuments;