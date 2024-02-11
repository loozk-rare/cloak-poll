import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  CreateButton,
  CustomContainer,
  PollBox,
  Layout,
  PollsContainer,
  Title,
  SmallLabel,
} from "@/components/atoms";
import { useIsMounted } from "@/hooks/useIsMounted";
import { votingPolls } from "@/utils/data";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();

  const isEnded = (endDate: string) => {
    const now = Date.now();
    const endDateTimestamp = new Date(endDate).getTime();
    return now > endDateTimestamp;
  };

  const getBackgroundColor = (endDate: string) => {
    if (isEnded(endDate)) {
      return "red";
    } else {
      return "green";
    }
  };

  return (
    <>
      <Head>
        <title>Cloak Poll</title>
        <meta name="description" content="Cloak Poll." />
      </Head>

      <Layout>
        <Nav />

        <CustomContainer as="main">
          <h1>Cloack Poll</h1>
          <p>
            Start creating your poll now. It's easy and fully on-chain tracked.
          </p>

          <Link href="/poll/create" passHref>
            <CreateButton>Create Poll</CreateButton>
          </Link>

          <Title>Polls</Title>
          <PollsContainer>
            {votingPolls.map((poll, index) => (
              <PollBox key={index} onClick={() => router.push(`poll/${index}`)}>
                <h3>{poll.title}</h3>
                <SmallLabel
                  style={{ background: getBackgroundColor(poll.endDate) }}
                >
                  {isEnded(poll.endDate) ? "Ended" : "Active"}
                </SmallLabel>
                <p>Start Date: {new Date(poll.startDate).toDateString()}</p>
                <p>End Date: {new Date(poll.endDate).toDateString()}</p>
              </PollBox>
            ))}
          </PollsContainer>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
