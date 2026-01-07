import { Users, ShoppingBag, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Connect & Share',
    description: 'Join a vibrant community. Post updates, share moments, and engage with friends who celebrate who you are.',
    color: 'pride-pink',
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: 'Community Marketplace',
    description: 'Buy and sell within our community. Support Pride creators and small businesses with every purchase.',
    color: 'pride-orange',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Safe & Inclusive',
    description: 'A moderated space where everyone belongs. Zero tolerance for hate, maximum celebration of love.',
    color: 'pride-green',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Non-Profit Driven',
    description: 'Operated by Pride Foundation. Every feature, every decision, made with community benefit in mind.',
    color: 'pride-purple',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Pride Social Network?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just a social network – it's a movement, a marketplace, and a community united by pride.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center p-6 rounded-2xl transition-all duration-300 hover:bg-muted animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${feature.color}/10 text-${feature.color} mb-5 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
