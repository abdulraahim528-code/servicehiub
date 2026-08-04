import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/60 bg-[#f7f8ed]/75 pt-16 pb-8 backdrop-blur-sm">
            <div className="w-full border-t border-slate-100 mb-8" />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-12 w-12 overflow-hidden rounded-3xl shadow-lg">
                                <svg viewBox="0 0 48 48" className="h-12 w-12 block" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="g1" x1="0" x2="1">
                                            <stop offset="0%" stopColor="#0aa39a" />
                                            <stop offset="100%" stopColor="#07877f" />
                                        </linearGradient>
                                    </defs>
                                    <rect width="48" height="48" rx="10" fill="url(#g1)" />
                                    <g transform="translate(8,8) scale(0.7)" fill="none" stroke="#fff" strokeWidth="2">
                                        <path d="M12 2c-4 0-8 4-8 8s4 8 8 8 8-4 8-8-4-8-8-8z" strokeOpacity="0.08" />
                                        <path d="M6 9l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-[#07877f]">ServiceHub</h3>
                            </div>
                        </div>
                        <p className="text-slate-500 text-base">ServiceHub connects households with verified local professionals — booked in seconds, backed by a satisfaction guarantee.</p>

                        <ul className="mt-6 space-y-3 text-base text-slate-600">
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-sky-500" />
                                <span>hello@servicehub.app</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-sky-500" />
                                <span>+1 (415) 555-0110</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-sky-500" />
                                <span>22 Market Street, San Francisco</span>
                            </li>
                        </ul>

                        <div className="mt-6 flex items-center gap-3">
                            <a className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-sky-600 hover:bg-sky-50 transition" href="#" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" aria-hidden>
                                    <path fill="currentColor" d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.095 0 2.238.196 2.238.196v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-sky-600 hover:bg-sky-50 transition" href="#" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" aria-hidden>
                                    <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.5-3a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
                                </svg>
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-sky-600 hover:bg-sky-50 transition" href="#" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" aria-hidden>
                                    <path fill="currentColor" d="M22.162 5.656c-.66.293-1.368.491-2.112.58a3.706 3.706 0 0 0 1.626-2.044 7.388 7.388 0 0 1-2.347.9 3.692 3.692 0 0 0-6.29 3.366A10.48 10.48 0 0 1 3.15 4.61a3.69 3.69 0 0 0 1.142 4.923 3.65 3.65 0 0 1-1.672-.462v.046a3.693 3.693 0 0 0 2.96 3.617 3.7 3.7 0 0 1-1.667.063 3.694 3.694 0 0 0 3.447 2.562A7.397 7.397 0 0 1 2 19.54a10.438 10.438 0 0 0 5.657 1.658c6.79 0 10.506-5.624 10.506-10.506 0-.16-.004-.318-.011-.475a7.52 7.52 0 0 0 1.81-1.902z" />
                                </svg>
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-sky-600 hover:bg-sky-50 transition" href="#" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" aria-hidden>
                                    <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.56V24H.22V8.98zM8.98 8.98h4.37v2.04h.06c.61-1.16 2.1-2.39 4.33-2.39 4.63 0 5.48 3.05 5.48 7.01V24h-4.56v-6.4c0-1.53-.03-3.49-2.13-3.49-2.13 0-2.46 1.67-2.46 3.39V24H8.98V8.98z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-3 font-semibold text-slate-900">Quick Links</h4>
                        <ul className="space-y-2 text-base text-slate-600">
                            <li><Link href="/" className="hover:text-sky-600">Home</Link></li>
                            <li><Link href="/services" className="hover:text-sky-600">Services</Link></li>
                            <li><Link href="/providers" className="hover:text-sky-600">Providers</Link></li>
                            <li><Link href="/about" className="hover:text-sky-600">About</Link></li>
                            <li><Link href="/contact" className="hover:text-sky-600">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-3 font-semibold text-slate-900">Categories</h4>
                        <ul className="space-y-2 text-base text-slate-600">
                            <li>Electrician</li>
                            <li>Plumber</li>
                            <li>Painter</li>
                            <li>Cleaner</li>
                            <li>Home Tutor</li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="mb-3 font-semibold text-slate-900">Stay in the loop</h4>
                        <p className="text-base text-slate-500">Monthly home-care tips and offers. No spam, ever.</p>

                        <div className="mt-4 flex items-center gap-3">
                            <input placeholder="you@email.com" className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-base focus:outline-none" />
                            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-base text-slate-600">© {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                        <div className="flex items-center gap-4 text-base text-slate-600">
                            <Link href="#" className="hover:text-sky-600">Privacy</Link>
                            <Link href="#" className="hover:text-sky-600">Terms</Link>
                            <Link href="#" className="hover:text-sky-600">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
