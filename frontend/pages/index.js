import Image from 'next/image'
import logo from '../public/images/logo.png'
import { Inter } from 'next/font/google'
import { Fragment, useState } from 'react'
import DocumentViewer from '../components/documentViewer.js'
import UserMenu from '../components/userMenu.js'
import ChatWithDocument from '../components/chatWithDocument.js'
import Header from '../components/header.js'
import Upload from '../components/uploadTool.js'
import Query from '../components/queryTool.js'
import Documents from '../components/documentTool.js'
import { Grid, Stack, TextField, Button, InputAdornment, Divider, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Typography, Card, CardContent } from '@mui/material'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Home() {
    const [refreshNeeded, setRefreshNeeded] = useState(true)

    return (
        <Grid 
            container 
            height='100%'
            justifyContent="center" 
            alignItems="center" 
            spacing={3}
            className="p-1">
            <Grid item container xs={4} justifyContent="center" alignItems="center" spacing={2}>
                <Grid item px={0}>
                    <Stack spacing={2} margin={2}>
                        <Image
                            src={logo}
                            width={135}
                            height={30}
                            alt="DivergeGPT Product Logo"
                        />

                        <DocumentViewer refreshNeeded={refreshNeeded} setRefreshNeeded={setRefreshNeeded}/>
                    </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item container xs={8} classNames="p-7 m-4" justifyContent="center" alignItems="center" spacing={5}>
                {/* <Header /> */}
                <UserMenu />
                <ChatWithDocument />
                {/* <div className='content'>
                    <Upload setRefreshNeeded={setRefreshNeeded}/>
                    <Query />
                </div> */}

            </Grid>
            
        </Grid>
    )
}
