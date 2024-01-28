import addTodo from "./add-todo";

export const data = {
  events: [
    {
      title: "Birthday",
      description: "Happy birthday to me",
      date: "2024-08-14",
      priority: "Low",
      favorite: true,
    },
    {
      title: "Physics Exam",
      description: "Final year A Level exam",
      date: "2024-05-25",
      priority: "High",
      favorite: false,
    },
    {
      title: "Coding Workshop",
      description: "Participating in a JavaScript workshop",
      date: "2024-09-05",
      priority: "Mid",
      favorite: false,
    },
    {
      title: "Hackathon",
      description: "Attending a local hackathon",
      date: "2024-11-11",
      priority: "Low",
      favorite: true,
    },
    {
      title: "Project Deadline",
      description: "Submission deadline for personal project",
      date: "2024-11-30",
      priority: "Mid",
      favorite: false,
    },
    {
      title: "New Year Celebration",
      description: "Celebrating New Year with friends",
      date: "2024-12-31",
      priority: "High",
      favorite: true,
    },
  ],
  learning: [
    {
      title: "Website Launch",
      description: "Launching my personal project website",
      date: "2024-06-30",
      priority: "Low",
      project: "Learning",
      favorite: true,
    },
    {
      title: "Maths Tutorial",
      description: "Attending advanced calculus session",
      date: "2024-03-15",
      priority: "High",
      project: "Learning",
      favorite: false,
    },
    {
      title: "JavaScript Course",
      description: "Starting an advanced JavaScript course",
      date: "2024-02-01",
      priority: "Low",
      project: "Learning",
      favorite: true,
    },
    {
      title: "Physics Conference",
      description: "Presenting at a physics conference",
      date: "2024-08-22",
      priority: "Low",
      project: "Learning",
      favorite: false,
    },
    {
      title: "Group Study",
      description: "Group study session for finals",
      date: "2024-06-03",
      priority: "Mid",
      project: "Learning",
      favorite: false,
    },
    {
      title: "Online Webinar",
      description: "Attending a webinar on web development",
      date: "2024-10-18",
      priority: "Low",
      project: "Learning",
      favorite: true,
    },
  ],
  leisure: [
    {
      title: "Science Fair",
      description: "Participating in regional science fair",
      date: "2024-04-20",
      priority: "Low",
      project: "Leisure",
      favorite: false,
    },
    {
      title: "Family Trip",
      description: "Weekend getaway with family",
      date: "2024-07-10",
      priority: "Low",
      project: "Leisure",
      favorite: true,
    },
    {
      title: "Movie Marathon",
      description: "Hosting a movie night with friends",
      date: "2024-12-24",
      priority: "Mid",
      project: "Leisure",
      favorite: true,
    },
    {
      title: "Beach Day",
      description: "Day trip to the beach",
      date: "2024-08-15",
      priority: "Low",
      project: "Leisure",
      favorite: false,
    },
    {
      title: "Book Club Meeting",
      description: "Monthly book club gathering",
      date: "2024-01-05",
      priority: "Mid",
      project: "Leisure",
      favorite: true,
    },
    {
      title: "Gaming Tournament",
      description: "Participating in a local gaming event",
      date: "2024-03-17",
      priority: "Low",
      project: "Leisure",
      favorite: false,
    },
  ],
  fitness: [
    {
      title: "Gym Membership",
      description: "Starting a new gym membership",
      date: "2024-01-02",
      priority: "Low",
      favorite: false,
    },
    {
      title: "Half Marathon",
      description: "Running in a local half marathon",
      date: "2024-04-16",
      priority: "High",
      favorite: true,
    },
    {
      title: "Yoga Workshop",
      description: "Attending a weekend yoga retreat",
      date: "2024-07-21",
      priority: "Low",
      favorite: false,
    },
    {
      title: "Bike Race",
      description: "Competing in a charity bike race",
      date: "2024-09-03",
      priority: "High",
      favorite: true,
    },
    {
      title: "Hiking Trip",
      description: "Hiking trip with friends",
      date: "2024-05-28",
      priority: "Low",
      favorite: false,
    },
    {
      title: "Swimming Lessons",
      description: "Starting swimming lessons",
      date: "2024-08-12",
      priority: "Low",
      favorite: true,
    },
  ],
  work: [
    {
      title: "Project Presentation",
      description: "Presenting a major project at work",
      date: "2024-02-10",
      priority: "Mid",
      favorite: true,
    },
    {
      title: "Team Building",
      description: "Team building activity",
      date: "2024-05-26",
      priority: "Low",
      favorite: false,
    },
    {
      title: "Client Meeting",
      description: "Meeting with an important client",
      date: "2024-07-15",
      priority: "Mid",
      favorite: true,
    },
    {
      title: "Annual Review",
      description: "Annual performance review",
      date: "2024-10-20",
      priority: "High",
      favorite: false,
    },
    {
      title: "Conference Attendance",
      description: "Attending an industry conference",
      date: "2024-03-11",
      priority: "Low",
      favorite: true,
    },
    {
      title: "Deadline for Report",
      description: "Submission deadline for quarterly report",
      date: "2024-01-31",
      priority: "Low",
      favorite: false,
    },
  ],
};

export default function interpretData(data) {
  for (const [key, value] of Object.entries(data)) {
    for (const todo of value) {
      addTodo(
        `${key}`,
        todo["title"],
        todo["description"],
        todo["date"],
        todo["priority"],
        todo["favorite"]
      );
    }
  }
}

// addTodo(
//   projectName,
//   todoTitle,
//   todoDescription,
//   todoDate,
//   todoPriority,
//   todoFavorite
// );
