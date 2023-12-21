import Link from 'next/link';
//export default () => {//the file name is corresponding to the route localhost:3000 or ticketing.dev with 
 //index.js is the home page if there is no specific route in the path. say the path is ticketing.dev
  
  //return <h1>Landing！！！ Page</h1>;
//};
const LandingPage = ({ currentUser, tickets }) => {// use the initialprops to create html components
  //use the data(props) got from getInitialProps to execute the landingPage function
  //console.log(currentUser);
  //axios.get('/api/users/currentuser').catch((err) => {//make a follow-up request after receiving inital fully rendered html.request from the browser
    //console.log(err.message);// it is because next.js server cannot fetch data in the process of initial server-side rendering. so the fetch data 
    //needs to be done as a follow-up request from react component/browser after the next.js initial server-side rendering
  //});//request from component issued from browser and don't need to specify the domain so use a domain of ""

  const ticketList = tickets.map((ticket) => {
    return (// use the initialprops data to create a table
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// LandingPage.getInitialProps = async () => { //getInitialProps is called by next.js to fetch data needed to do the inital server-side rendering. it is called one time 
//   const response = await axios.get('/api/users/currentuser');//after initial server rendering. the browser interact directly with the rendered react components

//   return response.data;// getInitialProps is executed on the next.js server
// };
LandingPage.getInitialProps = async (context, client, currentUser ) => {// returns the data needed when the page first load
  //buildClient create the Axiosintance,use that to make the actual get() request which return the result of the Axios get request. same as axios.get('/api/users/currentuser')
  const { data } = await client.get('/api/tickets');// retrieve all the tickets

  return { tickets: data };
};

export default LandingPage;//export react component

