import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section data-aos="fade-up">
      <div className="bg-[#f7f7f7] dark:bg-gray-900">
        <div className="container px-4 py-16 md:py-24 z-10 mx-auto font-sans flex flex-col md:flex-row justify-between items-center   ">
          <div className=" w-full md:w-1/2 space-y-10 my-16 md:mb-0 ">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-800 dark:text-white">
              A trusted and secure cryptocurrency exchange.
            </h1>
            <p className="text-lg  max-w-lg text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="rounded-2xl bg-[#3772FF] hover:bg-blue-700 text-white px-8">
              Trading Now
            </Button>
          </div>
          <div
            data-aos="fade-right"
            className=" flex justify-center w-full md:w-1/2 space-y-10 md:mb-0 "
          >
            <img
              className="w-[70%] h-[70%] object-contain"
              src="/exchange2.png"
              alt=""
            />
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
