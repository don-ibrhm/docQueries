import { TextField, Button, Divider } from '@mui/material'
import { styled } from '@mui/material/styles';
import Documents from './documentTool.js'
import sendToServer from '@/pages/api/sendToServer';

import { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

export default function DocumentViewer({refreshNeeded, setRefreshNeeded}) {
    const [selectedFile, setSelectedFile] = useState(null);

    function handleUpload() {
        if (selectedFile) {
            sendToServer(selectedFile).then(() => {
                setRefreshNeeded(true);
                setSelectedFile(undefined);
            })
        }
    }
    
    return (
        <>
            <TextField fullWidth id="search-document" label="Search" variant="outlined" />
            <Divider />
            <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
            >
                Upload a file
                <VisuallyHiddenInput type="file" onChange={(event) => {console.log(event); setSelectedFile(event.target.files[0]); handleUpload()}}/>
            </Button>
            <Divider className='h-full'/>
            <Documents refreshNeeded={refreshNeeded} setRefreshNeeded={setRefreshNeeded}/>
        </>
    )
}