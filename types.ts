
export enum MembershipTier {
  STUDENT = 'Student',
  ASSOCIATE = 'Associate',
  FULL = 'Full Member'
}

export enum MembershipStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending'
}

export enum CaseStatus {
  PENDING = 'Pending',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed'
}

export enum UrgencyLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum LegalProgram {
  CAPITAL_DEFENSE = 'Capital Defense (High Court)',
  MAGISTRATES_REP = 'Magistrates Representation',
  BAIL_BOND_ASSIST = 'Bail & Bond Assistance',
  KAYUNGA_PLEA_BARGAIN = 'Kayunga Plea Bargain Program',
  LAND_MEDIATION = 'Land Mediation',
  REFUGEE_PROTECTION = 'Refugee Protection'
}

export interface LegalAidRequest {
  id: string;
  caseRef: string;
  requesterName: string;
  requesterContact: string;
  description: string;
  urgency: UrgencyLevel;
  status: CaseStatus;
  submissionDate: string;
  program: LegalProgram;
  courtLevel?: string;
  assignedAdvocate?: string;
  latestUpdate?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'Fellowship' | 'CLE' | 'Workshop' | 'Conference';
  date: string;
  location: string;
  cleCredits?: number;
  capacity: number;
  filled: number;
  isRSVPed?: boolean;
  imageUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrls: string[]; 
  category: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'Legal Templates' | 'Case Law' | 'Christian Ethics' | 'Audios' | 'Videos' | 'Reports';
  date: string;
  type: 'PDF' | 'DOC' | 'Case' | 'Audio' | 'Video';
  downloadUrl: string;
  description?: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  tier: MembershipTier;
  specialization: string;
  location: string;
  email: string;
  phone: string;
  church: string;
  visibility: {
    publicProfile: boolean;
    email: boolean;
    phone: boolean;
    specialization: boolean;
    location: boolean;
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  date: string;
  location: string;
}
