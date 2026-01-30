import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Video, Users, Clapperboard, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

type EventType = 'online' | 'cinema' | 'hangout' | 'workshop' | 'conference';

type EventItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  icon: JSX.Element;
  color: 'pride-blue' | 'pride-pink' | 'pride-purple';
};

// Tailwind-safe mapping (no dynamic class strings)
const colorClasses: Record<EventItem['color'], { bg: string; text: string; badgeBg: string; badgeText: string }> = {
  'pride-blue': {
    bg: 'bg-pride-blue/10',
    text: 'text-pride-blue',
    badgeBg: 'bg-pride-blue/10',
    badgeText: 'text-pride-blue',
  },
  'pride-pink': {
    bg: 'bg-pride-pink/10',
    text: 'text-pride-pink',
    badgeBg: 'bg-pride-pink/10',
    badgeText: 'text-pride-pink',
  },
  'pride-purple': {
    bg: 'bg-pride-purple/10',
    text: 'text-pride-purple',
    badgeBg: 'bg-pride-purple/10',
    badgeText: 'text-pride-purple',
  },
};

const events: EventItem[] = [
  {
    id: 1,
    title: 'PRIDE Lab Foundation EU Virtual Meetup',
    description:
      'A community-led online meetup focused on LGBTQ+ safety, visibility, and building trusted local networks across the European Union. Meet new people, share resources, and learn what’s coming next on Pride Social Network.',
    date: 'June 3, 2026',
    time: '7:00 PM CEST',
    location: 'Online (EU Timezone)',
    type: 'online',
    icon: <Video className="h-6 w-6" />,
    color: 'pride-blue',
  },
  {
    id: 2,
    title: 'Queer Cinema Night — Berlin (EU)',
    description:
      'An outdoor-style community screening night celebrating LGBTQ+ stories. Bring friends, meet locals, and discover community spaces. A relaxed social evening designed for newcomers and regulars alike.',
    date: 'June 12, 2026',
    time: '9:00 PM CEST',
    location: 'Berlin, Germany (EU)',
    type: 'cinema',
    icon: <Clapperboard className="h-6 w-6" />,
    color: 'pride-pink',
  },
  {
    id: 3,
    title: 'Community Hangout — Amsterdam (EU)',
    description:
      'A casual in-person meetup for LGBTQ+ community members visiting or living in Amsterdam. Make new friends, exchange tips, and connect with inclusive places and projects.',
    date: 'June 20, 2026',
    time: '4:00 PM CEST',
    location: 'Amsterdam, Netherlands (EU)',
    type: 'hangout',
    icon: <Users className="h-6 w-6" />,
    color: 'pride-purple',
  },
];

const EventsPage = () => {
  return (
    <>
      <Helmet>
        <title>Events | PRIDE Lab Foundation</title>
        <meta
          name="description"
          content="Join PRIDE Lab Foundation community events across the European Union — online and in-person gatherings for the LGBTQ+ community."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="py-16 lg:py-24 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-pride mb-6">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Community <span className="gradient-pride-text">Events</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                EU-focused meetups and gatherings — connect with the community, celebrate together,
                and build real local networks.
              </p>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              {events.map((event, index) => {
                const c = colorClasses[event.color];

                return (
                  <div
                    key={event.id}
                    className="p-8 rounded-2xl bg-card border shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        className={`h-20 w-20 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center shrink-0`}
                      >
                        {event.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${c.badgeBg} ${c.badgeText}`}>
                            {event.type === 'online' ? 'Online (EU)' : 'In Person (EU)'}
                          </span>
                        </div>

                        <h2 className="font-display text-2xl font-semibold mb-3">{event.title}</h2>
                        <p className="text-muted-foreground mb-4">{event.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <Button variant="pride">
                          {event.type === 'online' ? 'Register Now' : 'RSVP'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Host an Event */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-4">Want to Host an Event?</h2>
              <p className="text-muted-foreground mb-8">
                Have an idea for an EU-based community event? Whether it’s online or in-person,
                we’d love to hear from you — and help promote it.
              </p>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:info@pridesocial.org">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default EventsPage;
