import { Types } from 'mongoose';

export type TRecruiter = {
  userId: Types.ObjectId; // Reference to the recruiter's user account
  fullName: string;
  phone?: string;
  profilePicture?: string;
  company: {
    name: string;
    website?: string;
    logo?: string;
    location?: string;
    industry?: string[];
    size?: string; // e.g., '1-50 employees', '51-200 employees'
    about: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

// jobPostings: Array<{
//   jobId: string;
//   title: string;
//   location: string;
//   employmentType: string; // e.g., 'Full-Time', 'Part-Time', 'Contract'
//   postedAt: Date;
//   status: string; // e.g., 'active', 'closed'
//   applicationsReceived: number;
// }>;
// preferences: {
//   preferredIndustries?: string[];
//   jobSpecializations?: string[];
//   candidateQualifications?: string[];
// };
// teamDetails?: {
//   role: string; // e.g., 'Hiring Manager', 'Recruitment Specialist'
//   teamSize: number;
//   recruitmentTools?: string[];
// };
// hiringHistory: Array<{
//   candidateId: string;
//   jobId: string;
//   status: string; // e.g., 'hired', 'rejected'
//   processedAt?: Date;
//   hiredAt?: Date;
// }>;
