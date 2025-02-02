import Header from "./_component/Header";
import Footer from "./_component/Footer";
import Game from "./_component/Game";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto place-items-center">
        <section className="grid grid-cols-1 place-items-center">
          <Game />
        </section>
      </main>
      <Footer />
    </>
  );
}
