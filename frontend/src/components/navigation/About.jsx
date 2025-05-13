const About = () => {
  return (
    <div className="min-h-screen w-full p-10">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-10 font-serif">
          Welcome to Car Rental — Where Every Journey Begins with Ease
        </h1>

        {/* This OL must have list-decimal and pl-5 */}
        <div className="w-[65%]">
          <ol className="list-decimal pl-5 space-y-4 text-lg font-serif">
          <li>
            At Car Rental, we're redefining how car rentals work by blending
            convenience, technology, and trust. Our mission is to provide a
            fast, seamless, and reliable car rental experience that empowers
            you to travel on your own terms — whether you're commuting across
            the city or exploring new destinations.
          </li>

          <li>
            We offer a diverse fleet of vehicles, including hatchbacks, sedans,
            SUVs, and premium options, so you can choose exactly what fits your
            trip. Each vehicle is regularly maintained and sanitized to ensure
            safety and comfort for every ride.
          </li>

          <li>
            <strong>Our platform is designed with user simplicity in mind:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>📄 Quick document uploads</li>
              <li>📆 Flexible start and end dates</li>
              <li>💳 Secure payment options</li>
              <li>🧾 Transparent pricing — no hidden charges</li>
            </ul>
          </li>

          <li>
            Need help? Our dedicated support team is always available to assist
            with your booking, queries, or on-road issues.
          </li>

          <li>
            Join thousands of happy customers who trust us for their car rental
            needs.
          </li>
        </ol>
        </div>

        <h2 className="text-3xl font-semibold mt-6 font-serif">
          Drive your way. Drive with Car Rental.
        </h2>
      </div>
    </div>
  );
};

export default About;
