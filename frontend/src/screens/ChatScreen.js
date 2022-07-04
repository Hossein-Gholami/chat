import { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from "@material-ui/core/styles";

import { useStyles } from '../muistyles'

function ChatScreen(props) {

    const client = useRef(null)
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const { classes } = props

    const location = useLocation()
    const [searchParams] = useSearchParams();
    const { name, room } = Object.fromEntries([...searchParams])
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.search)
            navigate("/")
    }, [location, navigate])

    useEffect(() => {
        if (room==='') return;
        client.current = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + room + '/')
        client.current.onopen = () => console.log("ws opened");
        client.current.onclose = () => console.log("ws closed");

        return () => {
            if (client.current)
                client.current.close();
        }

    }, [room])

    useEffect(() => {
        if (!client.current) return;

        client.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log('got reply!');
            setMessages(m => [
                ...m,
                {
                    msg: data.message,
                    name: data.name,
                }
            ])
        }
    }, [])

    const sendMsgHandler = (e) => {
        e.preventDefault()
        if (!client.current) {
            console.error('No functional connection is established!')
            return;
        }
        client.current.send(
            JSON.stringify({
                type: "message",
                message: value,
                name: name
            })
        );
        setValue('')
    }

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ marginTop: 50, }}>
                Room Name: {room}
                <Paper style={{ height: 500, maxHeight: '50vh', overflow: 'auto', boxShadow: 'none', }}>
                    {messages.map((message, index) => {
                        return (
                            < Card key={index} className={classes.root} >
                                <CardHeader
                                    avatar={
                                        <Avatar className={classes.avatar}>
                                            R
                                        </Avatar>
                                    }
                                    title={message.name}
                                    subheader={message.msg}
                                />
                            </Card>
                        )
                    })}
                </Paper>

                <form className={classes.form} noValidate onSubmit={sendMsgHandler}>
                    <TextField
                        id="outlined-helperText"
                        label="Make a comment"
                        variant="outlined"
                        value={value}
                        fullWidth
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send
                    </Button>
                </form>
                {/* <Button
                        fullWidth
                        type="button"
                        color="primary"
                        className={classes.logout}
                        onClick={e => {
                            e.preventDefault();
                            client.close()
                            setChatState(chatState => { return { ...chatState, isLoggedIn: false } });
                            console.log(chatState.isLoggedIn);
                        }}
                    >
                        Logout
                    </Button> */}
            </div>
        </Container >
    )
}

export default withStyles(useStyles)(ChatScreen)