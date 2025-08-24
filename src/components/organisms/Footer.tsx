export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">About Us</h4>
          <p className="text-sm leading-relaxed">
            We are a global humanitarian organization providing rapid
            response and long-term support to communities affected by
            natural disasters such as storms, floods, and earthquakes.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:underline">Latest Emergencies</a></li>
            <li><a href="#" className="hover:underline">Disaster Forecast</a></li>
            <li><a href="#" className="hover:underline">Relief Projects</a></li>
            <li><a href="#" className="hover:underline">Donate</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-sm">
            Email: info@relieforg.org<br />
            Phone: +1 (800) 123-4567<br />
            Address: 123 Humanitarian Ave, Geneva, CH
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Weather Alerts</h4>
          <p className="text-sm">
            Stay up to date with the latest forecasts, early warnings,
            and emergency alerts via our email and SMS services.
          </p>
          <form className="mt-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-gray-800 rounded mb-2"
            />
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-sm border-t border-blue-700 pt-6">
        © 2025 Relief Organization. All rights reserved.
      </div>
    </footer>
  );
}
