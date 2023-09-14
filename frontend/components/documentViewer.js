import Documents from './documentTool.js'
import sendToServer from '@/pages/api/sendToServer';

import { useState } from 'react';

import { TextField, Button, Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, useTheme,  } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';


import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';


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

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#EE3368',
            '--TextField-brandBorderHoverColor': '#EE3368',
            '--TextField-brandBorderFocusedColor': '#EE3368',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });


export default function DocumentViewer({refreshNeeded, setRefreshNeeded}) {
    const [selectedFile, setSelectedFile] = useState(null);

    const outerTheme = useTheme();

    function handleUpload() {
        console.log("Trying to upload")
        if (selectedFile) {
            sendToServer(selectedFile).then(() => {
                setRefreshNeeded(true);
                setSelectedFile(undefined);
            })
        }
    }
    
    return (
        <Stack
            divider={<Divider flexItem />}
            spacing={{ xs: 4}}
            alignItems="center"
            alignSelf="flex-start"
            className="m-0">
            <ThemeProvider theme={customTheme(outerTheme)} textAlign="left" spacing={0}>
                {/* <Typography fullWidth className="h-1/3 w-5/6">
                    Search
                </Typography> */}
                <TextField  
                    id="search-document" 
                    sx={{fontFamily:"DM Sans"}}
                    label="Search File Name" 
                    variant="outlined"
                    className="w-5/6 h-auto"
                    InputProps={{
                        endAdornment: <SearchIcon />,
                    }}
                    InputLabelProps={{
                        style: {
                            marginLeft: 3,
                            color: "#C0C0C0", 
                            fontFamily: "DM Sans",
                            fontSize: 15
                        }
                    }} 
                />
            </ThemeProvider>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <Button
                    sx={{fontFamily:"Open Sans",
                    textTransform: "none",fontWeight: 700,}}
                    component="label"
                    variant="outlined"
                    className="w-5/6"
                    href="#file-upload"
                    color="secondary"
                >
                    +   Upload files
                    <VisuallyHiddenInput type="file" onChange={(event) => {console.log(event); setSelectedFile(event.target.files[0]); handleUpload()}}/>
                </Button>
            </ThemeProvider>
            <Documents refreshNeeded={refreshNeeded} setRefreshNeeded={setRefreshNeeded}/>
        </Stack>
    )
}