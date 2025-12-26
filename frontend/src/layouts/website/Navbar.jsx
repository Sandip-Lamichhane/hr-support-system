import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="bg-white shadow-md fixed top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-700">HR Support System</h1>
                
                <nav className="space-x-6 hidden md:block">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/features" className="hover:text-blue-600">Features</Link>
                    <Link to="/about" className="hover:text-blue-600">How It Works</Link>
                    <Link to="/contact" className="hover:text-blue-600">Contact</Link>
                </nav>

                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Login
                </Link>
            </div>
        </header>
    );
}