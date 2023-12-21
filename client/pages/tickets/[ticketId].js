import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),//navigates to wild card url( file directory, actual url)
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={ () => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {// getInitialProps method of a component returns the content that shows first when the component gets initiated
  const { ticketId } = context.query;// returns the query part of the request in the url
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };//ticket defined here and used above
};

export default TicketShow;
