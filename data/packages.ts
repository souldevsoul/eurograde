export interface Package {
  id: string
  name: string
  slug: string
  price: {
    standard: number
    express: number
    premium: number
  }
  currency: 'EUR'
  tier: 'continental' | 'nordic' | 'alpine' | 'platinum' | 'executive'
  popular?: boolean
  features: string[]
  description: string
  imagePrompt: string
  imagePath?: string
  badge?: string
  certifications: string[]
  deliveryTime: string
  includes: string[]
}

export const packages: Package[] = [
  // Individual Certification Packages
  {
    id: 'continental-standard',
    name: 'Continental Standard',
    slug: 'continental-standard',
    price: {
      standard: 199,
      express: 299,
      premium: 399
    },
    currency: 'EUR',
    tier: 'continental',
    description: 'Essential technical assessment for standard vehicle documentation',
    features: [
      'ISO 9001:2015 compliant inspection',
      'Basic technical documentation',
      'Visual condition assessment',
      'VIN verification & history check',
      'EU emissions compliance report',
      'PDF technical report (EN/DE)',
      'Standard delivery (72h)'
    ],
    certifications: [
      'ISO 9001:2015',
      'EU Directive 2007/46/EC',
      'Basic Technical Assessment'
    ],
    deliveryTime: '72 hours',
    includes: [
      'Technical inspection protocol',
      'Digital documentation package',
      'Compliance certification',
      'Email support'
    ],
    imagePrompt: 'Executive business sedan photographed in precision engineering studio, controlled softbox technical lighting, deep blue palette, medium format Phase One IQ4, no branding, no plates, technical editorial, cinematic 16:9',
    imagePath: '/images/packages/continental-standard.jpg'
  },
  {
    id: 'nordic-excellence',
    name: 'Nordic Excellence',
    slug: 'nordic-excellence',
    price: {
      standard: 499,
      express: 699,
      premium: 899
    },
    currency: 'EUR',
    tier: 'nordic',
    popular: true,
    badge: 'MOST POPULAR',
    description: 'Comprehensive inspection with advanced diagnostics and certification',
    features: [
      'Everything in Continental Standard',
      'TÜV-grade mechanical inspection',
      'Advanced OBD-II diagnostics',
      'Paint thickness measurement',
      'Underbody inspection (lift required)',
      'Test drive analysis',
      'Market valuation report (EU)',
      'Priority processing (48h)'
    ],
    certifications: [
      'ISO 9001:2015',
      'TÜV SÜD Certified Process',
      'EU Type Approval',
      'Advanced Technical Inspection'
    ],
    deliveryTime: '48 hours',
    includes: [
      'Comprehensive inspection report',
      'Professional photography (50+ images)',
      'Diagnostic scan results',
      'Market analysis & valuation',
      'Phone consultation (30min)',
      'Priority support'
    ],
    imagePrompt: 'Luxury sedan on hydraulic lift in professional TÜV inspection facility, precision technical lighting, deep blue and steel grey palette, engineering documentation visible, Phase One IQ4 camera, technical precision aesthetic',
    imagePath: '/images/packages/nordic-excellence.jpg'
  },
  {
    id: 'alpine-precision',
    name: 'Alpine Precision',
    slug: 'alpine-precision',
    price: {
      standard: 999,
      express: 1299,
      premium: 1599
    },
    currency: 'EUR',
    tier: 'alpine',
    description: 'Premium inspection with forensic-level documentation and analysis',
    features: [
      'Everything in Nordic Excellence',
      'Forensic paint inspection',
      'Engine compression test',
      'Transmission analysis',
      'Suspension geometry check',
      'Electronics systems audit',
      'Interior materials authentication',
      'Accident history verification',
      'Express delivery (24h)'
    ],
    certifications: [
      'ISO 9001:2015 & ISO 17025:2017',
      'TÜV Rheinland Certified',
      'DEKRA Quality Seal',
      'Forensic Technical Analysis'
    ],
    deliveryTime: '24 hours',
    includes: [
      'Forensic-grade inspection report',
      'Professional video documentation',
      'Laboratory test results',
      'Engineering-grade analysis',
      'Video consultation (60min)',
      'Negotiation strategy brief',
      '24/7 priority support'
    ],
    imagePrompt: 'Premium sports sedan in high-tech inspection laboratory, engineer with tablet examining vehicle details, precision measurement equipment visible, clinical lighting, deep blue palette, Phase One IQ4, German engineering aesthetic',
    imagePath: '/images/packages/alpine-precision.jpg'
  },

  // Professional Service Packages
  {
    id: 'platinum-concierge',
    name: 'Platinum Concierge',
    slug: 'platinum-concierge',
    price: {
      standard: 2999,
      express: 3999,
      premium: 4999
    },
    currency: 'EUR',
    tier: 'platinum',
    badge: 'PROFESSIONAL',
    description: 'Full-service vehicle acquisition with dedicated technical specialist',
    features: [
      'Everything in Alpine Precision',
      'Dedicated technical specialist',
      'Pre-purchase consultation',
      'Multiple vehicle assessments (up to 5)',
      'Auction bidding representation',
      'Transport coordination (EU-wide)',
      'Registration assistance',
      'Import/export documentation',
      'Same-day emergency service'
    ],
    certifications: [
      'ISO 9001:2015 & ISO 17025:2017',
      'TÜV Rheinland Certified',
      'DEKRA Quality Seal',
      'EU Legal Compliance',
      'Professional Service Standard'
    ],
    deliveryTime: '12-24 hours',
    includes: [
      'Full concierge service',
      'Up to 5 vehicle inspections',
      'Technical specialist (40h)',
      'Auction representation',
      'Transport coordination',
      'Legal documentation support',
      'VIP priority access',
      'Direct mobile line'
    ],
    imagePrompt: 'Professional automotive consultant in modern office reviewing multiple vehicle inspection reports on large displays, luxury vehicles visible through glass wall, executive environment, deep blue corporate aesthetic, Phase One IQ4',
    imagePath: '/images/packages/platinum-concierge.jpg'
  },
  {
    id: 'executive-fleet',
    name: 'Executive Fleet',
    slug: 'executive-fleet',
    price: {
      standard: 9999,
      express: 14999,
      premium: 19999
    },
    currency: 'EUR',
    tier: 'executive',
    badge: 'ENTERPRISE',
    description: 'Enterprise-grade fleet management and acquisition services',
    features: [
      'Everything in Platinum Concierge',
      'Unlimited vehicle assessments',
      'Fleet acquisition strategy',
      'Multi-country coordination',
      'Custom certification protocols',
      'Quarterly market intelligence',
      'Dedicated account manager',
      'On-site team deployment',
      '24/7 emergency response'
    ],
    certifications: [
      'ISO 9001:2015 & ISO 17025:2017',
      'TÜV SÜD & Rheinland Certified',
      'DEKRA Quality Seal',
      'EU Fleet Compliance',
      'Enterprise Service Agreement',
      'Custom Certification Protocols'
    ],
    deliveryTime: 'Immediate response',
    includes: [
      'Unlimited inspections',
      'Dedicated account manager',
      'Technical specialist team',
      'Fleet acquisition strategy',
      'Multi-country coordination',
      'Custom reporting protocols',
      'Executive briefings',
      'VIP concierge service',
      'Legal & compliance support',
      '24/7 emergency hotline'
    ],
    imagePrompt: 'Executive boardroom with large display showing fleet of premium vehicles and inspection data, professional team reviewing documentation, corporate environment with European city skyline, Phase One IQ4, authoritative professional aesthetic',
    imagePath: '/images/packages/executive-fleet.jpg'
  }
]

export const packageTiers = {
  continental: {
    color: '#0E1B3D',
    name: 'Continental',
    description: 'Essential standard certification'
  },
  nordic: {
    color: '#2B7DE9',
    name: 'Nordic',
    description: 'Comprehensive professional grade'
  },
  alpine: {
    color: '#6B8EC4',
    name: 'Alpine',
    description: 'Premium forensic analysis'
  },
  platinum: {
    color: '#8B92A4',
    name: 'Platinum',
    description: 'Full-service concierge'
  },
  executive: {
    color: '#2B2F36',
    name: 'Executive',
    description: 'Enterprise fleet solutions'
  }
}

export function getPackagesByTier(tier: string) {
  return packages.filter(pkg => pkg.tier === tier)
}

export function getPackageBySlug(slug: string) {
  return packages.find(pkg => pkg.slug === slug)
}

export function getPackageById(id: string) {
  return packages.find(pkg => pkg.id === id)
}
