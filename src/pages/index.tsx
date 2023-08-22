/* eslint-disable react/no-unescaped-entities */
import InlineFrame from "@/components/inlineFrame";
import Nav from "@/components/nav";
import PodcastEpisodes from "@/components/PodcastEpisodes";
import SEO from "@/components/SEO";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import parseXMLStringAsJSON from "utils/parseXML";

// Images
import ellipse from "../assets/images/larks-ellipse.svg";
import LarksOnApplePodcast from "../assets/images/larks-on-apple-podcast.png";
import amazon from "../assets/images/podcast-platforms/amazon.png";
import applePodcast from "../assets/images/podcast-platforms/apple-podcast.png";
import googlePodcast from "../assets/images/podcast-platforms/google-podcast.png";
import iHeartRadio from "../assets/images/podcast-platforms/iHeartRadio.png";
import rss from "../assets/images/podcast-platforms/rss.png";
import spotify from "../assets/images/podcast-platforms/spotify.png";

// Local hosted fonts
import { poppinsFont } from "@/poppins-fonts";
import { responsePathAsArray } from "graphql";
const knewWaveFont = localFont({
  src: "../assets/fonts/knewave/knewave-regular.ttf",
});
const shadowInLightFont = localFont({
  src: "../assets/fonts/shadows-into-light/shadows-into-light-regular.ttf",
});
const yellowtailFont = localFont({
  src: "../assets/fonts/yellowtail/yellowtail-regular.ttf",
});

export default function Home({ podcastSeries }: any) {
  const podcastEpisodes = podcastSeries ? JSON.parse(parseXMLStringAsJSON(podcastSeries, 1)) : [];

  return (
    <>
      <SEO title="Larks Podcast" />

      <main id="larkspodcast-home" className={`h-auto sm:h-full`}>
        <Nav />
        {/* <section
          id="larkspodcast-banner"
          className="h-[40rem] md:h-screen lg:[40rem]"
        >
          <div id="larks-banner-top-stack">
           

            <div className="flex flex-col sm:flex-row justify-center h-full px-5">
              <div>
                <h1
                  id="intro-header"
                  className={`text-9xl md:text-[10rem] lg:text-[13rem] ${shadowInLightFont.className} text-white`}
                >
                  LARKS
                </h1>
                <h2
                  id="sub-header"
                  className={`text-3xl sm:text-4xl my-2 ${knewWaveFont.className} text-white`}
                >
                  THE PODCAST
                </h2>
              </div>
              <div id="larks-ellipse" className="flex flex-col items-center">
                <Image src={ellipse} alt="An ellipse" />
                <h3
                  className={`${yellowtailFont.className} text-3xl sm:text-5xl`}
                >
                  With Emmy.
                </h3>
              </div>
              <h1 className="hidden">Larks the podcast with Emmy</h1>
            </div>
          </div>

          <div id="overlay"></div>
        </section> */}

        <section
          id="larks-intro"
          className="h-[25rem] md:!h-[27.5rem] px-5 sm:px-10 flex flex-col items-center justify-center md:justify-start md:mt-40"
        >
          <span className="custom-text-color-accent font-semibold text-4xl block">
            YO WASSUP!
          </span>
          <span className="custom-text-color-dark text-xl block my-5">
            Welcome to
          </span>
          <h1
            className={`custom-header-color font-bold text-6xl block ${shadowInLightFont.className}`}
          >
            Larks
          </h1>
          <span className="custom-header-color font-medium text-xl block my-5">
            "The Religion"
          </span>
          <p className="custom-text-color-dark">
            A hobby turned serious is now in its third season, Hosted by “the
            syndicate”{" "}
            <Link
              href="http://instagram.com/officialemmydrake"
              className="font-medium underline"
              target="_blank"
            >
              Emmy.
            </Link>
          </p>
          {/* <button type="button">
            <Link href="#">About</Link>
          </button> */}
        </section>

        <section
          id="larks-latest-episodes"
          className="px-5 sm:px-10 mb-20 mt-5 sm:mt-10"
        >
          <h2 className="font-medium text-3xl pb-10 lg:ml-[20rem] custom-text-color-dark">
            Latest episode
          </h2>

          <PodcastEpisodes episodes={podcastEpisodes} />
        </section>

        <section id="larkspodcast-platforms" className="h-auto">
          <div id="podcasts-platforms" className="w-full px-5 sm:px-10">
            <h3 className=" font-medium text-[1.5rem] md:text-3xl leading-tight sm:leading-relaxed custom-text-color-dark max-w-[35rem] mb-5 sm:mb-10">
              LARKS is available on all platforms.{" "}
              <span className="custom-text-color-primary">
                Listen and subscribe!
              </span>
            </h3>

            <div
              id="podcasts-platforms-split"
              className="flex flex-row justify-center h-auto"
            >
              <div
                id="podcasts-platform-listing"
                className="flex flex-col items-center sm:w-1/2 h-auto"
              >
                <div id="podcast-release">
                  <h3 className="custom-text-color-dark text-xl font-semibold">
                    Episodes are released bi-weekly
                  </h3>
                  <p className="custom-text-color-dark font-medium my-5">
                  LARKS is a ridiculous, silly and unapologetically superficial podcast 
                  that is more about the laffs than the feels.
                  </p>
                </div>

                <div className="flex justify-start lg:justify-end flex-wrap">
                  <a
                    href="https://podcasts.apple.com/ng/podcast/larks/id1575332695"
                    className="platform-listing rounded-full"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={applePodcast} alt="Apple podcast" />
                    <span>Apple podcast</span>
                  </a>
                  <a
                    href="https://open.spotify.com/show/7yw8qWWpcVkRhSuFhOHP72"
                    className="platform-listing"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={spotify} alt="Spotify" />
                    <span>Spotify</span>
                  </a>
                  <a
                    href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8zN2QzMzllOC9wb2RjYXN0L3Jzcw=="
                    className="platform-listing"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={googlePodcast} alt="Google podcast" />
                    <span>Google podcast</span>
                  </a>
                  <a
                    href="https://www.iheart.com/podcast/269-larks-106422385/"
                    className="platform-listing"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={iHeartRadio} alt="iHeartRadio" />
                    <span>iheartRadio</span>
                  </a>
                  <a
                    href="https://music.amazon.co.uk/podcasts/1f6a6356-d29b-4dbb-918b-58743e00ccfb/larks"
                    className="platform-listing"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={amazon} alt="Amazon music" />
                    <span>Amazon Music</span>
                  </a>
                  <a
                    href="https://anchor.fm/s/37d339e8/podcast/rss"
                    className="platform-listing"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image src={rss} alt="RSS reader" />
                    <span>RSS</span>
                  </a>
                </div>
              </div>

              <div
                id="larks-on-apple-platform"
                className="hidden sm:block w-1/2"
              >
                <Image
                  src={LarksOnApplePodcast}
                  alt="Apple podcast"
                  className="w-[20rem] md:ml-[3rem] lg:ml-[10rem]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* <section
            id="larkspodcast-newsletter"
            className="px-5 sm:pl-20 sm:pr-10 custom-bg-color-secondary w-auto h-[30rem] "
          >
            <h3 className="custom-text-color-text-dark inline-block text-1xl sm:w-[30rem] text-[1.5rem] md:text-3xl font-medium leading-tight sm:leading-loose pt-20 pb-5 sm:pb-10">
              You've listend to the podcast?{" "}
              <span className="text-white">Now read the newsletter!</span>
            </h3>
            <p className="mt-5 mb-10 font-regular">
              Subscribe today and get the latest episode delivered to your inbox
            </p>

            <div className="md:w-[80%] lg:w-[50%]">
              <NewsletterInput />
            </div>
          </section> */}
        </section>

        <div
          id="youtube-platform"
          className="w-full custom-bg-color-secondary h-[30rem] sm:h-[45rem] "
        >
          <div className="flex flex-col justify-center items-center h-full">
            <h3 className="text-xl sm:text-2xl font-medium text-white py-5">
              Catch the visuals on YouTube
            </h3>
            <InlineFrame
              className="rounded-lg h-[200px] md:h-[500px]"
              url="https://www.youtube.com/embed/MI0ViUIx9F0"
              name="youtube-inline-frame"
              title="Larks podcast YouTube visuals"
              width="560"
              height="315"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              sandbox="allow-scripts allow-same-origin"
              fullScreen={true}
            />
            <div
              id="subscribe-button"
              className="w-[15rem] h-[50px] sm:w-[18rem] sm:h-[55px] text-center py-5 mt-7 rounded-full text-white"
            >
              <a
                href="https://www.youtube.com/@larkspodcast"
                className="block h-full flex items-center justify-center"
                target="_blank"
                rel="noopener"
              >
                Subscribe to the channel
              </a>
            </div>
            {/* <p className="text-xs mt-10 mb-2 text-white">
              Production by{" "}
              <Link
                href="https://mswitchglobal.com"
                className="black h-full font-semibold underline"
                target="_blank"
              >
                MSwitchMedia
              </Link>
            </p> */}
          </div>
        </div>
      </main>
    </>
  );
}
