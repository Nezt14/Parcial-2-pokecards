import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ monto, onSuccess }) {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}

      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: monto,
              },
            },
          ],
        });
      }}

      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          console.log("Pago completado:", details);

          if (onSuccess) {
            onSuccess(details);
          }
        });
      }}

      onError={(err) => {
        console.error("Error en PayPal:", err);
      }}
    />
  );
}