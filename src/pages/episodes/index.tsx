import React, { useState, memo, useEffect } from "react";
import PodcastEpisodes from "@/components/PodcastEpisodes";
import SEO from "@/components/SEO";
import parseXMLStringAsJSON from "utils/parseXML";

type dataType = {
  data: any;
  podcastSeries: any;
};

function Episodes({ podcastSeries }: dataType) {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  useEffect(() => {
    if (podcastSeries) {
      const parsedEpisodes = podcastSeries? JSON.parse(parseXMLStringAsJSON(podcastSeries)):[];

      setEpisodes(parsedEpisodes);
      setFilteredEpisodes(parsedEpisodes);
    } else {
      setEpisodes([]);
      setFilteredEpisodes([]);
    }
  },[podcastSeries])

  const handleChange = (e: any) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();

    const filteredEpisodes = episodes.filter((episode: any) => {
      const episodeName = episode.name.toLowerCase().replace(/[^\w\s]/g, "");

      return episodeName.includes(inputValue);
    });

    if (inputValue === "") {
      setFilteredEpisodes(episodes);
    } else {
      setFilteredEpisodes(filteredEpisodes);
    }
    
  };

  return (
    <>
      <SEO title="Larks Podcast | Episodes" />
      <main id="larkspodcast-episodes">
        <section id="larks-all-episodes" className="px-10 mb-10">
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
            <PodcastEpisodes episodes={filteredEpisodes} />
          </div>
        </section>
      </main>
    </>
  );
}

export default memo(Episodes);
