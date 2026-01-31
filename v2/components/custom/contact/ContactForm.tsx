"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { FormData, SUBJECT_OPTIONS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const formFields = formRef.current?.querySelectorAll(".form-field") ?? [];
      gsap.from(formFields, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
        },
      });
    }, formRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Contact Form Submission:", {
      ...formData,
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-foreground text-background border-4 border-border font-black text-xl -rotate-1 shadow-[4px_4px_0px_0px_var(--border)]">
          SEND A MESSAGE
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="form-field">
          <label className="block font-black text-sm uppercase tracking-widest mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border-[4px] border-border bg-background px-4 py-3 font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--primary)] focus:border-primary transition-all"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label className="block font-black text-sm uppercase tracking-widest mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border-[4px] border-border bg-background px-4 py-3 font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--primary)] focus:border-primary transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Subject Field */}
        <div className="form-field">
          <label className="block font-black text-sm uppercase tracking-widest mb-2">
            Subject
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full border-[4px] border-border bg-background px-4 py-3 font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--primary)] focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a subject...</option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div className="form-field">
          <label className="block font-black text-sm uppercase tracking-widest mb-2">
            Your Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full border-[4px] border-border bg-background px-4 py-3 font-bold text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_var(--primary)] focus:border-primary transition-all resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        {/* Submit Button */}
        <div className="form-field">
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`
              w-full border-[5px] border-border px-8 py-4
              font-black text-lg uppercase tracking-wider
              shadow-[8px_8px_0px_0px_var(--border)]
              transition-all
              flex items-center justify-center gap-3
              ${
                isSubmitted
                  ? "bg-green-500 text-white"
                  : "bg-primary text-primary-foreground hover:shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-1 hover:translate-y-1"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                SENDING...
              </>
            ) : isSubmitted ? (
              <>
                <CheckIcon className="h-6 w-6" />
                MESSAGE SENT!
              </>
            ) : (
              <>
                SEND MESSAGE
                <ArrowRightIcon className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
