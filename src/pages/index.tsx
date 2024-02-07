import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  CreateButton,
  CustomContainer,
  HackathonBox,
  HackathonsContainer,
  Layout,
  TinyLabelCard,
  Title,
} from "@/components/atoms";
import { useDB } from "@/hooks/useDB";
import { useIsMounted } from "@/hooks/useIsMounted";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();

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
            This is a lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
            This is a lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <Link href="" passHref>
            <CreateButton>Create Poll</CreateButton>
          </Link>

          <p></p>
          <br />
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}
