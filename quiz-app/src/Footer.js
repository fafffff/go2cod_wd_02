// Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>
        This app is built by <a href="/">Fasika Belayneh</a> and Hoisted on{" "}
        <a href="/">Netlify.</a>{" "}
      </p>
      <p>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
