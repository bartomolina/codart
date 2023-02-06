import Head from "next/head";

const About = () => (
  <>
    <Head>
      <title>About - CodArt</title>
      <meta name="description" content="CodArt" />
    </Head>
    <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">About</h1>
    </header>
    <div className="bg-gray-100">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-44 pt-5">
        Stats: collections by script, dates...
      </div>
    </div>
  </>
);

export default About;