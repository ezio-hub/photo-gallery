import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-center space-x-6">
          <li>
            <a href="#">Meta</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Locations</a>
          </li>
          <li>
            <a href="#">Instagram Lite</a>
          </li>
          <li>
            <a href="#">Threads</a>
          </li>
          <li>
            <a href="#">Contact Uploading & Non-Users</a>
          </li>
          <li>
            <a href="#">Meta Verified</a>
          </li>
        </ul>
        <p className="text-center mt-2 text-gray-600">© 2024 Instagram from Meta</p>
      </div>
    </footer>
  );
};

export default Footer;
