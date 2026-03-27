// interswitchClient.js
let scriptLoaded = false;

export const InterswitchClient = {
  loadScript: () => {
    return new Promise((resolve, reject) => {
      if (scriptLoaded) return resolve();

      const script = document.createElement("script");
      script.src = "https://newwebpay.qa.interswitchng.com/inline-checkout.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  },

  pay: async ({ email, amount, utility, phone, onComplete }) => {
    await InterswitchClient.loadScript();

    if (!window.webpayCheckout) throw new Error("Webpay script not loaded!");

    const txnRef = "txn_" + Date.now();

    window.webpayCheckout({
      merchant_code: import.meta.env.VITE_MERCHANT_CODE,
      pay_item_id: import.meta.env.VITE_PAY_ITEM_ID,
      txn_ref: txnRef,
      amount: Number(amount),
      currency: 566,
      cust_email: email,
      site_redirect_url: window.location.origin,
      // mode: "TEST",
      onComplete: (response) => {
        console.log("Payment callback:", response);
        if (onComplete) onComplete(response);
      },
    });
  },
};