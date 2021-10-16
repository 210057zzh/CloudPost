import Navbar from './Navbar';
import '../css/Home.css';
import PostSnip from './PostSnippet'

function MakePosts() {
    return (
        <div className='discover'>
            <Navbar />
            <div style={{ margin: '0 auto', width: '50%', overflow: 'hidden' }}>
                <h1 style={{ textAlign: 'left' }}>Make a Post</h1>
            </div>
            <div className='home-search'>
                <div style={{ paddingTop: "2vh", width: '50%' }}></div>
                {
                    <PostSnip />
                }
            </div>
        </div>

    )
}

export default MakePosts;