import Head from "next/head";
import Image from "next/image";
import ModelFeed2 from "../components/ModelFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Head>
        <title>NOEXIST | Turn your snearks to your favorite games</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className="h-12 border-b border-white">
        <h1 className="flex h-full items-center p-4 text-xl font-medium">
          noexist
        </h1>
      </header>
      <section className="flex h-[600px]">
        <div className="flex flex-1 flex-col items-start justify-center">
          <div className="mb-4 w-full text-center text-5xl font-black">
            Bring your sneakers <br />
            into your favorite games
          </div>
          <div className="flex w-full justify-center space-x-4">
            <Image
              src="/sneakers.png"
              alt="Sneakers"
              width={500}
              height={300}
            />
          </div>
          <div className="flex w-full justify-center space-x-4 ">
            <Image src="/logos.png" alt="Logos" width={500} height={300} />
          </div>{" "}
        </div>
        <div className="flex-2">
          <video className="object-fit h-full" autoPlay loop muted>
            <source src="/running_slow.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      <hr />
      <div className="text-s flex p-2">
        <NameBoxes />
      </div>
      <div className="text-s flex p-2">
        <ModelFeed2 />
      </div>
    </div>
  );
}

const NameBoxes: React.FC = () => {
  const names = [
    "nike",
    "balenciaga",
    "adidas",
    "jordan",
    "salomon",
    "newbalance",
  ];

  return (
    <div className="flex flex-row flex-wrap items-center gap-2 p-4">
      {names.map((name, index) => (
        <div
          key={index}
          className="inline-block cursor-pointer border border-white px-2 text-sm font-light hover:border-black hover:bg-white hover:text-black"
        >
          {name}
        </div>
      ))}
    </div>
  );
};
