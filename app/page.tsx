import Header from "./_component/Header";
import Footer from "./_component/Footer";
import GameBoard from "./_component/GameBoard";
import GameHeader from "./_component/GameHeader";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto place-items-center">
        <section className="grid grid-cols-1  place-items-center">
          <GameHeader />
          <GameBoard />
        </section>
      </main>
      <Footer />
    </>
  );
}
