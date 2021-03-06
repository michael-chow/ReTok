import React, {PropTypes} from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import LoggedInNavContainer from '../Nav/LoggedInNav/LoggedInNavContainer'
import LoggedOutNavContainer from '../Nav/LoggedOutNav/LoggedOutNavContainer'
import Login from '../Login/LoginContainer'
import { connect } from 'react-redux'
import * as userActions from '../Redux/userReducer'
import axios from 'axios'

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		var context = this;
		axios.get('/auth')
		  .then(function(res) {
		    console.log('checking auth res data',res.data);

		    if(res.data) {
		    	console.log('go through to auth')
		      context.context.router.push('/profile');
		    }
		  })


	}

	componentWillUnmount() {
		
	}

	render() {
		return (
			<div>
			{this.props.isLoggedIn ? <LoggedInNavContainer/> : <LoggedOutNavContainer/>}
			<div id ="wrapper">
			{this.props.children}
			</div>
			</div>
		)
	}
} 

// function used by connect(below) to map default state properties as props to our component. 
// notice how althouth the state tree contains all the different states of our entire app,
// we are only interested in extracting the state that this component will use/need
function mapStateToProps(state){
  return {
    isLoggedIn: state.userReducer.isLoggedIn //<=== shouldnt have to do this...? 
  }
}

HomeContainer.contextTypes = {
  router: PropTypes.object.isRequired
}


// 'connect' from react-redux allows us to set the default state we assign to the statetree onto our components as props!
// i.e. you won't see this.state anymore... since we are now completely separating state logic from container logic. 
export default connect(mapStateToProps)(HomeContainer)


// export default HomeContainer