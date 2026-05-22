// Static team member data — photos are real staff headshots
export interface TeamMember {
  id: number;
  name: string;
  jobTitle: string;
  bio: string | null;
  imageUrl: string | null;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Barry Marche",
    jobTitle: "President",
    bio: "Barry took over Discount Drain from his father Herman in 1991 and has grown it into London's most trusted drain and sewer company. With over 30 years of hands-on experience, Barry leads every major project personally.",
    imageUrl: "/manus-storage/barry-marche_557c7e98.jpg",
  },
  {
    id: 2,
    name: "Mike Townsend",
    jobTitle: "General Manager",
    bio: "Mike oversees day-to-day operations and scheduling, making sure every job is staffed with the right crew and equipment. He has been with the company for over 15 years.",
    imageUrl: "/manus-storage/mike-townsend_3a6ff3f4.jpg",
  },
  {
    id: 3,
    name: "Craig Slater",
    jobTitle: "Sales Manager",
    bio: "Craig works directly with homeowners and commercial clients to assess their drain and sewer needs and provide honest, competitive estimates. He specializes in trenchless and wet basement solutions.",
    imageUrl: "/manus-storage/craig-slater_641ece73.jpg",
  },
  {
    id: 4,
    name: "Ted Best",
    jobTitle: "Service Manager",
    bio: "Ted manages our field technician teams and ensures every service call is completed to the highest standard. With decades of hands-on drain and sewer experience, he is the backbone of our service operations.",
    imageUrl: "/manus-storage/ted-best_84bac4b2.jpg",
  },
];
