import React, { useState } from "react";
import Link from "next/link";
import PodcastEpisodes from "@/components/PodcastEpisodes";
import SEO from "@/components/SEO";

type dataType = {
  data: any;
  podcastSeries: any;
};

export default function Episodes({ podcastSeries }: dataType) {
  const [podcastEpisodes, setPodcastEpisodes] = useState([
    ...podcastSeries.episodes,
  ]);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { episodes } = podcastSeries;

    const filteredEpisodes = episodes.filter((episode: any) => {
      const episodeName = episode.name.toLowerCase().replace(/[^\w\s]/g, "");
      const inputValue = e.target.value.toLowerCase();

      return episodeName.includes(inputValue);
    });

    if (filteredEpisodes.length > 0) {
      setPodcastEpisodes(filteredEpisodes);
    } else {
      setPodcastEpisodes(episodes);
    }
  };

  return (
    <>
      <SEO title="Larks Podcast | Episodes" />
      <main id="larkspodcast-episodes">
        {/* <section id="larks-all-episodes" className="px-10 mb-10">
        <div
          id="episode-search"
          className="flex justify-center items-center h-auto"
        >
          <input
            type="text"
            name="search-input"
            id="search-input"
            placeholder="Search podcasts"
            title="Search podcast"
            className="outline-0 border border-orange-300 rounded-full w-96 max-w-96 h-10 px-10 py-5 mb-5"
            onChange={handleChange}
          />
        </div>

        <h2 className="font-poppins font-medium text-3xl p-5-10 lg:ml-[11rem] custom-text-color-dark mb-5">
          All episodes
        </h2>

        <div className="overflow-y-scroll h-[35rem] py-5">
          <PodcastEpisodes episodes={podcastEpisodes} />
        </div>
      </section> */}
        <section className="h-[45rem] md:h-screen flex flex-col items-center justify-center text-center">
          <p>Hello 👋🏿</p>
          <p className="my-5">This page is currently undergoing maintenace 🛠</p>
          <p className="md:px-[10rem]">
            At the meantime, you can listen to the latest episode and other
            episodes on your streaming platforms. Visit the{" "}
            <Link href="/" className="text-[#fe982ccc] underline">Home</Link> page for more.
          </p>
        </section>
      </main>
    </>
  );
}
