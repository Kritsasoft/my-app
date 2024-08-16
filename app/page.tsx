import Slideshow from '../components/Slideshow';

const Home = () => {
  return (
    <>
      <section id="home" className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white">Welcome to My Portfolio</h1>
          <p className="text-white mt-4">Software Engineer | Web Developer | Designer</p>
        </div>
      </section>

      <section id="about" className="py-20 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-5">About Me</h2>
        <p className="max-w-2xl mx-auto">
          I am a Software Engineering student passionate about creating modern and efficient web applications.
          My focus is on clean design and high-quality code.
        </p>
      </section>

      <section id="projects" className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-5">Projects</h2>
        <Slideshow />
      </section>

      <section id="contact" className="py-20 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-5">Contact</h2>
        <p className="max-w-2xl mx-auto">
          Get in touch with me through email or social media. I am always open to discussing new opportunities or collaborations.
        </p>
      </section>
    </>
  );
};

export default Home;
