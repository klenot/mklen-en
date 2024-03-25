"use client";

import { hasCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

const CookieConsent = (props) => {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    setShowConsent(hasCookie("CookieConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("CookieConsent", {
      analytics_storage: true,
      ad_storage: false,
      ad_user_data: false,
      ad_personalization: false,
    }, {});
  };

  const denyCookie = () => {
    setShowConsent(true);
    setCookie("CookieConsent", {
      analytics_storage: false,
      ad_storage: false,
      ad_user_data: false,
      ad_personalization: false,
    }, {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='cookie-outer-container'>
      <div className='cookie-inner-container'>
        <span className='cookie-desc-text'>
        Hey there 👋🏻 I am using GA4. By consenting to cookies, you allow me to analyse visits and help me focus on content that can help others.
        </span>
        <div className="cookie-button-wrapper">
          <button onClick={acceptCookie} className='cta ctaSmall'>
            <span className='button-text'>Accept</span>
          </button>
          <button onClick={denyCookie} className='cta ctaSmall'>
            <span className='button-text'>Deny</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
