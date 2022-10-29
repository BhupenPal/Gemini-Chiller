import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import axios from '../utils/axios';

const Loader = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  return isPending ? <div className="spinner" /> : null;
};

export default function Paypal({ setPayState, product }) {
  const paypalOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'GBP',
  };

  return (
    <>
      <PayPalScriptProvider options={paypalOptions}>
        <Loader />
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'GBP',
                    value: product.price,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const { id, purchase_units, payer } =
                await actions.order.capture();

              let address = '';
              const payerAdd = purchase_units[0].shipping.address;
              for (const key in payerAdd) {
                address += payerAdd[key] + ', ';
              }

              const payDetails = {
                paymentId: id,
                email: payer.email_address,
                payerId: payer.payer_id,
                fullName: `${payer.name.given_name} ${payer.name.surname}`,
                address,
                amountCurrency: purchase_units[0].amount.currency_code,
                amountValue: purchase_units[0].amount.value,
                quantity: product.quantity,
              };

              await axios.post('/api/shop/payment', payDetails);
            } catch (err) {
              console.log(err);
            }

            setPayState((prev: any) => ({
              ...prev,
              status: 'success',
            }));
          }}
          onError={(err) => {
            setPayState((prev: any) => ({
              ...prev,
              status: 'error',
            }));
            console.log('err :>> ', err);
          }}
        />
      </PayPalScriptProvider>
    </>
  );
}
