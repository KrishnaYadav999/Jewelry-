import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-700">
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <img
          src="https://i.pinimg.com/736x/5f/f9/6f/5ff96fe660281f8ae0e7a3c299bcf911.jpg"
          alt="Ring"
          className="w-16 h-16 object-contain"
        />
        <img
          src="https://i.pinimg.com/736x/41/35/db/4135dbaa77c474edaf8c3203d4062b4b.jpg"
          alt="Ring"
          className="w-16 h-16 object-contain"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="text-6xl font-serif flex items-center gap-3">
            <span>4</span>
            <span>
              <img
                src="https://i.pinimg.com/736x/4a/3c/c1/4a3cc10a8673557097d51e951de745c3.jpg"
                alt="Ring"
                className="w-12 h-12 inline-block"
              />
            </span>
            <span>4</span>
          </div>
          <p className="text-lg font-light mt-4">Whoops, page not found</p>
          <p className="text-sm mt-2">
            Don’t panic, you can go to the{" "}
            <a
              href="/catalog"
              className="text-blue-500 hover:underline font-medium"
            >
              catalogue
            </a>{" "}
            or start from the{" "}
            <a
              href="/"
              className="text-blue-500 hover:underline font-medium"
            >
              homepage
            </a>
            .
          </p>
        </div>
        <img
          src="https://i.pinimg.com/736x/4a/3c/c1/4a3cc10a8673557097d51e951de745c3.jpg"
          alt="Ring"
          className="w-16 h-16 object-contain"
        />
        <img
          src="https://i.pinimg.com/736x/f8/7c/9d/f87c9d86fc4d57196041aa7331a57dcb.jpg"
          alt="Bracelet"
          className="w-16 h-16 object-contain"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
