// helper function to create pre-config axios instance based on either the axios is being created on 
import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {//to decide if currently the next.js server or the browsering is calling getInitialProps
  // we are on the server! because only browser has window type
  // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
    // We are on the server

    return axios.create({//return a pre-configured axios instance with the specific property
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',// if we are on server, it is running in the container, so the localhost location is different than the local mechine.we need to manualy refer to the ingress -srv to append domain to the url
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
      // requests can be made with a base url of '';rely upon the browser to put on the base domain or the base URL
    });
  }
};
