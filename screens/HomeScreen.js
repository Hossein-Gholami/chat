import { Link as RouterLink } from 'react-router-dom'

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


function HomeScreen(props) {
    const { classes } = props

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Room Chat
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => submitHandler(e)}>
                        <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Chatroom Name" name="Chatroom Name" autoFocus value={chatState.room} onChange={e => { setChatState({ ...chatState, room: e.target.value }); }} />
                        <TextField variant="outlined" margin="normal" required fullWidth name="Username" label="Username" type="Username" id="Username" value={chatState.name} onChange={e => { setChatState({ ...chatState, name: e.target.value }); }} />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
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
            </div>
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

export default withStyles(useStyles)(HomeScreen)