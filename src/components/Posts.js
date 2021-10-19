import Navbar from './Navbar';
import '../css/Home.css';
import { useState } from 'react';
import PostSnip from './PostSnippet'
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Context } from './contexts/authContext';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

function Posts() {
    const { authState, setAuthState } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const REST_API_CALL = 'https://my-app.davidz.workers.dev/posts'
    const [divArray, setDiv] = useState([]);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        setRefresh(false);
        setOpen(authState.open);
        setMessage(authState.message);
        axios.get(REST_API_CALL).then(resp => {
            if (resp.data.length == 0) {
                setDiv([<Alert severity="info" style={{ width: '50%', margin: '0 auto' }}>
                    Currently there is no posts to show — <strong>Make a post!</strong>
                </Alert>]);
            }
            else {
                resp.data.sort((a, b) => (a.vote > b.vote) ? -1 : ((b.vote > a.vote) ? 1 : 0))
                setDiv(resp.data.map(post =>
                    <PostSnip post={post} setRefresh={setRefresh} />
                ));
            }
        }).catch(err => { console.log(err) });
    }, [refresh])

    return (
        <div className='discover'>
            <Navbar />
            <div style={{ margin: '0 auto', width: '50%', overflow: 'hidden' }}>
                <h1 style={{ textAlign: 'left' }}>Posts</h1>
                <Collapse in={open}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {message}
                    </Alert>
                </Collapse>
            </div>
            <div className='home-search'>
                <div style={{ paddingTop: "2vh", width: '50%' }}></div>
                {
                    divArray
                }
            </div>
        </div>

    )
}

export default Posts;