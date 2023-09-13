import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Card, CardContent, Typography } from '@mui/material';
import FormControlLabel from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
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
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {documentList.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={checked.indexOf(value) !== -1}
                                inputProps={{ 'aria-labelledby': labelId}}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
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
