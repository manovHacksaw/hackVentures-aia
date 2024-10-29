"use client";

import { useHackVentures } from "@/context/HackVenturesContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, Calendar, Trophy } from "lucide-react";

export default function HackathonDetailsPage({ params }) {
  const router = useRouter();
  const { hackathons, loading, registerForHackathon } = useHackVentures();
  const [hackathon, setHackathon] = useState(null);
  const [githubAccount, setGithubAccount] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [pastAchievements, setPastAchievements] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  useEffect(() => {
    if (params.id) {
      const selectedHackathon = hackathons.find(
        (h) => h.id === parseInt(params.id)
      );
      setHackathon(selectedHackathon);
    }
  }, [params.id, hackathons]);

  const handleApply = async (e) => {
    e.preventDefault();
    const success = await registerForHackathon(
      hackathon.id,
      githubAccount,
      projectIdea,
      pastAchievements,
      teamMembers.split(",").map((member) => member.trim()),
      hackathon.entryFee // Use the entry fee from the selected hackathon
    );

    if (success) {
      alert("Successfully applied for the hackathon!");
    } else {
      alert("Failed to apply. Please try again.");
    }
  };

  if (loading || !hackathon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {hackathon.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {hackathon.description}
        </p>
        <div className="flex items-center mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Total Prize Pool: {hackathon.totalPrizePool} ETH
          </span>
        </div>
        <div className="flex items-center mb-4">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            {hackathon.participants}+ Participants
          </span>
        </div>
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-green-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Registration Deadline: {new Date(hackathon.registrationDeadline * 1000).toLocaleString()}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
          Apply for this Hackathon
        </h2>
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="githubAccount">
              GitHub Account
            </label>
            <input
              type="text"
              id="githubAccount"
              value={githubAccount}
              onChange={(e) => setGithubAccount(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="projectIdea">
              Project Idea
            </label>
            <textarea
              id="projectIdea"
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="pastAchievements">
              Past Achievements
            </label>
            <textarea
              id="pastAchievements"
              value={pastAchievements}
              onChange={(e) => setPastAchievements(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="teamMembers">
              Team Members (comma separated)
            </label>
            <input
              type="text"
              id="teamMembers"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
}
