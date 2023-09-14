import { Grid, Stack, TextField, Button, InputAdornment, Divider, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Typography, Card, CardContent, InputBase, OutlinedInput } from '@mui/material'
import { FormControl } from '@mui/base/FormControl';
import { useState, useEffect } from 'react';

import queryIndex from '@/pages/api/queryIndex';

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
                type: "Question"
            }]
            console.log(newMessages)
            setMessages(newMessages);
            console.log(messages)

            queryIndex(queryMessage).then((response) => {
                // console.log(response.response)
                // console.log(response.source_nodes)
                setLoading(false)
                console.log(messages)
                newMessages = [...newMessages, {
                    text: response.text,
                    type: "Answer"
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
                        <Card sx={{ minWidth: 275 }} key={`#${index}`}>
                            <CardContent>
                                <Typography>{message.type}: {message.text}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
                <FormControl variant="outlined" fullwidth>
                    <OutlinedInput 
                        required 
                        id="query-text" 
                        label="Question" 
                        variant="outlined"
                        value={queryMessage}
                        onChange={(value) => {setQueryMessage(value.target.value)}}
                        disabled={isLoading}
                        fullwidth
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