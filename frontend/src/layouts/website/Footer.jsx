export default function Footer() {

    return (
        <footer class="bg-[#1F2937] text-gray-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div class="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-12">
                    <div class="flex flex-col space-y-2">
                        <div class="flex items-center space-x-2">
                            <div class="bg-blue-700 text-white font-semibold rounded-full h-8 w-8 flex items-center justify-center">SP
                            </div>
                            <span class="text-lg text-blue-700 font-bold">Support Ticket System</span>
                        </div>
                        <p class="text-xs sm:text-sm text-green-500 flex items-center gap-1 ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg> Trusted by 500+ clients.
                        </p>
                    </div>

                    <div>
                        <h3 class="font-bold text-white mb-2 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
                        <ul class="space-y-1 sm:space-y-2 text-white text-xs sm:text-sm">
                            <li><a href="#about" class="hover:text-blue-600 transition">Features</a></li>
                            <li><a href="#portfolio" class="hover:text-blue-600 transition">About</a></li>
                            <li><a href="#contact" class="hover:text-blue-600 transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-white mb-2 sm:mb-4 text-sm sm:text-base">Get In Touch</h3>
                        <ul class="space-y-1 sm:space-y-2 text-white text-xs sm:text-sm">
                            <li><a href="mailto:#" class="hover:text-blue-600 transition">contact@supportsystem.com.np</a>
                            </li>
                            <li><a href="tel:#" class="hover:text-blue-600 transition">+97798*****</a></li>
                            <li>Kathmandu, Nepal</li>
                        </ul>
                    </div>
                </div>

                <div
                    class="border-t border-gray-700 pt-4 mt-4 flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-400 gap-2 sm:gap-0">
                    <p>&copy; 2025 Support Ticket System. All rights reserved.</p>
                    <div class="flex flex-wrap gap-2 sm:gap-4">
                        <a href="#" class="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" class="hover:text-blue-600">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>

    );
}