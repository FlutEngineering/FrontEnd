import { useMemo } from "react";
import { useEnsName } from "wagmi";
import { Box, HStack, Image, StackProps, Text } from "@chakra-ui/react";
import { Track } from "~/types";
import { formatArtistName, ipfsCidToUrl } from "~/utils";
import { Link as RouterLink } from "react-router-dom";

interface TrackInfoProps {
  track: Track;
}

const TrackInfo: React.FC<TrackInfoProps & StackProps> = ({
  track,
  ...props
}) => {
  const { data: ensName } = useEnsName({ address: track.artistAddress });
  const artist = useMemo(
    () => formatArtistName({ address: track.artistAddress, ensName }),
    [track, ensName]
  );
  return (
    <HStack
      as={RouterLink}
      to={`/${track.artistAddress}/${track.slug}`}
      maxWidth="200px"
      paddingRight="2"
      cursor="pointer"
      borderRadius="sm"
      overflow="hidden"
      _hover={{ background: "gray.50" }}
      {...props}
    >
      <Image
        width="9"
        height="9"
        minWidth="9"
        minHeight="9"
        borderRadius="sm"
        overflow="hidden"
        src={ipfsCidToUrl(track.image)}
      />
      <Box paddingBottom="0" overflow="hidden">
        <Text color="gray.500" fontSize="xs" lineHeight="1">
          {artist}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {track.title}
        </Text>
      </Box>
    </HStack>
  );
};

export default TrackInfo;
