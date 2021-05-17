import React from "react";
import axios from "axios";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: "http://ecart.local/", // Your store URL
  consumerKey: "ck_523ac894aba09353559eef8bda89340f979b7fc1", // Your consumer key
  consumerSecret: "cs_0be10307455a3e7a1703ed944c103bb5d78abfe5", // Your consumer secret
  version: "wc/v3", // WooCommerce WP REST API version
});
axios.interceptors.request.use(function (config) {
  config.headers;
  const { headers = {} } = config || {};
  if (headers["User-Agent"]) delete config.headers["User-Agent"];
  return config;
});

const createOrder = () => {
  const data = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    billing: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
      email: "john.doe@example.com",
      phone: "(555) 555-5555",
    },
    shipping: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
    },
    line_items: [
      {
        product_id: 93,
        quantity: 2,
      },
      {
        product_id: 22,
        variation_id: 23,
        quantity: 1,
      },
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  };

  WooCommerce.post("orders", data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });

  return <div>congrats</div>;
};
export default createOrder;
