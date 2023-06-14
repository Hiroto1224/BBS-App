import {Typography, Toolbar, Grid, ListSubheader, List, ListItem, ListItemButton} from '@mui/material'
import React from 'react'
import {Sheet} from "@mui/joy";


const ChatRoom = () => {

    const viewTodos:string[] = [ 'test', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2' ]


    return (
        <>
            <Toolbar>
                <Typography variant="h6" component="div" style={{flexGrow: "1"}}>
                    Test
                </Typography>
            </Toolbar>
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 320,
                            maxHeight: 600,
                            overflow: 'auto',
                            borderRadius: 'sm',
                        }}
                    >
                        <ListSubheader></ListSubheader>
                        <List>
                            {viewTodos.map(todo => (
                                <Grid item xs={12}>
                                    <ListItem >
                                        {todo}
                                    </ListItem>
                                </Grid>
                            ))}
                        </List>
                    </Sheet>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={7}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 840,
                            maxHeight: 600,
                            overflow: 'auto',
                            borderRadius: 'sm',
                        }}
                    >
                        <ListSubheader></ListSubheader>
                        <List>
                            {viewTodos.map(todo => (
                                <Grid item xs={12}>
                                    <ListItem >
                                        {todo}
                                    </ListItem>
                                </Grid>
                            ))}
                        </List>
                    </Sheet>
                </Grid>
            </Grid>
        </>
    );
}



export default ChatRoom;