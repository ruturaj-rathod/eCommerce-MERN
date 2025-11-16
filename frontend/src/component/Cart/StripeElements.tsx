import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

interface StripeElementsProps {
  children: React.ReactNode;
}

export default function StripeElements(props: StripeElementsProps) {
  const { children } = props;
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/v1/stripeapikey`);
      setStripeApiKey(data?.stripeApiKey);
    })();
  }, []);

  console.log("stripeApiKey ", stripeApiKey);

  return <Elements stripe={loadStripe(stripeApiKey)}>{children}</Elements>;
}
