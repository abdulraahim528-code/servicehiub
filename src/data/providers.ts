export interface Provider {
  id: string;
  name: string;
  profession: string;
  category: string;
  age: number;
  reviews: number;
  experience: string;
  location: string;
  nationality: string;
  phone: string;
  email: string;
  rating: number;
  price: string;
  about: string;
  skills: string[];
  profileImage: string;
}

export const providersData: Provider[] = [
  {
    id: '1',
    name: 'Ayesha Khan',
    profession: 'Master Electrician',
    category: 'Electrician',
    age: 32,
    reviews: 342,
    experience: '8 yrs experience',
    location: 'Islamabad',
    nationality: 'Pakistani',
    phone: '+92 301 654 3210',
    email: 'ayesha.khan@servicehub.app',
    rating: 4.9,
    price: '29',
    about: 'Certified master electrician specializing in residential wiring, panel upgrades, and smart-home installations. Reliable, punctual and safety-first.',
    skills: ['Panel Upgrades', 'Smart Home', 'Rewiring', 'Lighting', 'Diagnostics'],
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    name: 'Ali Ahmed',
    profession: 'Licensed Plumber',
    category: 'Plumber',
    age: 38,
    reviews: 512,
    experience: '12 yrs experience',
    location: 'Lahore',
    nationality: 'Pakistani',
    phone: '+92 300 555 0134',
    email: 'ali.ahmed@servicehub.app',
    rating: 4.8,
    price: '27',
    about: 'Trusted Pakistani plumber offering leak repair, drain clearing, and water heater services for homes and commercial spaces. Clean work and clear quotes every time.',
    skills: ['Leak Repair', 'Drain Cleaning', 'Water Heater', 'Bathroom Install', 'Pipe Replacement'],
    profileImage: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    name: 'Amna Malik',
    profession: 'Deep Cleaning Pro',
    category: 'Cleaner',
    age: 29,
    reviews: 218,
    experience: '5 yrs experience',
    location: 'Karachi',
    nationality: 'Pakistani',
    phone: '+92 321 555 0198',
    email: 'amna.malik@servicehub.app',
    rating: 5.0,
    price: '22',
    about: 'Experienced Pakistani cleaning professional focused on move-in/out resets and regular home care. Attention to detail and gentle handling of all surfaces.',
    skills: ['Deep Clean', 'Move-In/Out', 'Sanitization', 'Stain Removal', 'Organization'],
    profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '4',
    name: 'Omar Haddad',
    profession: 'AC Technician',
    category: 'AC Technician',
    age: 35,
    reviews: 401,
    experience: '10 yrs experience',
    location: 'Multan',
    nationality: 'Pakistani',
    phone: '+92 321 555 4321',
    email: 'omar.haddad@servicehub.app',
    rating: 4.9,
    price: '32',
    about: 'Professional AC technician delivering installation, maintenance, and emergency repair services with fast response and honest pricing.',
    skills: ['Installation', 'Gas Refill', 'Duct Cleaning', 'Maintenance', 'Emergency Repair'],
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
];
