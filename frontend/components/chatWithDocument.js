import { Grid, Stack, TextField, Button, InputAdornment, Divider, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Typography, Card, CardContent, InputBase, OutlinedInput } from '@mui/material'
import { FormControl } from '@mui/base/FormControl';
import { useState, useEffect } from 'react';
import Image from 'next/image'


import userIcon from '../public/images/user_avatar.png'
import botIcon from '../public/images/diverge_avatar.png'

import queryIndex from '@/pages/api/queryIndex';
import Message from './message';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';


export default function ChatWithDocument() {
    const [messages, setMessages] = useState([]);
    const [queryMessage, setQueryMessage] = useState("");
    const [isLoading, setLoading] = useState(false)
    // useEffect(() => )

    function handleUserMessage(event) {
        // console.log(queryMessage)
        // console.log(messages)
        let newMessages = [];
        if (queryMessage) {
            setLoading(true)
            newMessages = [...messages, {
                text: queryMessage,
                type: "Q"
            }]
            // console.log(newMessages)
            setMessages(newMessages);
            // console.log(messages)

            queryIndex(queryMessage).then((response) => {
                // console.log(response.response)
                // console.log(response.source_nodes)
                setLoading(false)
                console.log(messages)
                newMessages = [...newMessages, {
                    text: response.text,
                    type: "A"
                    // sources: response.
                }]
                setMessages(newMessages);
            });
        }
    }

    return (
        <Grid item xs={12} height='100%' classNames="p-9">
            <Stack>
                <Box sx={{
                    width: '100%', 
                    height: 500, 
                    backgroundColor: '#F4F4F4', 
                    overflowY: 'auto',
                }}>
                    {/* <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography>Question 0...</Typography>
                        </CardContent>
                    </Card> */}
                    {messages.map((message, index) => 
                        <Stack direction="row" alignItems="flex-start" spacing={2} className="p-2 m-2">
                            <Image 
                            src={message.type == "Q" ? userIcon : botIcon}
                            alt={message.type == "Q" ? "User Icon" : "Diverge Bot Icon"}
                            className="h-8 w-8"
                            />
                            <Message type={message.type} key={index} message={message.text} />
                        </Stack>
                    )}
                </Box>
                <FormControl id="query-text-form" variant="outlined" fullwidth>
                    <OutlinedInput 
                        required 
                        id="query-text" 
                        label="Question" 
                        variant="outlined"
                        value={queryMessage}
                        onChange={(value) => {setQueryMessage(value.target.value)}}
                        disabled={isLoading}
                        className="w-full"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleUserMessage}
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Stack>
        </Grid>
    )
}