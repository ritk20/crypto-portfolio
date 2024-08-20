import React from "react";

const Footer = () => {
  return (
    <footer class=" text-white py-8 w-screen border-t-2 border-gray-800">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 px-6">
        <div class="flex flex-col">
          <h3 class="text-lg font-bold mb-4">Crypto Portfolio App</h3>
          <p class="mb-4">
            Manage your crypto assets, track allowances, and stay informed with
            real-time data.
          </p>
        </div>

        <div class="flex flex-col">
          <h3 class="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li class="mb-2">
              <a href="/" class="hover:underline">
                Home
              </a>
            </li>
            <li class="mb-2">
              <a href="/features" class="hover:underline">
                Features
              </a>
            </li>
            <li class="mb-2">
              <a href="/pricing" class="hover:underline">
                Pricing
              </a>
            </li>
            <li class="mb-2">
              <a href="/about" class="hover:underline">
                About Us
              </a>
            </li>
            <li class="mb-2">
              <a href="/contact" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div class="flex flex-col">
          <h3 class="text-lg font-bold mb-4">Policies</h3>
          <ul>
            <li class="mb-2">
              <a class="hover:underline">Disclamer</a>
            </li>
            <li class="mb-2">
              <a class="hover:underline">Terms of Use</a>
            </li>
            <li class="mb-2">
              <a class="hover:underline">Privacy Policy</a>
            </li>
            <li class="mb-2">
              <a class="hover:underline">Cookie Policy</a>
            </li>
            <li class="mb-2">
              <p class="hover:underline">Refund Policy</p>
            </li>
          </ul>
        </div>

        <div class="flex flex-col">
          <h3 class="text-lg font-bold mb-4">Connect with Us</h3>
          <div class="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              class="text-white hover:text-blue-400"
            >
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.31 4.31 0 001.88-2.39c-.83.49-1.75.85-2.72 1.04a4.29 4.29 0 00-7.35 3.9A12.17 12.17 0 013 4.92a4.29 4.29 0 001.33 5.73c-.69-.02-1.33-.21-1.9-.52v.05c0 2.01 1.44 3.7 3.34 4.08-.35.1-.73.16-1.12.16-.27 0-.54-.03-.8-.08.54 1.69 2.1 2.93 3.94 2.96a8.6 8.6 0 01-5.3 1.82c-.34 0-.68-.02-1.01-.06a12.12 12.12 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.56.84-.61 1.57-1.37 2.15-2.24z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="text-white hover:text-gray-400"
            >
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 00-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.36-1.34-3.36-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.59 9.59 0 015 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.21 2.4.11 2.65.63.7 1.02 1.6 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.35.3.68.89.68 1.8v2.67c0 .26.18.58.69.48A10 10 0 0012 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="text-white hover:text-blue-600"
            >
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M16.59 8c2.36 0 4.13 1.54 4.13 4.85V20h-4.3v-7.52c0-1.9-.7-3.2-2.42-3.2-1.32 0-2.1.88-2.45 1.73-.13.3-.16.7-.16 1.11V20h-4.29s.06-10.86 0-12h4.29v1.71c.25-.4 1.06-1.07 2.56-1.07 1.86 0 3.25 1.19 3.25 3.75V20H16.6v-7.53zM6.34 5a2.34 2.34 0 01-2.35-2.34C4 2.18 4.96 1.21 6.34 1.21s2.34.96 2.34 2.34A2.34 2.34 0 016.34 5zM4.22 20h4.24V8H4.22v12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-4">
        <div class="flex mx-20 px-1 md:justify-center">
          <p class="text-gray-500 text-sm">
            © 2024 Crypto Portfolio App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
