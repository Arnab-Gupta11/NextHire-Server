import { Types } from 'mongoose';
export type TProfessionalDetails = {
  currentTitle?: string;
  experience?: number;
  preferredTitles: string[];
  preferredLocations: string[];
  openToRelocation: boolean;
  availability?: string;
};
export type TResumeAndPortfolio = {
  resume?: string;
  portfolio?: string;
  coverLetter?: string;
};
export type TSkills = {
  technical: string[];
  soft: string[];
};
export type TEducation = {
  degree?: string;
  institution?: string;
  graduationYear?: number;
  certifications: string[];
}[];
export type TWorkExperience = {
  title?: string;
  company?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}[];
export type TJobSeeker = {
  user: Types.ObjectId;
  fullName: string;
  location?: string;
  profilePicture?: string;
  phoneNumber: string;
  professionalDetails: TProfessionalDetails;
  resumeAndPortfolio: TResumeAndPortfolio;
  skills: TSkills;
  education: TEducation;
  workExperience: TWorkExperience;
  preferences: {
    employmentType: string[];
    salaryRange: { min?: number; max?: number };
    workplacePreference?: string;
    industries: string[];
  };
  socialProfiles: {
    linkedin?: string;
    github?: string;
    other: string[];
  };
  additionalInfo: {
    languages: string[];
    hobbies: string[];
    aboutMe?: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
