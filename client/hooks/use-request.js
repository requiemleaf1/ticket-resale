//define a react hook to deal with potential errors when make all types of requests(methods) to diffirent urls with or without body in the request
//so it can be reused in different components/next.js pages
import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {//React Hook
  const [errors, setErrors] = useState(null);// setErrors()uses the input to ser the errors which is an array of error instances
//means by default the state of errors variable equals to null

  const doRequest = async (props = {}) => {//props are the additioanl propertities to include in request {body} when called
    try {
      setErrors(null);//reset the errors state to null when there is a new request
      const response = await axios[method](url,
        {...body, ...props});//merge original boday and the props as an object input

      if (onSuccess) {
        onSuccess(response.data);
      }
      
      return response.data;
    } catch (err) {
      setErrors(//set value for Errors
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
