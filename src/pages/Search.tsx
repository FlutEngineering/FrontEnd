import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Grid, Input, Select, HStack, Stack } from "@chakra-ui/react";
import { RiArrowUpDownFill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroller";
import { useTagStore, useTrackStore } from "~/store";

import AudioItem, { AudioItemLoader } from "~/components/AudioItem";
import useTrackSearch, { SortingMode } from "~/hooks/useTrackSearch";

function Search(): JSX.Element {
  // const { tags, fetchTags } = useTagStore();
  const { tracks, fetchTracks } = useTrackStore();
  const [sortingMode, setSortingMode] = useState<SortingMode>("latest");
  const listRef = useRef<HTMLDivElement>(null);
  const defaultItemLimit = useMemo(
    () => (listRef.current?.offsetHeight || 80) / 88,
    [listRef.current]
  );
  const [itemLimit, setItemLimit] = useState(defaultItemLimit);
  const [searchParams, setSearchParams] = useSearchParams();
  const { sortedTracks, filter, sort, reset } = useTrackSearch(tracks);

  const searchInput = searchParams.get("q") || "";
  const setSearchInput = (value: string) =>
    setSearchParams(value ? { q: value } : undefined);

  const loadMore = (n: number) => {
    setItemLimit(itemLimit + n);
  };

  useEffect(() => reset, []);

  useEffect(() => {
    fetchTracks();
    // fetchTags(); // TODO: tags autocompletion
  }, []);

  useEffect(() => {
    if (!searchInput || sortingMode === "best-match") {
      filter(searchInput);
    } else {
      sort(sortingMode);
    }
  }, [searchInput, sortingMode]);

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;
    const mode = value ? "best-match" : "latest";
    listRef.current?.scrollTo({ top: 0 });
    setItemLimit(defaultItemLimit);

    setSortingMode(mode);
    setSearchInput(value);
  };

  const handleSortingModeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const mode = event.target.value as SortingMode;
    setItemLimit(defaultItemLimit);
    setSortingMode(mode);
  };

  const tracksToRender = sortedTracks.slice(0, itemLimit);

  return (
    <Grid
      gridTemplateRows="auto minmax(0, 100%)"
      gridTemplateColumns="1fr"
      gridTemplateAreas={`"searchbar" "track-list"`}
      width="100%"
    >
      <HStack gridArea="searchbar" marginBottom="4">
        <Input
          variant="filled"
          _focusVisible={{ borderColor: "purple.500" }}
          _placeholder={{ color: "white" }}
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <Select
          flex="1 0 auto"
          width="max-content"
          variant="filled"
          icon={<RiArrowUpDownFill />}
          textAlign="center"
          value={sortingMode}
          onChange={handleSortingModeChange}
        >
          <option value="best-match" hidden={!searchInput}>
            Best Match
          </option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetically">A-Z</option>
        </Select>
      </HStack>

      <Box
        gridArea="track-list"
        alignSelf="stretch"
        overflowY="auto"
        ref={listRef}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={() => loadMore(20)}
          hasMore={tracksToRender.length < sortedTracks.length}
          loader={<AudioItemLoader key="loader" marginBottom={2} />}
          useWindow={false}
        >
          {tracksToRender.map((track) => (
            <AudioItem
              track={track}
              key={track.id}
              onTagClick={(tag) =>
                setSearchInput(`#${tag}`.replace(/^##/, "#"))
              }
              marginBottom={2}
            />
          ))}
        </InfiniteScroll>
      </Box>
    </Grid>
  );
}

export default Search;
