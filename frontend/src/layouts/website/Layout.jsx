import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Outlet /> {/* This is where your page content renders */}
            </main>
            <Footer />
        </div>
    );
}