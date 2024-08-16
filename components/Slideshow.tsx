import { Carousel } from 'flowbite-react';

const Slideshow = () => {
  return (
    <div className="h-96 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={3000}>
        <img src="/images/slide1.jpg" alt="Slide 1" />
        <img src="/images/slide2.jpg" alt="Slide 2" />
        <img src="/images/slide3.jpg" alt="Slide 3" />
      </Carousel>
    </div>
  );
};

export default Slideshow;
