import Head from "next/head";

import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Typed from "react-typed";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Box, Image, Text, Link } from "@chakra-ui/react";

import Header from "components/Header";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
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

          <Link className={styles.card} target="_blank">
            <h2 className={inter.className}>
              Jobs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>(Currently Full)</p>
          </Link>

          <Link href="/community" className={styles.card}>
            <h2 className={inter.className}>
              Community <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Our museum of community Art</p>
          </Link>

          <Link href="/engineering" className={styles.card}>
            <h2 className={inter.className}>
              Architecture <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Take a Look under the Hood</p>
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
