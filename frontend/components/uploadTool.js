import { useState } from 'react';
import sendToServer from '@/pages/api/sendToServer';

export default function Upload({ setRefreshNeeded }) {
    const [selectedDocument, setSelectedDocument] = useState(null);

    const uploadToClient = (event) => {
        if(event.target && event.target.files) {
            setSelectedDocument(event.target.files[0]);
        }
    };

    const uploadToServer = () => {
        if (document) {
            sendToServer(selectedDocument).then(() => {
                setRefreshNeeded(true);
                setSelectedDocument(undefined);
            })
        }
    };

    return (
        <div>
            <div>
                <h4>Select Document</h4>
                <input type="file" name="documentUpload" onChange={uploadToClient} />
                <button
                    className="btn btn-blue"
                    type="submit"
                    onClick={uploadToServer}
                >
                    Upload
                </button>
            </div>
        </div>
    );
}