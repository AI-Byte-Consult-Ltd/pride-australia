import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Video, Users, Clapperboard, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: 1,
    title: 'PRIDE Lab Foundation Virtual Launch',
    description: 'Join us online for the official launch of Pride Social Network. Connect with community members worldwide, meet the team, and be among the first to explore our new platform features.',
    date: 'June 1, 2026',
    time: '6:00 PM AEST',
    location: 'Online Event',
    type: 'online',
    icon: <Video className="h-6 w-6" />,
    color: 'pride-blue',
  },
  {
    id: 2,
    title: 'Cinema on the Grass',
    description: 'An outdoor movie night celebrating LGBTQIA+ stories. Bring your blankets, snacks, and loved ones to enjoy award-winning films under the stars. Free entry for all community members.',
    date: 'June 14, 2026',
    time: '7:30 PM AEST',
    location: 'Centennial Park, Sydney, Australia',
    type: 'cinema',
    icon: <Clapperboard className="h-6 w-6" />,
    color: 'pride-pink',
  },
  {
    id: 3,
    title: 'Community Hangout San Francisco',
    description: 'A casual meet-up for Pride community members in the Bay Area. Make new friends, share stories, network with fellow community members, and celebrate together in a welcoming environment.',
    date: 'June 28, 2026',
    time: '3:00 PM PDT',
    location: 'Dolores Park, San Francisco, USA',
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
        <meta name="description" content="Join PRIDE Lab Foundation community events. Online and in-person gatherings celebrating the LGBTQIA+ community in Australia and the United States." />
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
                Join us at our upcoming events. Connect with the community, 
                celebrate together, and be part of something special.
              </p>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="p-8 rounded-2xl bg-card border shadow-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`h-20 w-20 rounded-2xl bg-${event.color}/10 text-${event.color} flex items-center justify-center shrink-0`}>
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${event.color}/10 text-${event.color}`}>
                          {event.type === 'online' ? 'Online' : 'In Person'}
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
              ))}
            </div>
          </div>
        </section>

        {/* Host an Event */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold mb-4">
                Want to Host an Event?
              </h2>
              <p className="text-muted-foreground mb-8">
                Have an idea for a community event? We'd love to hear from you. 
                Whether it's online or in-person, we can help make it happen.
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
