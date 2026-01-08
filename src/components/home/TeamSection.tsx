import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: 'Alexander Lunin',
    role: 'Co-founder & CEO',
    linkedIn: 'https://linkedin.com/in/alexanderlunin',
    photo: 'https://media.licdn.com/dms/image/C5603AQF3FqvHfZlCwQ/profile-displayphoto-shrink_200_200/0/1661234567890?e=1694044800&v=beta&t=abc123',
    description: 'Visionary leader driving the PRIDE Lab Foundation mission and global initiatives.',
  },
  {
    name: 'Aleksandr Tochilov',
    role: 'Co-founder & Product Director',
    linkedIn: 'https://linkedin.com/in/aleksandrtochilov',
    photo: 'https://media.licdn.com/dms/image/C4D03AQG9XKj9l8oJ8A/profile-displayphoto-shrink_200_200/0/1659876543210?e=1694044800&v=beta&t=def456',
    description: 'Leading product strategy and innovation, ensuring the platform meets user needs.',
  },
  {
    name: 'NICS AI',
    role: 'Main AI Brain',
    linkedIn: '#',
    website: 'https://nics.space',
    photo: 'https://via.placeholder.com/200?text=NICS+AI',
    description: 'Advanced AI engine powering smart features and analytics for the community.',
  },
  {
    name: 'AI Byte Consult Ltd.',
    role: 'Main Company',
    linkedIn: '#',
    website: 'https://aibyteconsult.com',
    photo: 'https://via.placeholder.com/200?text=AI+Byte+Consult',
    description: 'Providing technological expertise and support for PRIDE Lab Foundation projects.',
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Meet Our <span className="gradient-pride-text">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate leaders behind PRIDE Lab Foundation, working to create a better community for everyone.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => {
            const link = member.website && member.website !== '#' ? member.website : member.linkedIn;

            return (
              <div
                key={member.name}
                className="group text-center p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* PHOTO — clickable to website for NICS AI & AI Byte Consult Ltd. */}
                {link && link !== '#' ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </a>
                ) : (
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* NAME — clickable to website for NICS AI & AI Byte Consult Ltd. */}
                {link && link !== '#' ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <h3 className="font-display text-xl font-semibold mb-1 hover:opacity-90 transition-opacity">
                      {member.name}
                    </h3>
                  </a>
                ) : (
                  <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
                )}

                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-muted-foreground mb-4">{member.description}</p>

                {/* LinkedIn — only if real */}
                {member.linkedIn !== '#' && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="text-sm font-medium">Connect on LinkedIn</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
