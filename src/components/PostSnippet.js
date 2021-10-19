import '../css/DiscoverSnippet1.css';
import '../css/Home.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { Context } from './contexts/authContext';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function PostSnip(props) {
    const history = useHistory();
    const { authState, setAuthState } = useContext(Context);
    const REST_API_CALL = 'https://my-app.davidz.workers.dev/posts'
    var [date, setDate] = useState(Date().toString());
    useEffect(() => {
        const timer = setTimeout(() => setDate(Date().toString()), 1e3)
        return () => clearTimeout(timer)
    })
    useEffect(() => setAuthState((prevState) => { return { ...prevState, open: false, message: '' } }), [])
    var [err, setErr] = useState({});
    var [newPost, SetNewPost] = useState({ username: '', content: '', title: '' })
    function upvote(amount) {
        props.post.vote += amount;
        newPost = props.post;
        submit();
    }
    function submit() {
        var error = {};
        if (newPost.content === '') {
            error.content = "Please enter the content"
        }
        if (newPost.username === '') {
            error.username = "Please enter the username"
        }
        if (newPost.title === '') {
            error.title = "Please enter the title"
        }
        setErr(error);
        if (Object.keys(error).length === 0) {
            axios.post(REST_API_CALL, { newPost }
            ).then(resp => {
                setAuthState(prevState => { return { ...prevState, open: true, message: "Submitted!" } })
                if (props.setRefresh != null)
                    props.setRefresh(true);
                history.push("./");
            }).catch(resp => console.log(resp))
        }
    }
    return (
        <div className='discoverLink' >
            <div className="title">
                {props.post != null ?
                    <div> {props.post.title} </div>
                    :
                    <div style={{ margin: '0em' }}>
                        <TextField style={{ width: '100%', margin: '0 auto' }} type='text'
                            label="Enter title" name='title' className='contactInput'
                            error={err.title != null}
                            helperText={err.title}
                            id="website" value={newPost.title} onChange={(e) => {
                                SetNewPost(prevPost => {
                                    return {
                                        ...prevPost,
                                        title: e.target.value
                                    }
                                })
                            }} />
                    </div>}
            </div>
            <div className='discoverSnippet'>
                <div className='left'>
                    <div className='left-left'>
                        <h3>UserName: </h3>
                        <h3>Date:</h3>
                    </div>
                    <div className='left-right'>
                        {
                            props.post != null ?
                                <div><h4>{props.post.username}</h4>
                                    <h4>{props.post.date}</h4> </div>
                                :
                                <div style={{ marginTop: '0em' }}>
                                    <TextField style={{ width: '100%', margin: '0 auto' }} type='text'
                                        label="Enter User Name" name='username' className='contactInput'
                                        error={err.username != null}
                                        helperText={err.username}
                                        id="website" value={newPost.username} onChange={(e) => {
                                            SetNewPost(prevPost => {
                                                return {
                                                    ...prevPost,
                                                    username: e.target.value
                                                }
                                            })
                                        }} />
                                    <div style={{ marginTop: '1em', textAlign: "left" }}>{date}</div>
                                    <Button
                                        style={{ width: '50%', marginTop: '2em' }} className='review-btn' size="small" variant="contained"
                                        onClick={submit} >Post it!</Button>
                                </div>
                        }
                    </div>
                </div>
                <div className='right'>
                    <h3>Content:</h3>
                    {props.post != null ?
                        <div>
                            <div className='right-left'>
                                <div> {props.post.content} </div>
                            </div>
                            <div className='right-right'>
                                <Button
                                    endIcon={<ArrowDropUpIcon />} onClick={() => upvote(1)}></Button>
                                {props.post.vote}
                                <Button
                                    endIcon={<ArrowDropDownIcon />} onClick={() => upvote(-1)}></Button>
                            </div>
                        </div>
                        :
                        <div style={{ margin: '0em' }}>
                            <TextField style={{ width: '100%', margin: '0 auto' }} type='text'
                                label="Enter Content" name='content' multiline
                                variant="outlined"
                                rows={5}
                                rowsMax={5} className='textUpdate'
                                error={err.content != null}
                                helperText={err.content}
                                id="website" value={newPost.content} onChange={(e) => {
                                    SetNewPost(prevPost => {
                                        return {
                                            ...prevPost,
                                            content: e.target.value
                                        }
                                    })
                                }} />
                        </div>}
                </div>
            </div>
        </div>
    )

}
export default PostSnip;