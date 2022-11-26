import Head from "next/head";
import { Grid, Box, Heading, Text, Divider } from "@chakra-ui/react";

import Subpage from "@/components/subpage";
import LinkBox from "@/components/link-box";

import { serialize } from "next-mdx-remote/serialize";
import { scanDirectory, scanFile } from "@/lib/helpers";

export async function getStaticProps() {
  const coursePaths = await scanDirectory("src/posts/teaching/*");
  const courseSources = await Promise.all(
    coursePaths.map(async (coursePath: string) => {
      const course = coursePath.split("/").at(-1);
      const source = await scanFile(`src/posts/teaching/${course}/index.mdx`);
      const serialized = await serialize(source, { parseFrontmatter: true });

      return serialized;
    })
  );
  return {
    props: { courseSources },
  };
}

export default function Teaching({ courseSources }: any) {
  return (
    <>
      <Head>
        <title>Teaching | Mika Senghaas</title>
        <meta name="description" content="Data Science Student/ Teaching Asssistant @ ITU" />
        <meta property="og:title" content="Teaching | Mika Senghaas" />
        <meta name="og:description" content="Data Science Student/ Teaching Asssistant @ ITU" />
        <meta property="og:image" content="/assets/social-preview.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary"></meta>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      </Head>
      <Subpage>
        <Heading mb={10} fontSize="4xl">
          Teaching
        </Heading>
        <Grid my={4} templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }} gap={6}>
          {courseSources.map(({ frontmatter }: any) => {
            return <LinkBox orientation="vertical" meta={frontmatter} href={`/teaching/${frontmatter.id}`} key={frontmatter.id} />;
          })}
        </Grid>
      </Subpage>
    </>
  );
}
