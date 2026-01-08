import { Link } from 'react-router-dom';
import { Calendar, MapPin, Video, Users, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: 1,
    title: 'PRIDE Lab Foundation Virtual Launch',
    description: 'Join us online for the official launch of Pride Social Network. Connect with community members worldwide.',
    date: 'June 1, 2026',
    time: '6:00 PM AEST',
    location: 'Online Event',
    type: 'online',
    icon: <Video className="h-5 w-5" />,
  },
  {
    id: 2,
    title: 'Cinema on the Grass',
    description: 'An outdoor movie night celebrating LGBTQ+ stories. Bring your blankets and enjoy films under the stars.',
    date: 'June 14, 2026',
    time: '7:30 PM',
    location: 'Sydney, Australia',
    type: 'cinema',
    icon: <Clapperboard className="h-5 w-5" />,
  },
  {
    id: 3,
    title: 'Community Hangout',
    description: 'A casual meet-up for Pride community members. Make new friends, share stories, and celebrate together.',
    date: 'June 28, 2026',
    time: '3:00 PM',
    location: 'San Francisco, USA',
    type: 'hangout',
    icon: <Users className="h-5 w-5" />,
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-pride-text">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us at our upcoming community events. Connect, celebrate, and be part of something special.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group p-6 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-xl gradient-pride flex items-center justify-center text-primary-foreground mb-4">
                {event.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button variant="outline" size="lg" asChild>
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
