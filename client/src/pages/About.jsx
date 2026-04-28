import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import { getAssetPath } from '../utils/assetPath';

const About = () => {
  const stats = [
    { number: 10000, suffix: '+', label: 'Happy Customers' },
    { number: 500, suffix: '+', label: 'Product Variants' },
    { number: 15, suffix: '+', label: 'Years Experience' },
    { number: 50, suffix: '+', label: 'Cities Served' },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCounters(stats.map((item) => Math.floor(item.number * progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="bg-white">
      <section className="py-16 md:py-20 bg-[#F8F8F8]">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-black">About Sujadamman and Subpy </h1>
            <div className="h-[2px] w-20 bg-primary-red mt-4" />
            <p className="text-gray-600 mt-5 text-lg">
              Built around disciplined design, reliable manufacturing, and long-lasting furniture solutions.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold">Our Story</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Since 2008, Sujadamman and Subpy  has delivered furniture and home essentials that prioritize durability, practical comfort, and clean aesthetics.
                We support residential and business clients through consistent quality, transparent operations, and reliable after-sales support.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/10 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1100"
                alt="Sujadamman and Subpy  showroom"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-[#111111] text-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-white">{counters[index].toLocaleString()}{stat.suffix}</p>
                <p className="text-gray-300 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionTitle title="Our Founders" subtitle="The visionaries behind Sujadamman and Subpy." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              { name: 'S. Sekar', role: 'Founder & Managing Director', image: getAssetPath('founders/sekar.png') },
              { name: 'S. Balaji', role: 'Co-Founder & Director', image: getAssetPath('founders/balaji.png') },
              { name: 'S. Yuwanraj', role: 'Co-Founder & Director', image: getAssetPath('founders/yuwanraj.png') },
            ].map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-black/10 shadow-sm text-center group"
              >
                <div className="h-72 w-full overflow-hidden bg-gray-100">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'; // fallback
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading">{founder.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{founder.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionTitle title="Timeline" subtitle="Key milestones in our growth." />
          <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {['2008 - Foundation', '2013 - Regional Expansion', '2018 - Manufacturing Scale Up', '2024 - Integrated Furniture & Essentials'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.2 }}
                className="bg-white border border-black/10 rounded-xl p-4 shadow-sm"
              >
                <p className="font-semibold">{item}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <Container>
          <SectionTitle title="Manufacturing Process" subtitle="A structured workflow from material selection to dispatch." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
            {['Material Selection', 'Precision Manufacturing', 'Quality Validation', 'Packaging & Delivery'].map((step, index) => (
              <div key={step} className="bg-white border border-black/10 rounded-xl p-5 text-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary-red text-white flex items-center justify-center font-bold mx-auto mb-3">{index + 1}</div>
                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionTitle title="Certifications" subtitle="Standards that support quality, safety, and compliance." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {['ISO 9001', 'Eco Certified', 'Safety Standard', 'Export Ready'].map((cert) => (
              <div key={cert} className="bg-white border border-black/10 rounded-xl p-5 text-center font-semibold shadow-sm">{cert}</div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
