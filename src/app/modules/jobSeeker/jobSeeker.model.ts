import { model, Schema } from 'mongoose';
import { TJobSeeker } from './jobSeeker.interface';

const jobSeekerSchema = new Schema<TJobSeeker>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fullName: { type: String },
    location: { type: String },
    profilePicture: { type: String },
    phoneNumber: { type: String },
    professionalDetails: {
      currentTitle: { type: String },
      experience: { type: Number },
      preferredTitles: [String],
      preferredLocations: [String],
      openToRelocation: { type: Boolean, default: false },
      availability: { type: String },
    },
    resumeAndPortfolio: {
      resume: { type: String },
      portfolio: { type: String },
    },
    skills: {
      technical: [String],
      soft: [String],
    },
    education: [
      {
        degree: String,
        institution: String,
        graduationYear: Number,
        certifications: [String],
      },
    ],
    workExperience: [
      {
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    preferences: {
      employmentType: [String],
      salaryRange: { min: Number, max: Number },
      workplacePreference: String,
      industries: [String],
    },
    socialProfiles: {
      linkedin: String,
      github: String,
      other: [String],
    },
    additionalInfo: {
      languages: [String],
      hobbies: [String],
      aboutMe: String,
    },
  },
  { timestamps: true },
);
export const JobSeeker = model<TJobSeeker>('JobSeeker', jobSeekerSchema);
