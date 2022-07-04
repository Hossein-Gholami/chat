import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';

import { withStyles } from "@material-ui/core/styles";

import { useStyles } from '../muistyles'

function HomeScreen(props) {
    const { classes } = props
    const [state, setState] = useState({
        room: '',
        name: '',
    })
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        //navigate("/chat", options = { replace: true })
        navigate({
            pathname: "chat",
            search: createSearchParams({
                room: state.room,
                name: state.name,
            }).toString()
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        ChattyRooms
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={submitHandler}
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
                            value={state.room}
                            onChange={e => {
                                setState({ ...state, room: e.target.value });
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
                            value={state.name}
                            onChange={e => {
                                setState({ ...state, name: e.target.value });
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
                        {/* <Grid container>
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
                        </Grid> */}
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default withStyles(useStyles)(HomeScreen)