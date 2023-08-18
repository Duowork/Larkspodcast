import React, { useLayoutEffect, useRef, useMemo, useCallback,memo } from "react";
import Image from "next/image";
import AudioPlayerClass, { audioPlayer } from "@/API/audPlayer";
import MaterialIcon from "./materialIcon";
import EpisodeDescriptionModal from "@/components/EpisodeDescriptionModal";

export default memo(function PodcastEpisodes({ episodes }: { episodes: any[] }) {
  const [episodeState, setEpisodeState] = React.useState({
    description: "",
    showModal: false,
    mute: false
  });

  // Mutation object to store DOM nodes as array from loop
  const audioLengthRefs = useRef<Array<HTMLDivElement | null>>([]);
  const audioProgressRefs = useRef<Array<HTMLDivElement | null>>([]);
  const audioTimeRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Function to call reference node call method for each node
  const setRef = useCallback((
    index: number, 
    playerObj: AudioPlayerClass, 
    nodeRef: React.MutableRefObject<(HTMLDivElement|null)[]>
  ) => {
    return (element: HTMLDivElement| null) => {
      nodeRef.current[index] = element;

      if (element?.classList[0] === "progress") {
        playerObj.handleAudioProgress(element);
      }

      if (element?.classList[0] === "current") {
        playerObj.handleAudioCurrentTime(element);
      }

      if (element?.classList[0] === "length") {
        playerObj.handleAudioLength(element);
      }
    }
  },[])

  const handleModalVisibility = useCallback((modalIsClosed: boolean) => {
    if (!modalIsClosed) {
      setEpisodeState((state) => ({
        ...state,
        description: "",
        showModal: false,
      }));
    }
  },[]);

  const formatDate = (epochTimeStamp: number) => {
    const date = new Date(epochTimeStamp * 1000);

    return date.toLocaleString(undefined, { month: "long", day: "numeric" });
  };

  if (episodes.length === 0) {
    return (<p className="text-center text-gray-400 pb-10 px-10 text-2xl sm:text-3xl md:text-3xl lg:text-5l">No episode available</p>)
  }

  return (
    <div className="all-episodes grid grid-cols-1 gap-4 justify-items-center lg:w-[650px]">
      {episodes.map((episode: any, idx: number) => {
        // Pass episode audio URL to audio player
        const player = audioPlayer(episode.audioUrl);

        return (
          <div key={episode.uuid}>
            <div className="episode h-auto lg:px-0 !shadow-md ">
              <div className="flex flex-row w-full pb-2">
                <div className="podcast-image h-[80%] w-[30%] py-2 px-2 lg:mr-5 self-center">
                  <Image
                    src={episode.imageUrl}
                    alt={episode.name}
                    width={200}
                    height={200}
                    className="w-full h-full rounded"
                    priority
                  />
                </div>

                <div className="h-full podcast-description w-[70%] px-2">
                  <small>{formatDate(episode.datePublished)}</small>
                  <h3
                    className="my-2"
                    onClick={() => {
                      setEpisodeState((state) => ({
                        ...state,
                        description: episode.description,
                        showModal: true,
                      }));
                    }}
                  >
                    {episode.name}
                  </h3>
                  <p className="text-xs font-regular">{episode.description}</p>
                  {/* <div className="w-full flex justify-between mt-2 episode-listenTime-and-playBtn-container">
                    <small>12 Mins</small>
                    <div onClick={() => playPodcast(episode.audioUrl)}>
                      <MaterialIcon
                        iconName="play_arrow"
                        className="self-center custom-bg-color-primary text-white mr-5 rounded-full episode-play-btn"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              <div id="audio-player" className="rounded-b-md">
                <div
                  className="timeline"
                  onClick={(e) => player.handleAudioTimeline(e)}
                >
                  <div className="progress" ref={setRef(idx, player, audioProgressRefs)}></div>
                </div>

                <div className="controls">
                  <div className="play-container">
                    <div
                      className="toggle-play play"
                      onClick={(e) => player.handleAudioPlaybackToggle(e.target)}
                    >
                      {/* Material icon play/pause icon */}
                      <MaterialIcon iconName="play_arrow" />
                    </div>

                    <div className="time">
                      <div className="current" ref={setRef(idx, player, audioTimeRefs)}>
                        0:00
                      </div>
                      <div className="divider">/</div>
                      <div className="length" ref={setRef(idx, player, audioLengthRefs)}></div>
                    </div>

                    <div className="name">Larks</div>

                    <div className="volume-container">
                      <div className="volume-button">
                          {/* Material icon volume icon */}
                          <MaterialIcon iconName="volume_up" onClick={(e) => player.handleAudioMute(e.target)} />
                      </div>

                      {/* <div className="volume-slider">
                        <div className="volume-percentage"></div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Podcast detail modal */}
      <EpisodeDescriptionModal
        description={
          episodeState.description !== "" ? episodeState.description : ""
        }
        showModal={episodeState.showModal}
        handleVisibilty={handleModalVisibility}
      />
    </div>
  );
})
