import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Price from "components/Price";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, cartSelector } from "redux/cartSlice";

const checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { userId, cart, total } = useSelector(cartSelector);

  const [completed, setCompleted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (name !== "" && email !== "" && address !== "") {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [name, email, address]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (completed) {
      fetch("http://localhost:3001/api/order", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId,
          name,
          email,
          address,
          cart,
          total,
          createAt: Date.now(),
        }),
      }).then(function (res) {
        dispatch(cartActions.resetCart());
        router.push("/thankyou");
      });
    }
  };

  return (
    <div className="h-screen grid grid-cols-3">
      <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
        {!completed && (
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-red-500 shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div className="text-sm text-white font-medium ml-3">
                Complete your information and payment details below.
              </div>
            </div>
          </div>
        )}

        <div className="rounded-md">
          <form id="payment-form" method="POST" action="">
            <section>
              <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping & Billing Information
              </h2>
              <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Name</span>
                  <input
                    name="name"
                    className="focus:outline-none px-3"
                    placeholder="Try Odinsson"
                    required={true}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Email</span>
                  <input
                    name="email"
                    type="email"
                    className="focus:outline-none px-3"
                    placeholder="try@example.com"
                    required={true}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="text-right px-2">Address</span>
                  <input
                    name="address"
                    className="focus:outline-none px-3"
                    placeholder="10 Street XYZ 654"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </label>
              </fieldset>
            </section>
          </form>
        </div>

        <button
          onClick={handlePayment}
          className="submit-button px-4 py-3 rounded-full bg-indigo-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
        >
          Pay <Price currency="$" num={total} numSize="text-lg" />
        </button>
      </div>
      <div className="col-span-1 bg-white lg:block hidden">
        <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
          Order Summary
        </h1>
        <ul className="py-6 border-b space-y-6 px-8">
          {cart?.map((item) => (
            <li
              key={item.product.id}
              className="grid grid-cols-6 gap-2 border-b-1"
            >
              <div className="col-span-1 self-center">
                <Image
                  src={item.product.imageSrc}
                  alt={item.product.imageAlt}
                  className="rounded w-full"
                  width={50}
                  height={50}
                />
              </div>

              <div className="flex flex-col col-span-3 pt-2">
                <span className="text-gray-600 text-md font-semi-bold">
                  {item.product.name}
                </span>
              </div>
              <div className="col-span-2 pt-3">
                <div className="flex items-center space-x-2 text-sm justify-between">
                  <span className="text-gray-400 text-lg">
                    {item.qty} x
                    <Price
                      currency="$"
                      num={item.product.price}
                      numSize="text-lg"
                    />
                  </span>
                  <span className="text-indigo-600 font-semibold inline-block">
                    <Price
                      currency="$"
                      num={item.product.price * item.qty}
                      numSize="text-lg"
                    />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-8 border-b">
          <div className="flex justify-between py-4 text-gray-600">
            <span>Subtotal</span>
            <span>
              <Price currency="$" num={total} numSize="text-lg" />
            </span>
          </div>
          <div className="flex justify-between py-4 text-gray-600">
            <span>Shipping</span>
            <span className="font-semibold text-indigo-600">Free</span>
          </div>
        </div>
        <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
          <span>Total</span>
          <span>
            <Price currency="$" num={total} numSize="text-lg" />
          </span>
        </div>
        <div className="font-semibold text-1xl px-8 flex justify-between py-8 text-gray-600">
          <Link href="/cart">
            <a>
              <span>Back to cart</span>
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default checkout;
