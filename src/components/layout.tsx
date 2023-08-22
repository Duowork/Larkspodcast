/* eslint-disable react/no-unescaped-entities */
/*
  Fetching data is done on the Layout componet and passed via 
  React.cloneElement module tot the 'children' prop. The 'children' prop
  render the pages in the Layout components. 
*/

import { Fragment, cloneElement } from "react";
import { useRouter } from "next/router";
import SEO from "./SEO";
import Loader from "./loader";
import Nav from "./nav";
import Footer from "./footer";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.text());

export default function Layout({ children }: any) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    "https://anchor.fm/s/37d339e8/podcast/rss",
    fetcher,
  );

  if (error) {
    console.log(error);

    return (
      <main className="h-screen">
        <SEO
          title="Larks Podcast | Error"
          description="LARKS podcast that defies the norms of being specific, straightforward and concise; It embraces the ridiculous, the silly and the superficial and It’s more about the laffs than the feels."
        />
        <div
          id="network-error-prompt"
          className="h-full flex justify-center mt-[25rem] p"
        >
          <p className="custom-text-color-primary text-2xl sm:text-3xl mx-10 md:mx-20 lg:mx-[15rem] text-center leading-tight">
            There seem to be a network error! Check that you're connected to the
            internet or try again later
          </p>
        </div>
      </main>
    );
  }

  if (isLoading === undefined) {
    return <Loader />;
  }

  return (
    <Fragment>
      <SEO
        title="Larks Podcast"
        description="LARKS podcast that defies the norms of being specific, straightforward and concise; It embraces the ridiculous, the silly and the superficial and It’s more about the laffs than the feels."
      />

      {router.pathname === "/" ? null : <Nav />}

      {data !== undefined
        ? cloneElement(children, {
            podcastSeries: data,
          })
        : children}

      {router.pathname === "/404" ? null : <Footer />}
    </Fragment>
  );
}
