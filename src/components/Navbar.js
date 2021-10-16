import { NavLink, withRouter } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar(props) {
    return (
        <div className={'navbar '}>
            <div className='navbar-left'>
                <NavLink className='navlink' exact to='/'>CLOUDPOST</NavLink>
            </div>
            <div className='navbar-right' style={{ whiteSpace: 'noWrap' }}>
                <NavLink className='navlink' exact to='/'>Posts</NavLink>
                <NavLink className='navlink' exact to='/MakePost'>Make a Post</NavLink>
            </div>
        </div>
    )
}

export default withRouter(Navbar);