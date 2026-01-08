import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alexander Lunin',
    role: 'Co-founder & CEO',
    linkedIn: 'https://linkedin.com/in/alexanderlunin',
  },
  {
    name: 'Aleksandr Tochilov',
    role: 'Co-founder & Product Director',
    linkedIn: 'https://linkedin.com/in/aleksandrtochilov',
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

        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group text-center p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-24 h-24 rounded-full gradient-pride mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-primary-foreground">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-4">{member.role}</p>
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm font-medium">Connect on LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
