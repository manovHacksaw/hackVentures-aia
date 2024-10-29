"use client";

import { useHackVentures } from "@/context/HackVenturesContext";
import { useEffect } from "react";
import { Calendar, Users, MapPin, Trophy, ExternalLink, Sparkles, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HackathonsPage() {
  const {
    hackathons,
    loading,
    isConnected,
    connectWallet,
    registerForHackathon,
    account,
  } = useHackVentures();

  const router = useRouter();

  const handleApply = async (hackathonId, entryFee) => {
    if (!isConnected) {
      alert("Please connect your wallet to apply for hackathons.");
      return;
    }
    else{
        router.push(`/hackathon/${hackathonId}`)
    }

  }

  const calculateHoursLeft = (registrationDeadline) => {
    const currentTime = Date.now();
    const deadlineTime = registrationDeadline * 1000; // Convert seconds to milliseconds
    const hoursLeft = Math.floor((deadlineTime - currentTime) / (1000 * 60 * 60)); // Convert ms to hours

    return hoursLeft > 0 ? hoursLeft : 0; // Ensure non-negative value
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl animate-pulse transform rotate-3"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-pulse delay-1000 transform -rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-yellow-400/30 rounded-full blur-2xl dark:bg-yellow-500/30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl dark:bg-purple-500/20 animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-bounce">
              Available Challenges
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
              Open{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse">
                Hackathons
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Join exciting challenges and showcase your skills in the world of blockchain gaming
            </p>
          </div>

          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full 
                hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 
                font-semibold relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Connect Wallet
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 
                group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          ) : (
            <div className="px-6 py-3 bg-gray-800/10 dark:bg-gray-100/10 rounded-full backdrop-blur-sm
              shadow-lg border border-gray-200/20 dark:border-gray-700/20">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl 
                  hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 
                  dark:border-gray-700/50 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="p-8 relative">
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`px-4 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
                      ${hackathon.active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                      <Timer className="w-3 h-3" />
                      {hackathon.active ? 'Open for Registration' : 'Closed'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 
                    group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {hackathon.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                    {hackathon.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <span>{hackathon.theme || "Open Theme"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Users className="w-4 h-4" />
                      </div>
                      <span>{hackathon.participants}+ Participants</span>
                    </div>

                    
                  </div>

                  <button
                    onClick={() => handleApply(hackathon.id, hackathon.entryFee)}
                    className="group w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                      rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 
                      transform hover:scale-102 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Apply Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
