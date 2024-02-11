import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  Button,
  CustomContainer,
  Description,
  LabelBox,
  Layout,
  Row,
  Details,
  Title,
} from "@/components/atoms";
import { votingPolls } from "@/utils/data";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAsyncMemo } from "use-async-memo";

const Poll = () => {
  const router = useRouter();
  const { id } = router.query;

  const poll = useAsyncMemo(async () => {
    if (!id) return;
    return votingPolls[parseInt(id as string)];
  }, [id]);

  if (!poll) return <p>Loading...</p>;
  return (
    <>
      <Head>
        <title>{poll.title} - CloakPoll</title>
        <meta name="description" content={`Details of ${poll.title}`} />
      </Head>

      <Layout>
        <Nav />

        <CustomContainer as="main">
          <Link href="/">
            <p>Back to polls</p>
          </Link>
          <Title>{poll.title}</Title>
          <Description>
            Created by: <b>0x8d3b65FcF2cfCcF80e27a9910D19301B1492871f</b>
          </Description>
          <Row>
            <Details>
              <span>Starts at:</span> {new Date(poll.startDate).toDateString()}
            </Details>
            <Details>
              <span>Ends at:</span> {new Date(poll.endDate).toDateString()}
            </Details>
          </Row>
          <Title>Votes</Title>
          Here voting data will be displayed
        </CustomContainer>

        <Footer />
      </Layout>
    </>
  );
};

export default Poll;
