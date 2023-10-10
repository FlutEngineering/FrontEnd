import React from "react";
import {
  Stack,
  Text,
  CardBody,
  Card,
  Box,
  Icon,
  Link,
  CardFooter,
  Button,
  HStack,
  Image,
  CardProps,
} from "@chakra-ui/react";
import { useEnsName } from "wagmi";
import { Link as RouterLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaPause, FaPlay } from "react-icons/fa";
import { css } from "@emotion/react";
import { formatArtistName, ipfsCidToUrl } from "~/utils";
import { usePlayerStore } from "~/store";
import { ASSETS_URL } from "~/config";
import type { Track } from "~/types";

import TagBadge from "./TagBadge";
import Marquee from "./Marquee";

type AudioItemProps = {
  track: Track;
  onTagClick?: (tag: string) => void;
};

export const AudioItemLoader: React.FC<CardProps> = (props) => (
  <Card
    flex="1 0 auto"
    direction="row"
    justifyContent="center"
    alignItems="center"
    bg="whiteAlpha.100"
    color="whiteAlpha.700"
    height="40px"
    padding="0"
    variant="filled"
    overflow="hidden"
    cursor="default"
    transition="all 200ms linear"
    {...props}
  >
    Loading
  </Card>
);
const AudioItem: React.FC<AudioItemProps & CardProps> = ({
  track,
  onTagClick,
  ...rest
}) => {
  const { track: current, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { data: ensName } = useEnsName({ address: track.artistAddress });
  const isCurrentTrack = current && current?.audio === track.audio;

  return (
    <Card
      position="relative"
      flex="1 0 auto"
      direction="row"
      overflow="hidden"
      height="80px"
      padding="0"
      variant="outline"
      transition="all 200ms linear"
      cursor="default"
      borderColor={isCurrentTrack ? "purple.500" : undefined}
      css={css`
        &:hover .play-icon {
          opacity: 1;
          transition: opacity 200ms ease;
        }
      `}
      {...rest}
    >
      <Box
        width="80px"
        height="80px"
        minWidth="80px"
        onClick={() => (!isCurrentTrack ? playTrack(track) : togglePlay())}
        cursor="pointer"
      >
        <Icon
          position="absolute"
          left="20px"
          top="20px"
          width="40px"
          height="40px"
          color="white"
          opacity={isCurrentTrack ? 1 : 0}
          as={isCurrentTrack && isPlaying ? FaPause : FaPlay}
          className="play-icon"
        />
        <Image
          objectFit="cover"
          maxWidth="80px"
          maxHeight="80px"
          loading="lazy"
          alt="Cover"
          src={`${ASSETS_URL}/thumbnails/${track.image}_160.jpg`}
        />
      </Box>

      <Stack paddingRight="100px" overflow="hidden">
        <CardBody
          as={Stack}
          width="100%"
          paddingY="0"
          paddingRight="0"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Stack paddingTop="1" spacing="0">
            <Box>
              <Text
                as={RouterLink}
                to={`/${track.artistAddress}`}
                color="gray.300"
                fontSize="sm"
                margin="0"
                _hover={{ textDecoration: "underline" }}
              >
                {formatArtistName({ address: track.artistAddress, ensName })}
              </Text>
            </Box>

            <Box
              as={RouterLink}
              to={`/${track.artistAddress}/${track.slug}`}
              fontSize="lg"
              fontWeight="bold"
              paddingBottom="4px"
              lineHeight="1.2"
              title={track.title}
            >
              {isCurrentTrack ? (
                <Marquee>{track.title}</Marquee>
              ) : (
                <Box overflow="hidden" textOverflow="ellipsis">
                  {track.title}
                </Box>
              )}
            </Box>

            <HStack>
              {track.tags.map((tag) => (
                <TagBadge
                  tag={tag}
                  key={tag}
                  onClick={onTagClick ? () => onTagClick(tag) : undefined}
                />
              ))}
            </HStack>
          </Stack>
        </CardBody>
      </Stack>

      <CardFooter position="absolute" right="0" alignItems="center">
        <Button
          size="sm"
          as={Link}
          href={ipfsCidToUrl(track.audio)}
          isExternal
          ml={1}
          color="gray.200"
          fontSize="xs"
          fontWeight="bold"
          whiteSpace="nowrap"
        >
          IPFS
          <ExternalLinkIcon mx="2px" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AudioItem;
