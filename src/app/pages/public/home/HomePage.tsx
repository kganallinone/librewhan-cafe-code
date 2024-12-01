import { Link } from "react-router-dom";
import { ASSETS } from "../../../config/assetConfig";
import { ChatBotFab } from "../../../components/fab/ChatBotFab";
// import useProduct from "../../../hooks/useProduct";

const HomePage = () => {
  // const { products } = useProduct();
  // console.log(products);
  return (
    <div>
      <div className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={ASSETS.IMAGES.BG1}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2">
        <div className="relative w-full h-[25vh] overflow-hidden">
          <img
            src={ASSETS.IMAGES.RAW2}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white text-center items-center">
            <h3 className="text-3xl font-bold">Our Story</h3>
            <Link
              to={"/about"}
              className="mt-2 px-4 py-2 bg-gradient-to-b from-yellow-600 to-yellow-800 text-white rounded w-fit"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[25vh] overflow-hidden">
          <img
            src={ASSETS.IMAGES.RAW3}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white text-center items-center">
            <h3 className="text-3xl font-bold">Our Products</h3>
            <Link
              to={"/products"}
              className="mt-2 px-4 py-2 bg-gradient-to-b from-yellow-600 to-yellow-800 text-white rounded w-fit"
            >
              Menu
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[25vh] overflow-hidden">
          <img
            src={ASSETS.IMAGES.RAW4}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white text-center items-center">
            <h3 className="text-3xl font-bold">Find a Store</h3>
            <Link
              to={"/stores"}
              className="mt-2 px-4 py-2 bg-gradient-to-b from-yellow-600 to-yellow-800 text-white rounded w-fit"
            >
              Location
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[25vh] overflow-hidden">
          <img
            src={ASSETS.IMAGES.RAW5}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white text-center items-center">
            <h3 className="text-3xl font-bold">Questions?</h3>
            <Link
              to={"/faq"}
              className="mt-2 px-4 py-2 bg-gradient-to-b from-yellow-600 to-yellow-800 text-white rounded w-fit"
            >
              Ask
            </Link>
          </div>
        </div>
      </div>
      <ChatBotFab />
    </div>
  );
};

export default HomePage;
