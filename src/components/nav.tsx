import React from "react";
import MaterialIcon from "./materialIcon";

import Link from "next/link";
import Image from "next/image";

import larkspodcastLogo from "../assets/images/larks-logo.svg";
import homeIcon from "../assets/icons/home.svg";
import micIcon from "../assets/icons/mic.svg";
import addressIcon from "../assets/icons/alternate_email.svg";

export default function Nav() {
  const [showNav, setShowNav] = React.useState(false);

  const browserWindow = typeof window !== "undefined";

  if (browserWindow) {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    })

  }

  return (
    <div id="larkspodcast-nav-container">
      <div id="logo-container" className="w-full py-5 px-5">
        <Link href="/">
          <Image src={larkspodcastLogo} alt="Larks podcast logo" />
        </Link>
      </div>

      <nav>
        <ul
          className={`${
            showNav ? "!hidden" : "flex"
          } justify-evenly text-white custom-bg-color-secondary w-[22rem] sm:w-[30rem] py-2 rounded-full border-2 border-white`}
        >
          <li>
            <Link href="/" className="h-full block">
              <MaterialIcon iconObject={homeIcon} className="text-5xl" />
            </Link>
          </li>
          <li>
            <Link href="/episodes" className="block h-full">
              <MaterialIcon iconObject={micIcon} className="text-5xl" />
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block h-full">
              <MaterialIcon iconObject={addressIcon} className="text-5xl" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
