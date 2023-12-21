// corresponds to ticketing.dev/auth/signup
//define and export a react component
import { useState } from 'react';// import useState hook
import Router from 'next/router';
import useRequest from '../../hooks/use-request';// when the export is default, import is to import the whole thing of the file and assign a name to it

export default () => {
  const [email, setEmail] = useState('');//create states: 1st para is name of the variable, 2nd is the set function
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')//after we make the request successfully, call this onSuccess callback.
  });//Router.push() is to forcely go to the provided route. here is the index page

  const onSubmit = async event => {
    event.preventDefault();// prevents the form from submit itself

    await doRequest();
  };
  //return the content on the html
  return (// onSubmit handler calls onSubmit helper function defined above
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}//onChange handler sets email to the event target value when the input gets changed
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );//error is null by default
};
