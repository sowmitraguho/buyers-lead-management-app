"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email, subject, message });
        setSubmitted(true);
        // Here you can call your API to send the contact message
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <section className="bg-green-100 dark:bg-green-900 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-green-900 dark:text-green-100">
                    Contact Us
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-800 dark:text-gray-200">
                    We’d love to hear from you. Reach out with questions, suggestions or feedback.
                </p>
            </section>

            {/* Contact Form Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12">
                {/* Form */}
                <div className="md:w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    {submitted ? (
                        <p className="text-green-600 dark:text-green-400">
                            Thank you! Your message has been submitted.
                        </p>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    placeholder="Your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="h-32 w-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <Button type="submit" className="mt-4 w-full">
                                Send Message
                            </Button>
                        </form>
                    )}
                </div>

                {/* Contact Info */}
                <div className="md:w-1/3 space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-2">Our Office</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            EstateConnect Pvt Ltd <br />
                            123 Green Street <br />
                            Chandigarh, India
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-2">Email & Phone</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Email: support@estateconnect.com <br />
                            Phone: +91 9876543210
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Monday - Friday: 9am - 6pm <br />
                            Saturday: 10am - 4pm <br />
                            Sunday: Closed
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
