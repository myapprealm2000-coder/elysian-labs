import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useContact";
import {
  CheckCircle2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    line1: "hello@elysianlabs.com",
    line2: "Aneeshwar R",
    href: "mailto:hello@elysianlabs.com",
  },
  {
    icon: Phone,
    label: "Contact",
    line1: "Aneeshwar R",
    line2: "Mon-Fri, 9am-6pm EST",
    href: null,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    line1: "123 Digital Avenue",
    line2: "San Francisco, CA 94105",
    href: null,
  },
];

const SOCIAL_LINKS = [
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com/elysianlabs",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/elysianlabs",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/elysianlabs",
  },
];

const FAQS = [
  {
    id: "turnaround",
    q: "What is your turnaround time?",
    a: "Most deliverables are ready in 2–5 business days. Complex video projects may require a few extra days, and we always communicate timelines upfront.",
  },
  {
    id: "revisions",
    q: "Do you do revisions?",
    a: "Yes — every project includes 2 rounds of revisions at no extra cost. Additional revision rounds can be purchased if needed.",
  },
  {
    id: "formats",
    q: "What formats do you deliver?",
    a: "We deliver PNG and PDF for static assets, MP4 for video content, and AI / PSD source files for brand identity work.",
  },
  {
    id: "rush",
    q: "Do you offer rush orders?",
    a: "Yes, rush orders are available with a 50% rush fee. These are prioritised in our queue and delivered within 24–48 hours.",
  },
];

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const SERVICE_OPTIONS_SELECT = [
  { value: "thumbnail", label: "Thumbnail Design" },
  { value: "ad-creative", label: "Ad Creative" },
  { value: "video-editing", label: "Video Editing" },
  { value: "brand-identity", label: "Brand Identity" },
  { value: "social-media", label: "Social Media Kits" },
  { value: "motion-graphics", label: "Motion Graphics" },
];

const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-plus", label: "$15,000+" },
  { value: "custom", label: "Let's discuss" },
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitContact, isPending: loading } = useSubmitContact();

  const handleChange =
    (field: keyof Pick<FormState, "name" | "email" | "company" | "message">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleBlur =
    (field: keyof Pick<FormState, "name" | "email" | "message">) => () => {
      const val = form[field];
      if (!val.trim()) {
        setErrors((prev) => ({
          ...prev,
          [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        }));
      } else if (field === "email" && !validateEmail(val)) {
        setErrors((prev) => ({
          ...prev,
          email: "Enter a valid email address",
        }));
      } else if (field === "message" && val.trim().length < 20) {
        setErrors((prev) => ({
          ...prev,
          message: "Message must be at least 20 characters",
        }));
      }
    };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitContact(
      { name: form.name, email: form.email, message: form.message },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Message sent! We'll be in touch.", {
            duration: 5000,
            style: {
              background: "oklch(0.16 0 0)",
              border: "1px solid rgba(80,200,120,0.4)",
              color: "#50c878",
            },
          });
        },
        onError: () => {
          toast.error("Failed to send. Please try again.", {
            duration: 5000,
            style: {
              background: "oklch(0.16 0 0)",
              border: "1px solid rgba(220,60,60,0.4)",
              color: "#ff6b6b",
            },
          });
        },
      },
    );
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0d1118 0%, #0a0f1a 50%, #0a1f15 100%)",
        }}
      >
        {/* Subtle green glow top-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(0,255,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-5 font-body px-3 py-1"
              style={{
                borderColor: "rgba(0,255,0,0.3)",
                color: "#00ff00",
                background: "rgba(0,255,0,0.06)",
              }}
            >
              Contact Us
            </Badge>
          </motion.div>
          <motion.h1
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Let&apos;s Build Something{" "}
            <span
              className="text-transparent bg-clip-text block"
              style={{
                backgroundImage: "linear-gradient(90deg, #0047ab, #00ff00)",
              }}
            >
              Extraordinary
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to start your next project? Get a quote, discuss a
            collaboration, or just say hello — we&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main 2-column section */}
      <section className="py-12 px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left column: contact info + social */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              {/* Contact Info heading */}
              <div>
                <h2 className="font-display font-bold text-2xl mb-2">
                  <span className="text-foreground">Contact</span>{" "}
                  <span style={{ color: "#50c878" }}>Information</span>
                </h2>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  Have a project in mind? We'd love to hear about it. Fill out
                  the form or reach out directly.
                </p>
              </div>

              {/* Contact details */}
              <div className="glass-effect rounded-2xl p-6 flex flex-col gap-5">
                {CONTACT_INFO.map(
                  ({ icon: Icon, label, line1, line2, href }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4"
                      data-ocid={`contact-info-${label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {/* Gradient icon container */}
                      <div
                        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #50c878 0%, #0047ab 100%)",
                          boxShadow: "0 4px 16px rgba(80,200,120,0.2)",
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: "#ffffff" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-display font-bold text-foreground mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-body hover:text-accent transition-smooth break-all"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {line1}
                          </a>
                        ) : (
                          <p
                            className="text-sm font-body"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {line1}
                          </p>
                        )}
                        <p
                          className="text-xs font-body mt-0.5"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          {line2}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Social links */}
              <div className="glass-effect rounded-2xl p-6">
                <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-border hover:border-accent/50 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-smooth"
                      data-ocid={`social-${label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right column: form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="glass-effect rounded-2xl p-8 md:p-10">
                {submitted ? (
                  /* Success state */
                  <motion.div
                    className="flex flex-col items-center justify-center min-h-[420px] text-center gap-6"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    data-ocid="contact-success-panel"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "oklch(0.65 0.17 150 / 0.12)",
                        border: "1px solid oklch(0.65 0.17 150 / 0.35)",
                        boxShadow: "0 0 30px oklch(0.65 0.17 150 / 0.2)",
                      }}
                    >
                      <CheckCircle2
                        className="w-10 h-10"
                        style={{ color: "oklch(0.65 0.17 150)" }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-3xl text-foreground mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground font-body max-w-xs mx-auto leading-relaxed">
                        We will get back to you within 24 hours.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-border hover:border-accent/40 font-display mt-2"
                      onClick={handleReset}
                      data-ocid="contact-send-another"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    noValidate
                    aria-label="Contact form"
                  >
                    <div className="mb-2">
                      <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-muted-foreground font-body">
                        Fill in the details below and we'll be in touch shortly.
                      </p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label
                          htmlFor="contact-name"
                          className="font-body text-foreground text-sm"
                        >
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-name"
                          value={form.name}
                          onChange={handleChange("name")}
                          onBlur={handleBlur("name")}
                          placeholder="Your full name"
                          className="bg-input border-border font-body"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "name-error" : undefined
                          }
                          data-ocid="contact-input-name"
                        />
                        {errors.name && (
                          <p
                            id="name-error"
                            className="text-xs font-body mt-0.5"
                            style={{ color: "oklch(0.65 0.22 25)" }}
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label
                          htmlFor="contact-email"
                          className="font-body text-foreground text-sm"
                        >
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={handleChange("email")}
                          onBlur={handleBlur("email")}
                          placeholder="you@example.com"
                          className="bg-input border-border font-body"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "email-error" : undefined
                          }
                          data-ocid="contact-input-email"
                        />
                        {errors.email && (
                          <p
                            id="email-error"
                            className="text-xs font-body mt-0.5"
                            style={{ color: "oklch(0.65 0.22 25)" }}
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-company"
                        className="font-body text-foreground text-sm"
                      >
                        Company
                      </Label>
                      <Input
                        id="contact-company"
                        value={form.company}
                        onChange={handleChange("company")}
                        placeholder="Your company or brand name"
                        className="bg-input border-border font-body"
                        data-ocid="contact-input-company"
                      />
                    </div>

                    {/* Service Interested In */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="font-body text-foreground text-sm">
                        Service Interested In
                      </Label>
                      <Select
                        value={form.service}
                        onValueChange={(v) =>
                          setForm((prev) => ({ ...prev, service: v }))
                        }
                      >
                        <SelectTrigger
                          className="bg-input border-border font-body"
                          data-ocid="contact-select-service"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_OPTIONS_SELECT.map((s) => (
                            <SelectItem
                              key={s.value}
                              value={s.value}
                              className="font-body"
                            >
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Project Budget */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="font-body text-foreground text-sm">
                        Project Budget
                      </Label>
                      <Select
                        value={form.budget}
                        onValueChange={(v) =>
                          setForm((prev) => ({ ...prev, budget: v }))
                        }
                      >
                        <SelectTrigger
                          className="bg-input border-border font-body"
                          data-ocid="contact-select-budget"
                        >
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUDGET_OPTIONS.map((b) => (
                            <SelectItem
                              key={b.value}
                              value={b.value}
                              className="font-body"
                            >
                              {b.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-message"
                        className="font-body text-foreground text-sm"
                      >
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        value={form.message}
                        onChange={handleChange("message")}
                        onBlur={handleBlur("message")}
                        placeholder="Tell us about your project, goals, timeline, or any questions you have..."
                        className="bg-input border-border font-body min-h-[140px] resize-none"
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        data-ocid="contact-input-message"
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="text-xs font-body mt-0.5"
                          style={{ color: "oklch(0.65 0.22 25)" }}
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="font-display gap-2 w-full sm:w-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.82 0.17 142) 0%, oklch(0.65 0.17 150) 100%)",
                        color: "oklch(0.08 0 0)",
                        boxShadow: "0 0 18px oklch(0.82 0.29 142 / 0.35)",
                      }}
                      data-ocid="contact-submit"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6" style={{ background: "oklch(0.10 0 0)" }}>
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-accent/40 text-accent font-body"
            >
              FAQ
            </Badge>
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-3"
              data-ocid="contact-faq-accordion"
            >
              {FAQS.map(({ id, q, a }, idx) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <AccordionItem
                    value={id}
                    className="glass-effect rounded-xl border-0 px-6"
                    data-ocid={`faq-item-${id}`}
                  >
                    <AccordionTrigger className="font-display font-semibold text-foreground text-left hover:no-underline hover:text-accent transition-smooth py-5">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground text-sm leading-relaxed pb-5">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
