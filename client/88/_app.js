//install bootstrap with npm install bootstrap first
//if we have any global CSS(that applies to all the pages of the Next.js pages), it has to be imported into
//this _app file because this is the only file that we are guaranteed to load up every single time a user
//comes to our application in Next.js. So the CSS doesn't need to be imported seperately into individual files
//import { InternetModule } from '@faker-js/faker';
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component currentUser = { currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {// this getInitialProps called in _aap.js is used for headers on every page to show the correct signin/out content based on the returned currentUser
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }//call getInitialProps defined in individual page

  return {
    pageProps,
    ...data//has currentuser property
  };
}

export default AppComponent;