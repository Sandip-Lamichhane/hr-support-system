import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Bell, Search, TrendingUp, Lock, Sparkles } from 'lucide-react';

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Smart Ticketing",
            description: "AI-powered ticket routing gets your issue to the right expert instantly",
            color: "from-blue-400 to-blue-600"
        },
        {
            icon: <Bell className="w-8 h-8" />,
            title: "Instant Notifications",
            description: "Stay updated with real-time alerts on every ticket update",
            color: "from-cyan-400 to-blue-500"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Priority Management",
            description: "Automatic prioritization ensures urgent issues get immediate attention",
            color: "from-blue-500 to-indigo-600"
        }
    ];

    const benefits = [
        { icon: <Search className="w-6 h-6" />, text: "Advanced search & filtering" },
        { icon: <Lock className="w-6 h-6" />, text: "Enterprise-grade security" },
        { icon: <Sparkles className="w-6 h-6" />, text: "Smart automation tools" }
    ];

    return (
        <div className="min-h-screen bg-blue-200 overflow-hidden">
            {/* Hero Section */}
            <section className="min-h-svh relative px-4 py-24 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-1/8 w-96 h-96 bg-blue-300 rounded-full opacity-5 animate-pulse"></div>
                    <div className="absolute bottom-0 right-7 w-96 h-96 bg-blue-300 rounded-full opacity-5 animate-pulse z-10" style={{ animationDelay: '1.5s' }}></div>
                </div>
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className={`relative max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block mb-6 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium text-sm animate-bounce">
                                ✨ Powered by AI Technology
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent leading-tight">
                                Support Tickets
                                <br />
                                Reimagined
                            </h1>

                            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed">
                                Experience the future of customer support with intelligent ticket management that works as fast as you do
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                                <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-10 py-4 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-300">
                                    Watch Demo
                                </button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                                <img
                                    src="././images/hero.jpg"
                                    alt="Support Ticketing System"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                            </div>

                            {/* Floating decoration */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Animated Feature Cards */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`group relative bg-white p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl cursor-pointer ${activeCard === idx ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'
                                    }`}
                                onMouseEnter={() => setActiveCard(idx)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500"
                                    style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>

                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                <div className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full transform origin-left transition-all duration-500 ${activeCard === idx ? 'scale-x-100' : 'scale-x-0'
                                    }`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Benefits Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-50"></div>

                        <div className="relative">
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                                Everything you need,
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    all in one place
                                </span>
                            </h2>

                            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                                Our platform combines powerful features with intuitive design to streamline your support workflow
                            </p>

                            <div className="grid sm:grid-cols-3 gap-6 mb-10">
                                {benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        <div className="text-blue-600 bg-white p-2 rounded-lg shadow-sm">
                                            {benefit.icon}
                                        </div>
                                        <span className="font-medium text-gray-700">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
                                Explore All Features
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full opacity-5 animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full opacity-5 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Ready to transform your support?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Join forward-thinking teams who are delivering exceptional support experiences
                    </p>
                    <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-2">
                        Start Your Free Trial
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </section>
        </div>
    );
}