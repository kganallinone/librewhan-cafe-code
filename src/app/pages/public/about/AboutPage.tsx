import { ChatBotFab } from "../../../components/fab/ChatBotFab";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-teal-600 mb-6">
          Welcome to Librewhan Cafe
        </h1>
        <p className="text-xl text-gray-600 italic">
          A coffee shop with books is not just a place; it's a haven for
          dreamers, a sanctuary where the aroma of coffee mingles with the magic
          of words, creating a symphony for the senses.
        </p>
      </section>

      {/* About Section */}
      <section className="bg-white shadow-lg rounded-lg p-10 text-center">
        <h2 className="text-3xl font-semibold text-teal-600 mb-6">About Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          At <span className="font-bold text-teal-500">Librewhan Cafe</span>, we
          believe that coffee and books are two of life’s greatest pleasures.
          Our mission is to create a cozy space where people can escape the
          hustle and bustle of daily life and immerse themselves in a world of
          rich flavors and inspiring stories.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Whether you're looking for a quiet corner to read your favorite novel
          or need a space to catch up with friends over a cup of artisanal
          coffee, Librewhan Cafe offers the perfect setting. The gentle hum of
          conversations, the sound of turning pages, and the rich aroma of
          freshly brewed coffee create a peaceful ambiance where you can unwind,
          dream, and connect.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          From our carefully sourced coffee beans to our collection of
          handpicked books, every detail at Librewhan Cafe is designed to
          transport you to a place where creativity flourishes and time slows
          down.
        </p>
        <p className="text-lg text-gray-700">
          Come and join us in celebrating the beauty of simple joys – one cup,
          one page, one moment at a time.
        </p>
      </section>

      {/* Values Section */}
      <section className="mt-16">
        <h2 className="text-4xl font-bold text-teal-600 text-center mb-8">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Passion for Coffee
            </h3>
            <p className="text-gray-700">
              We are passionate about crafting the finest coffee, sourced
              ethically and brewed to perfection. Each cup is made with care,
              delivering a delightful experience with every sip.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Love for Books
            </h3>
            <p className="text-gray-700">
              Our love for books is at the heart of everything we do. We aim to
              create a sanctuary for readers, where the pages of every book
              invite curiosity and inspiration.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Community Spirit
            </h3>
            <p className="text-gray-700">
              Librewhan Cafe is a space for connection. We foster a welcoming
              environment where friends, families, and strangers can come
              together to share ideas, stories, and moments of joy.
            </p>
          </div>
        </div>
      </section>
      <ChatBotFab />
    </div>
  );
};

export default AboutPage;
