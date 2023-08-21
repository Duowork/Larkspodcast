import { parseString } from "xml2js";

export default function parseXMLStringAsJSON(
  xmlString: string,
  episodesLength: number = 0,
) {
  let data = "";

  if (xmlString === undefined) {
    data = xmlString;
  }

  parseString(xmlString, (error, result) => {
    if (error) return error;


    const podcastEpisodes: any[] = result.rss.channel[0].item;

    /* Get single episode */
    if (episodesLength === 1) {
      const singleEpisode = podcastEpisodes.slice(0, episodesLength)[0];
      const datePublished = new Date(singleEpisode.pubDate[0]).getTime();

      data = JSON.stringify([
        {
          audioUrl: singleEpisode.enclosure[0].$.url,
          datePublished: datePublished / 1000,
          description: singleEpisode.description[0],
          imageUrl: singleEpisode["itunes:image"][0].$.href,
          name: singleEpisode.title[0],
          uuid: singleEpisode.guid[0]["_"],
        },
      ]);

      return;
    }
    
    /* Slice off episodes based on length provided */
    if (episodesLength > 1) {
      const episodesPerLength = podcastEpisodes.slice(0, episodesLength);

      const episodesData = episodesPerLength.map((episode, idx) => {
        const datePublished = new Date(episode.pubDate[0]).getTime();

        return {
          audioUrl: episode.enclosure[0].$.url,
          datePublished: datePublished / 1000,
          description: episode.description[0],
          imageUrl: episode["itunes:image"][0].$.href,
          name: episode.title[0],
          uuid: episode.guid[0]["_"],
        };
      });

      data = JSON.stringify(episodesData);

      // Terminate function
      return;
    }

    /* Get all episodes */
    const allEpisodes = podcastEpisodes.map((episode, idx) => {
      const datePublished = new Date(episode.pubDate[0]).getTime();

        return {
          audioUrl: episode.enclosure[0].$.url,
          datePublished: datePublished / 1000,
          description: episode.description[0],
          imageUrl: episode["itunes:image"][0].$.href,
          name: episode.title[0],
          uuid: episode.guid[0]["_"],
        };
    });

    data = JSON.stringify(allEpisodes)
  });

  return data;
}
