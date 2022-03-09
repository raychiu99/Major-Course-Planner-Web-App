import { useAuth } from "../contexts/AuthContext";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
const Navbar = () => {
	const userObj = JSON.parse(localStorage.getItem('user-info'));
	const [isLoggedIn, setLoggedIn] = useState(userObj)
	const {logOut} = useAuth();
	const history = useHistory();
	function handleClick(){
		// clear the information from the local user
		localStorage.clear("user-info");
		logOut();
		history.push('/');
	}
	useEffect(()=>{
		if (userObj === null && isLoggedIn !== null) {
			setLoggedIn(null);
		} else if (userObj !== null && isLoggedIn === null) {
			setLoggedIn(userObj	);
		}
	})
	
	
	return (
		<div className='navbar-container' style={{ backgroundColor: '#f2ecde', textAlign: 'center', height:'100px' }}>
		{(isLoggedIn !== null) ? <nav className="navbar" style={{ display: 'inline-block', textAlign: 'center' }}>
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
		:
		<nav className="navbar" style={{ display: 'inline-block', textAlign: 'center' }}>
				<h1>Major Course Planner</h1>
				<div className="links" style={{ textAlign: 'center', paddingTop: '8px' }}>
					<a href="/How-it-works">How It Works</a>
					<a href="/SignUp">Sign Up</a>
					<a href="/">Log In</a>
				</div>
				
			</nav>}
		
			
			
		</div>
	);
}

export default Navbar;