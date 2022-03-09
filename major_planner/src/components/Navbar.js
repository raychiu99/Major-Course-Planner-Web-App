import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom';
const Navbar = () => {
	const {logOut} = useAuth();
	const history = useHistory();
	function handleClick(){
		// clear the information from the local user
		localStorage.clear("user-info");
		logOut();
		history.push('/');
	}
	return (
		<div className='navbar-container' style={{ backgroundColor: '#f2ecde', textAlign: 'center', height:'100px' }}>
			<nav className="navbar" style={{ display: 'inline-block', textAlign: 'center' }}>
				<h1>Major Course Planner</h1>
				<div className="links" style={{ textAlign: 'center', paddingTop: '8px' }}>
					<a href="/How-it-works">How It Works</a>
					<a href="/SignUp">Sign Up</a>
					<a href="/">Log In</a>
					<a href="/home">Home</a>
					<a href="/Courseselection">Course Entry</a>
					<a style={{ textAlign: 'center', position: 'absolute', right: '0' }} onClick={()=>{handleClick()}}>Log Out</a>
				</div>
				
			</nav>
			
		</div>
	);
}

export default Navbar;