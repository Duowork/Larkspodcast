import React, { useState } from "react";

export default function NewsletterInput() {
  const defaultMessageValue = {
    message: "",
    color: "",
  };

  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(defaultMessageValue);

  const handleSubmit = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const errorMessageColor = "text-red-800"
    
    // match email
    if (emailInput === "") {
      setMessage((state) => ({
        ...state,
        message: "Email field can not be empty 👎🏿",
        color: errorMessageColor,
      }));
      return;
    }

    if (!emailRegex.test(emailInput)) {
      setMessage((state) => ({
        ...state,
        message: "Invalid email 👎🏿",
        color: errorMessageColor,
      }));
      return;
    }

    try {
      setIsLoading(!isLoading);

      const apiPublickey = process.env.NEXT_PUBLIC_NEWSLETTER_API_KEY
      const apiPrivateKey = process.env.NEXT_PUBLIC_NEWSLETTER_SECRET_KEY;

      const { error, data } = await fetch("/api/subscriber", {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiPublickey}:${apiPrivateKey}`).toString('base64')}`,
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          IsExcludedFromCampaigns: true,
          name: "New Contact",
          email: emailInput,
        }),
      }).then((data) => data.json());

      // Email created added to contact list.
      if (data.status === 201) {
        setIsLoading(false);
        setEmailInput("");
        setMessage((state) => ({
          ...state,
          message: "You're now subscribed! TTYS 🎉📱",
          color: "text-green-800",
        }));
      }

      // Conflict with data. Possibly data already exist.
      if (data.status !== 201) {
        setIsLoading(false);
        setMessage((state) => ({
          ...state,
          message: `Something is wrong!. Please try another email 📧`,
          color: errorMessageColor,
        }));
      }

      if (error) {
        setIsLoading(false);
        setMessage((state) => ({
          ...state,
          message: "Unable to send email 👎🏿",
          color: errorMessageColor,
        }));
      }
    } catch (e) {
      setIsLoading(false);
      setMessage((state) => ({
        ...state,
        message: "Unable to send email 👎🏿",
        color: "text-red-800",
      }));
    }
  };

  return (
    <div className="">
      <div className="newsletter-input-container w-auto h-auto font-poppins flex items-center">
        <div className="border border-white rounded-md w-[100%]">
          <label htmlFor="#newsletter-input" className="hidden"></label>
          <input
            type="email"
            name=""
            value={emailInput}
            id="newsletter-input"
            placeholder="Enter your email"
            title="Larks podcast newsletter"
            autoComplete="true"
            className="outline-0 border-0 rounded-l-md w-[70%] h-[40px] custom-bg-color-primary p-5"
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button
            type="button"
            title="Larks podcast newsletter sign up button"
            className="bg-white w-[30%] h-[40px] font-semibold sm:font-bold border-r border-y border-orange-300 rounded-r text-[0.75rem] sm:text-[1.1rem]"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        <div className={`${isLoading ? "loader" : "hidden"} ml-2`}></div>
      </div>
      {message.message ? (
        <small className={`${message.color}`}>{message.message}</small>
      ) : null}
    </div>
  );
}
