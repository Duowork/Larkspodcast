import Link from "next/link";
import Image from "next/image";
import NewsletterInput from "./NewsletterInput";

import Instagram from "../assets/images/instagram.svg";
import Twitter from "../assets/images/twitter.svg";
import Youtube from "../assets/images/youtube.svg";
import Email from "../assets/images/minutemailer.svg";

export default function Footer() {
  const date = new Date();
  const Year = date.getFullYear();

  return (
    <footer className="custom-bg-color-accent pt-10 sm:pt-20 pb-5 px-4 sm:px-10 font-poppins h-auto">
      <div className="footer-details-container flex flex-col sm:flex-row justify-around items-start mb-10 sm:mb-20">
        <div className="footer-dates&socials text-white w-full sm:w-[300px] max-w-[300px]">
          <h3 className="text-2xl font-medium py-5">6ix Clan - &copy;{Year}</h3>
          <div className="socials-contact w-[75%]">
            <div className="w-full flex justify-between">
              <Link
                href="http://instagram.com/larkspod"
                className="social-contact-link"
                target="_blank"
              >
                <Image
                  src={Instagram}
                  alt="Instagram contact"
                  title="Check our feed and send us a DM"
                />
              </Link>
              <Link
                href="https://twitter.com/larkspod"
                className="social-contact-link"
                target="_blank"
              >
                <Image
                  src={Twitter}
                  alt="Twitter contact"
                  className="w-full"
                  title="Tweet at us"
                />
              </Link>
              <Link
                href="https://youtube.com/@larkspodcast"
                className="social-contact-link"
                title="Watch, like and subscribe"
                target="_blank"
              >
                <Image src={Youtube} alt="YouTube contact" className="w-full" />
              </Link>
              <Link
                href="mailto:contact@larkspodcast.com"
                className="social-contact-link"
                title="Send us an email"
                target="_blank"
              >
                <Image src={Email} alt="Email contact" className="" />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-newsletter w-full sm:w-[30rem]">
          <h4 className="text-[1.2rem] md:text-2xl lg:text-3xl font-bold py-5 text-white">
            Do you enjoy listening to random banter?
          </h4>
          <p className="text-black font-poppins font-medium mb-5">
            Sign up to my newsletter to be the first to know about podcast
            episode updates, and if I ever feel like speaking to you…lmao.
          </p>
          <NewsletterInput />
        </div>
      </div>
      <hr className="border-orange-300 mb-2" />
      <p className="font-light text-center text-white">
        Engineered by the{" "}
        <Link
          href="https://duowork.github.io"
          className="!font-semibold underline"
          target="_blank"
        >
          Duowork
        </Link>{" "}
        team.
      </p>
    </footer>
  );
}
