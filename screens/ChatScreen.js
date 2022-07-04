import { useEffect, useState, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import { withStyles, createStyles } from "@material-ui/core/styles";



function ChatScreen(props) {

  const { classes } = props;

  const [chatState, setChatState] = useState({
    isLoggedIn: false,
    messages: [],
    value: '',
    name: '',
    room: 'vacad',
  })

  const [client, setClient] = useState(null)

  const msgHandler = (e) => {
    e.preventDefault();
    if (!client) return;  // or re-establish connection

    console.log(chatState.name, chatState.value)

    client.send(
      JSON.stringify({
        type: "message",
        message: chatState.value,
        name: chatState.name
      })
    );
    console.log(chatState)
    setChatState({ ...chatState, value: '' })
    console.log(chatState)
  }

  useEffect(() => {
    console.log(`room ${chatState.room}`)
    // client.current = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + chatState.room + '/');
    if (!client) {
      setClient(new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + chatState.room + '/'));
    } else {
      client.onopen = () => console.log('WebSocket Client Connected');
      client.onclose = () => console.log("WebSocket Client Closed");
    }

  }, [chatState.room, client])

  useEffect(() => {
    console.log('event captured...')
    if (client) {
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ', dataFromServer.type);
        if (dataFromServer) {
          setChatState({
            ...chatState,
            messages: [
              ...chatState.messages,
              {
                msg: dataFromServer.message,
                name: dataFromServer.name,
              }
            ]
          })
        }
      };
    }
  }, [chatState, client])

  return (
    <Container component="main" maxWidth="xs">
      {chatState.isLoggedIn ?
        <div style={{ marginTop: 50, }}>
          Room Name: {chatState.room}
          <Paper style={{ height: 500, maxHeight: '50vh', overflow: 'auto', boxShadow: 'none', }}>
            {chatState.messages.map(message => {
              <Card className={classes.root}>
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
            })}
          </Paper>

          <form className={classes.form} noValidate onSubmit={msgHandler}>
            <TextField
              id="outlined-helperText"
              label="Make a comment"
              variant="outlined"
              value={chatState.value}
              fullWidth
              onChange={(e) => {
                setChatState({ ...chatState, value: e.target.value });
              }}
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
          <Button
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
          </Button>
        </div>
        :
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              ChattyRooms
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={e => {
                e.preventDefault()
                setClient(new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + chatState.room + '/'));
                setChatState({ ...chatState, isLoggedIn: true })
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Chatroom Name"
                name="Chatroom Name"
                autoFocus
                value={chatState.room}
                onChange={e => {
                  setChatState({ ...chatState, room: e.target.value });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Username"
                label="Username"
                type="Username"
                id="Username"
                value={chatState.name}
                onChange={e => {
                  setChatState({ ...chatState, name: e.target.value });
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Start Chatting
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>}
    </Container>
  )
}

const useStyles = theme => createStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logout: {
    margin: theme.spacing(1, 0),
  },
  root: {
    boxShadow: 'none',
  }
});

export default withStyles(useStyles)(ChatScreen)
