import React from "react";
import { NavLink } from "react-router-dom";
import github from "../../GitHub-Mark-120px-plus.png";
import linkedin from "../../LI-In-Bug.png";

function Footer() {
  return (
    <div className="footer__div">
      <a className="github__link" href="https://github.com/edenspring">
        <img src={github} />
      </a>
      <a
        className="linkedin_link"
        href="https://www.linkedin.com/in/bill-adams-40869120b/"
      >
        <img src={linkedin} />
      </a>
    </div>
  );
}

export default Footer;
