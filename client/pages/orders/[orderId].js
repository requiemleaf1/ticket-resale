// file corresponds to wild card url
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';// payment modal
import Router from 'next/router';//redirect
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({//create a request
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),//redirect to the component in index.js file
  });

  useEffect(() => {//function that contains the code you want to run as a side effect. This function will be executed after the component has rendered.
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);//Schedules repeated execution of callback every delay milliseconds.
    // execute findTimeLeft once every second
    return () => {
      clearInterval(timerId);
    };
  }, [order]);// every time order changes, a new timer starts

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51Nn9aRIrPR0Q27t6TTN6zwDaYtQv9bKApGckmBuwJA1ZOnTkJQq7z41Ni9WNMa66sPDFS90ivPHJBozqNC2bSmNx000VZuNmVA"//public API key from STripe
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;

