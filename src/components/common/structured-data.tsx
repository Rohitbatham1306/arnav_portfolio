import { BASE_URL, OG_IMAGE } from "@/lib/constants";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arnav Roy",
    url: BASE_URL,
    image: OG_IMAGE,
    email: "arnav49@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "India",
    },
    description:
      "Creative Director, Video Producer & Web Developer based in Hyderabad, India. Specializing in video shoots, editing, 3D post-production, full-stack web development, and Gen AI workflows.",
    jobTitle: "Creative Director, Video Producer & Web Developer",
    sameAs: [
      "https://www.instagram.com/iamfreakazo/",
      "https://www.linkedin.com/in/arnav-roy-05337b187/",
      "https://www.behance.net/arnavroy",
      "https://youtube.com/@arnavroy1586?si=KSgajk8q3kQijOY3",
      "https://discord.gg/dXU2Y36ZMT",
    ],
    knowsAbout: [
      "Freelance Creative Direction",
      "Video Shooting & Ad Shoots",
      "Video Editing & 3D Post Production",
      "Web Development",
      "Next.js & React",
      "Gen AI Visual Storytelling",
      "Marketing Automation",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arnav Roy Portfolio",
    url: BASE_URL,
    description:
      "Arnav Roy — Creative Director, Video Producer & Web Developer based in Hyderabad, India.",
    author: {
      "@type": "Person",
      name: "Arnav Roy",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Arnav Roy Creative & Tech Studio",
    image: `${BASE_URL}/md-red-logo.svg`,
    "@id": BASE_URL,
    url: BASE_URL,
    email: "arnav49@gmail.com",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "Hyderabad",
      postalCode: "",
      addressCountry: "India",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}
