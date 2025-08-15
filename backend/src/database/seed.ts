import { connectDatabase, disconnectDatabase } from './connection'
import { Farm } from '../models/Farm'
import { User } from '../models/User'
import { Activity } from '../models/Activity'
import { Crop } from '../models/Crop'

const seedFarms = [
  {
    name: 'Ferme Agricole Bamenda',
    location: 'Bamenda, North West Region',
    address: 'Route de Bafoussam, Bamenda, Cameroon',
    coordinates: {
      latitude: 5.9631,
      longitude: 10.1591
    },
    size: 180,
    sizeUnit: 'hectares',
    fields: 8,
    crops: ['Maize', 'Cassava', 'Plantain', 'Irish Potato'],
    status: 'Active',
    farmType: 'Mixed',
    soilType: 'Volcanic',
    climate: 'Tropical Highland',
    waterSource: ['River', 'Borehole'],
    irrigation: true,
    certifications: ['Organic Certified'],
    owner: {
      name: 'Jean Baptiste Fomba',
      email: 'jean.fomba@bamendafarm.cm',
      phone: '+237 677 123 456'
    },
    manager: {
      name: 'Marie Claire Tabi',
      email: 'marie.tabi@bamendafarm.cm',
      phone: '+237 677 123 457'
    },
    established: new Date('2015-03-15'),
    totalRevenue: 25000000, // CFA Francs
    totalExpenses: 18000000, // CFA Francs
    employees: 15,
    equipment: ['Tractor', 'Plough', 'Harvester', 'Irrigation System'],
    buildings: [
      { type: 'Storage Warehouse', count: 2 },
      { type: 'Processing Unit', count: 1 },
      { type: 'Equipment Shed', count: 1 }
    ],
    insurance: {
      provider: 'CIMA Assurances Cameroun',
      policyNumber: 'CIC-2024-BAM-001',
      expiryDate: '2025-03-15'
    },
    notes: 'Exploitation agricole moderne dans les hautes terres du Nord-Ouest.'
  },
  {
    name: 'Plantation Kribi',
    location: 'Kribi, South Region',
    address: 'Route de Campo, Kribi, Cameroon',
    coordinates: {
      latitude: 2.9373,
      longitude: 9.9073
    },
    size: 250,
    sizeUnit: 'hectares',
    fields: 12,
    crops: ['Cocoa', 'Rubber', 'Palm Oil', 'Tropical Fruits'],
    status: 'Active',
    farmType: 'Plantation',
    soilType: 'Laterite',
    climate: 'Equatorial',
    waterSource: ['River', 'Rainfall'],
    irrigation: false,
    certifications: ['Fair Trade Certified', 'Rainforest Alliance'],
    owner: {
      name: 'Paul Mvondo Akoa',
      email: 'paul.mvondo@kribiplantation.cm',
      phone: '+237 655 234 567'
    },
    manager: {
      name: 'Sylvie Ebang',
      email: 'sylvie.ebang@kribiplantation.cm',
      phone: '+237 655 234 568'
    },
    established: new Date('2010-08-20'),
    totalRevenue: 32000000, // CFA Francs
    totalExpenses: 22000000, // CFA Francs
    employees: 25,
    equipment: ['Processing Equipment', 'Transport Trucks', 'Drying Equipment'],
    buildings: [
      { type: 'Processing Plant', count: 1 },
      { type: 'Storage Warehouse', count: 3 },
      { type: 'Worker Housing', count: 5 }
    ],
    insurance: {
      provider: 'CIMA Assurances Cameroun',
      policyNumber: 'CIC-2024-KRI-002',
      expiryDate: '2025-08-20'
    },
    notes: 'Grande plantation côtière spécialisée dans les cultures de rente.'
  },
  {
    name: 'Ferme Maroua',
    location: 'Maroua, Far North Region',
    address: 'Route de Mokolo, Maroua, Cameroon',
    coordinates: {
      latitude: 10.5906,
      longitude: 14.3158
    },
    size: 120,
    sizeUnit: 'hectares',
    fields: 6,
    crops: ['Millet', 'Sorghum', 'Cotton', 'Groundnuts'],
    status: 'Active',
    farmType: 'Crop',
    soilType: 'Sandy',
    climate: 'Sahelian',
    waterSource: ['Borehole', 'Seasonal River'],
    irrigation: true,
    certifications: ['Organic Certified'],
    owner: {
      name: 'Aminatou Alhadji',
      email: 'aminatou@marouafarm.cm',
      phone: '+237 655 345 678'
    },
    manager: {
      name: 'Ibrahim Moussa',
      email: 'ibrahim@marouafarm.cm',
      phone: '+237 655 345 679'
    },
    established: new Date('2012-09-15'),
    totalRevenue: 18000000, // CFA Francs
    totalExpenses: 13000000, // CFA Francs
    employees: 12,
    equipment: ['Tractor', 'Plough', 'Irrigation Equipment', 'Harvester'],
    buildings: [
      { type: 'Storage Warehouse', count: 2 },
      { type: 'Grain Silo', count: 3 },
      { type: 'Equipment Shed', count: 1 }
    ],
    insurance: {
      provider: 'CIMA Assurances Cameroun',
      policyNumber: 'CIC-2024-MAR-003',
      expiryDate: '2025-09-15'
    },
    notes: 'Exploitation agricole sahélienne concentrée sur les céréales et les cultures de rente.'
  },
  {
    name: 'Agro-Ferme Bafoussam',
    location: 'Bafoussam, West Region',
    address: 'Route de Dschang, Bafoussam, Cameroon',
    coordinates: {
      latitude: 5.4737,
      longitude: 10.4178
    },
    size: 95,
    sizeUnit: 'hectares',
    fields: 5,
    crops: ['Coffee', 'Maize', 'Beans'],
    status: 'Active',
    farmType: 'Mixed',
    soilType: 'Volcanic',
    climate: 'Tropical Highland',
    waterSource: ['Spring', 'Rainfall'],
    irrigation: false,
    certifications: ['Fair Trade Certified'],
    owner: {
      name: 'François Kamga',
      email: 'francois.kamga@bafoussam-agro.cm',
      phone: '+237 677 456 789'
    },
    manager: {
      name: 'Célestine Tchinda',
      email: 'celestine.tchinda@bafoussam-agro.cm',
      phone: '+237 677 456 790'
    },
    established: new Date('2018-01-10'),
    totalRevenue: 15000000, // CFA Francs
    totalExpenses: 11000000, // CFA Francs
    employees: 8,
    equipment: ['Coffee Processing Equipment', 'Drying Beds', 'Storage Facilities'],
    buildings: [
      { type: 'Coffee Processing Unit', count: 1 },
      { type: 'Storage Warehouse', count: 1 },
      { type: 'Drying Facility', count: 2 }
    ],
    insurance: {
      provider: 'CIMA Assurances Cameroun',
      policyNumber: 'CIC-2024-BAF-004',
      expiryDate: '2025-01-10'
    },
    notes: 'Ferme spécialisée dans le café arabica des hautes terres de l\'Ouest.'
  },
  {
    name: 'Plantation Bertoua',
    location: 'Bertoua, East Region',
    address: 'Route de Batouri, Bertoua, Cameroon',
    coordinates: {
      latitude: 4.5774,
      longitude: 13.6848
    },
    size: 300,
    sizeUnit: 'hectares',
    fields: 3,
    crops: ['Rubber', 'Palm Oil', 'Timber'],
    status: 'Active',
    farmType: 'Plantation',
    soilType: 'Forest',
    climate: 'Equatorial',
    waterSource: ['River', 'Rainfall'],
    irrigation: false,
    certifications: ['RSPO Certified', 'FSC Certified'],
    owner: {
      name: 'André Mbida Essomba',
      email: 'andre.mbida@bertoua-plantation.cm',
      phone: '+237 655 567 890'
    },
    manager: {
      name: 'Joséphine Ngo Biyaga',
      email: 'josephine.ngo@bertoua-plantation.cm',
      phone: '+237 655 567 891'
    },
    established: new Date('2008-06-25'),
    totalRevenue: 41000000, // CFA Francs
    totalExpenses: 28000000, // CFA Francs
    employees: 35,
    equipment: ['Rubber Tapping Equipment', 'Palm Oil Mill', 'Timber Processing'],
    buildings: [
      { type: 'Palm Oil Mill', count: 1 },
      { type: 'Rubber Processing Plant', count: 1 },
      { type: 'Timber Mill', count: 1 },
      { type: 'Worker Housing', count: 8 }
    ],
    insurance: {
      provider: 'CIMA Assurances Cameroun',
      policyNumber: 'CIC-2024-BER-005',
      expiryDate: '2025-06-25'
    },
    notes: 'Grande plantation forestière avec transformation sur site.'
  }
]

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@farmapp.cm',
    password: 'admin123456',
    role: 'admin'
  },
  {
    name: 'Farm Manager',
    email: 'manager@farmapp.cm',
    password: 'manager123456',
    role: 'manager'
  }
]

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...')
    
    await connectDatabase()
    
    // Clear existing data
    await Farm.deleteMany({})
    await User.deleteMany({})
    await Activity.deleteMany({})
    await Crop.deleteMany({})
    
    console.log('🗑️  Cleared existing data')
    
    // Seed users
    const users = await User.create(seedUsers)
    console.log(`👥 Created ${users.length} users`)
    
    // Seed farms
    const farms = await Farm.create(seedFarms)
    console.log(`🌾 Created ${farms.length} farms`)
    
    console.log('✅ Database seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await disconnectDatabase()
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
}

export { seedDatabase }
