import Image from 'next/image'

import { Grid, Stack, TextField, Button, InputAdornment, Divider, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Typography, Card, CardContent, InputBase, OutlinedInput } from '@mui/material'

import userIcon from '../public/images/user_avatar.png'
import botIcon from '../public/images/diverge_avatar.png'

import "@fontsource/poppins";

const styles = {
    cardStyle: {
        left: '341px',
        top: '197px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px'
    },
    cardContentStyle: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '18px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'justify',
        color: '#6B6C6F'
    }
}

export default function Message({type, index, message}) {
    console.log(type)
    return (
        <Card sx={{ minWidth: 275 }} style={styles.cardStyle} key={`#${index}`}>
            <CardContent style={styles.cardStyle}>
                <Stack>
                    <Typography style={styles.cardContentStyle}>{message}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}