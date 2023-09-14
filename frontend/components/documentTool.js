import { useEffect, useState } from 'react';
import Image from 'next/image'
import pdfIcon from "../public/images/pdf.png"
import clockIcon from "../public/images/clock.png"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import FormControlLabel from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import StorageIcon from '@mui/icons-material/Storage';

import "@fontsource/dm-sans"; 
import "@fontsource/open-sans";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import getDocuments from '@/pages/api/getDocuments';

export default function Documents({ refreshNeeded, setRefreshNeeded }) {
    const [checked, setChecked] = useState([0]);
    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
        if (refreshNeeded) {
            getDocuments().then((documents) => {
                setDocumentList(documents)
                setRefreshNeeded(false);
            })
        }
    })

    const nameClip = (name) => name.length > 25 ? name.slice(0, 12) + " ..." : name

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

    setChecked(newChecked);
  };

  if (documentList.length > 0) {
    return (
        <Stack classNames="w-5/6 h-50 overflow-y-auto" spacing={1.5} justifyContent="space-evenly">
            {documentList.map((value, i) => {
                // const labelId = `checkbox-list-label-${i}`;
                return (
                    <Card 
                        key={`${i}${value.slice(0, 3)}`} 
                        sx={{fontFamily: "DM Sans", color: "#5E5E5E", backgroundColor: "#A739FE29", width: 220, height: 60}} 
                        className="w-100 h-18 m-3 px-3 py-2 md:w-100"
                        justifySelf="center">
                        <CardContent className="p-0">
                            <Stack className="w-40 h-11" justifyContent="space-evenly">
                                <Stack direction="row" className="w-full h-4" alignItems="center">
                                    <Image src={pdfIcon} className="w-4 h-4 mr-2"/>
                                    {/* <PictureAsPdfIcon sx={{color: "#E5252A"}} /> */}
                                    <Typography sx={{fontFamily: "DM Sans", fontSize: 14, lineHeight: '16px', color: "#5E5E5E", fontWeight: 500}} className="w-34 h-4">
                                        {nameClip(value)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" className="w-full h-5" alignItems="center">
                                    <Image src={clockIcon} className="w-4.5 h-4.5 mr-2"/>
                                    {/* <AccessTimeIcon sx={{color: "#CCC"}} /> */}
                                    <Typography sx={{fontFamily: "DM Sans", fontSize: 12, lineHeight: '20px', color: "#8F8F8F"}}>
                                        20-Aug-2023 | 13:44
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                )
            })}
        </Stack>
    );
    } else {
        return (
            <Card className="h-max">
                <CardContent>
                    <Typography color="text.secondary" variant="subtitle1" textAlign="center">
                        Please upload documents.
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

