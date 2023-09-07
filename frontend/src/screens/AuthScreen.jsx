import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setCredentials} from '../slices/authSlice.js';
import axios from 'axios';
import Cookies from 'universal-cookie'

const AuthScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setCredentialsHandler = (credentials) => dispatch(setCredentials(credentials));
  const [searchParams] = useSearchParams();
  const cookie = new Cookies();

  useEffect(() => {
    axios.post('http://localhost:4000/api/users/auth', {token: searchParams.get('token')
    }).then((response) => {

      let sessionToken = response.data;
      let user = {_id: response.data.user.user_id, email: response.data.user.emails[0].email, firstName: response.data.user.name.first_name, lastName: response.data.user.name.last_name};
      cookie.set("sessionToken", sessionToken.session_token, {path: '/', sameSite: 'strict'});
      setCredentialsHandler(user);
      navigate('/profile');
    }).catch((error) => {`Error: ${error}`});
  }, [navigate, searchParams, cookie, setCredentialsHandler]);
  
  return (
    <div>AuthScreen</div>
  )
}

export default AuthScreen