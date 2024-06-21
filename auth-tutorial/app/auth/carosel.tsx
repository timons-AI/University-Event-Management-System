import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const SliderImage = () => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 20,
        }}
      >
        <CarouselContent className="  bg-slate-100 w-fit h-full">
          <CarouselItem>
            <img
              className=" h-full w-full object-cover"
              src="/kids.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className=" h-full w-full object-cover"
              src="/event1.jpg"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className=" h-full w-full object-cover"
              src="/event2.jpeg"
              alt=""
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default SliderImage;
