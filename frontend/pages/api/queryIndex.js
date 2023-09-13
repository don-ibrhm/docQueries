const queryIndex = async (queryText) => {
    const queryURL = new URL('http://localhost:8000/query/?');
    queryURL.searchParams.append('text', queryText);

    const response = await fetch(queryURL, {mode: 'cors'});
    // console.log(response);
    if (!response.ok) {
        return {text: 'Error in query', sources: [] };
    }

    const queryResponse = await response.json()

    const formattedResponse =  {
        text: queryResponse.response,
        sources: queryResponse.source_nodes.map((node) => ({
            text: node.node.text,
            doc_id: node.node.id_,
            start: node.node.start_char_idx,
            end: node.node.end_char_idx,
            similarity: node.node.score
        }))
    }

    return formattedResponse
}

export default queryIndex;