import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-block-image.png';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-pride-pink/5 blur-3xl animate-pulse-soft" />
        <div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-pride-blue/5 blur-3xl animate-pulse-soft"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className="container relative py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Made in EU 🇪🇺 for the World 🗺️
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A joyful social network{' '}
              <span className="gradient-pride-text">built by and for</span>{' '}
              the Pride community
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Connect, share, and celebrate together on a platform designed with love —
              built to support and uplift our community worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="pride" size="xl" asChild>
                <Link to="/signup">Join the Network</Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/support">Support Pride Social Network</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 justify-center lg:justify-start mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-pride-green">✓</span>
                Inclusive Worldwide
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pride-green">✓</span>
                Community-First
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pride-green">✓</span>
                Safe Space
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 gradient-pride rounded-3xl opacity-20 blur-2xl transform scale-95" />
              <img
                src={heroImage}
                alt="Joyful Pride mascots celebrating together"
                className="relative w-full h-auto rounded-3xl shadow-soft animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
