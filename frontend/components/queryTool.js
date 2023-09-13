import { useState } from 'react'
import { BounceLoader } from 'react-spinners'
import queryIndex from '@/pages/api/queryIndex';

export default function Query() {
    const [isLoading, setLoading] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [responseSources, setResponseSources] = useState([]);
     
    const processQuery = async (e) => {
        if (e.key == 'Enter') {
            setLoading(true)
            queryIndex(e.currentTarget.value).then((response) => {
                console.log(response.response)
                console.log(response.source_nodes)
                setLoading(false)
                setResponseText(response.text);
                setResponseSources(response.sources);
            });
        }
    };

    const sourceElems = responseSources.map((source) => {
        const nodeTitle =
            source.doc_id.length > 28
                ? source.doc_id.substring(0, 28) + '...'
                : source.doc_id;
        const nodeText =
            source.text.length > 150 ? source.text.substring(0, 130) + '...' : source.text;
    
        return (
            <div key={source.doc_id} className='query__sources__item'>
                <p className='query__sources__item__id'>{nodeTitle}</p>
                <p className='query__sources__item__text'>{nodeText}</p>
                <p className='query__sources__item__footer'>
                Similarity={source.similarity}, start={source.start}, end=
                    {source.end}
                </p>
            </div>
        );
    });

    return (
        <>
            <div>
                <div>
                    <label htmlFor='query-text'>Ask your question</label>
                    <input
                        type='text'
                        name='query-text'
                        placeholder='What is ...?'
                        onKeyDown={processQuery}
                    ></input>
                </div>
            </div>

            <BounceLoader
                loading={isLoading}
            />
            <div>
                <div className='query__sources__item'>
                <p className='query__sources__item__id'>Query Response</p>
                </div>
                {responseText}
            </div>
            <div>
                <div className='query__sources__item'>
                <p className='query__sources__item__id'>Response Sources</p>
                </div>
                {sourceElems}
            </div>
        </>
    );
}