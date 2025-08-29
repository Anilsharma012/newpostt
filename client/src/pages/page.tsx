import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';

function PageView({ slug, title }: { slug: string; title: string }) {
  const { data, isLoading } = useQuery({ queryKey: ['/api/pages', slug] });
  const page = data as any;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : page ? (
          <article className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <p>Not found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export const AboutPage = () => <PageView slug="about" title="About Us" />;
export const ContactPage = () => <PageView slug="contact" title="Contact Us" />;
export const FAQPage = () => <PageView slug="faq" title="Frequently Asked Questions" />;
export const BlogPage = () => <PageView slug="blog" title="Blog" />;
export const PrivacyPage = () => <PageView slug="privacy" title="Privacy Policy" />;
export const TermsPage = () => <PageView slug="terms" title="Terms of Service" />;
