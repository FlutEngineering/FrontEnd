import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Typed from "react-typed";
import { render } from "react-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AudioUploader from "../components/AudioUploader";

import {
  Box,
  Image as ChakraImage,
  Text,
  Heading,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";

import { FaMediumM, FaTwitter, FaTelegram } from "react-icons/fa";
import Header from "components/Header";
// import FlutBalance from "components/FlutBalance";

// import { useBalance } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { data, isError, isLoading } = useBalance({
  //   address: "0x4F08705FB8F33AffC231ed66e626B40E84A71870",
  // });

  // if (isLoading) return <div>Fetching balance…</div>;
  // if (isError) return <div>Error fetching balance</div>;
  return (
    <Box>
      <Head>
        <title>The Decentralized Music Platform</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flut.ico" />
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        padding="6rem"
        minHeight="100vh"
      >
        <Header />
        <Text
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="9xl"
        >
          FLUT
        </Text>
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
        {/* <Text>
          {data?.formatted} {data?.symbol}
        </Text> */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="xl"
        >
          <Typed
            strings={[
              "Equity, Creative Compensation, Decentralization",
              "Envision a more sustainable music industry",
              "Building.. building.. building..",
            ]}
            typeSpeed={50}
            backSpeed={45}
            loop
          ></Typed>
        </Box>

        <div className={styles.grid}>
          <Link href="/meaning" className={styles.card}>
            <h2 className={inter.className}>
              Ethos <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Why does this matter in the world that we live?
            </p>
          </Link>

          <Link className={styles.card} href="/jobs">
            <h2 className={inter.className}>
              Jobs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Current Engineering Jobs</p>
          </Link>

          <Link href="/community" className={styles.card}>
            <h2 className={inter.className}>
              Community <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Our museum of community Art</p>
          </Link>

          <Link target="_blank" className={styles.card}>
            <h2 className={inter.className}>
              Architecture <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Take a Look under the Hood (Updates Coming Shortly)
            </p>
          </Link>
        </div>
      </Box>
    </Box>
  );
}
