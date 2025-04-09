import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({amount,onSuccess , onError}) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AV_WVTYwOOETKsaU4eahuve21XDwBrV07uWJuzYzjCF5bgR88vBR6HaetD0Q6eE6SVs5gurLdlqeKWvD",
      }}
    >

        <PayPalButtons style={{layout:"vertical"}}
        createOrder={(data,actions)=>{
            return actions.order.create({
                purchase_units:[{amount:{value:amount}}]
            })
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError}
        />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
