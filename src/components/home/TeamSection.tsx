
import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alexander Lunin',
    role: 'Co-founder & CEO',
    linkedIn: 'https://linkedin.com/in/alexanderlunin',
    photo: 'https://ipfs.io/ipfs/bafybeicytytunukprcr2ittadc52iemf3dm2aekkxjvjfaaedxvvnx7b2m',
    description: 'Visionary leader driving the PRIDE Lab Foundation mission and global initiatives.'
  },
  {
    name: 'Aleksandr Tochilov',
    role: 'Co-founder & Product Director',
    linkedIn: 'https://linkedin.com/in/aleksandrtochilov',
    photo: 'https://ipfs.io/ipfs/bafkreidrf7kv64r45ww4sxzv76fqkdntjfr65qlbi5ryedqdlhyp4gwdkq',
    description: 'Leading product strategy and innovation, ensuring the platform meets user needs.'
  },
  {
    name: 'NICS AI',
    role: 'Main AI Brain',
    linkedIn: '#', // placeholder
    photo: 'https://pfs.io/ipfs/bafkreignzgyque7xpncvgff44ym6d3xyx5ub4rj65hgo4yihhdyhwfqioe',
    description: 'Advanced AI engine powering smart features and analytics for the community.'
  },
  {
    name: 'AI Byte Consult Ltd',
    role: 'Main Company',
    linkedIn: '#', // placeholder
    photo: 'https://ipfs.io/bafkreib3md4wdo5mksv2sjqjefy5ndxdtayznb3zgppbu6ogtmx5zptzym',
    description: 'Providing technological expertise and support for PRIDE Lab Foundation projects.'
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
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="group text-center p-8 rounded-2xl bg-card border shadow-card transition-all duration-300 hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
              <p className="text-muted-foreground mb-4">{member.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
