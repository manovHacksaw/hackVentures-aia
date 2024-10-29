"use client";
import { useState } from "react";
import { useHackVentures } from "@/context/HackVenturesContext";
import { 
  Calendar, 
  Trophy, 
  Clock, 
  Coins, 
  FileText, 
  Users, 
  Award,
  Sparkles,
  ArrowRight,
  Wallet
} from "lucide-react";

export default function OrganizeHackathon() {
  const { createHackathon, connectWallet, account, loading } = useHackVentures();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    entryFee: "",
    registrationDuration: "",
    approvalDuration: "",
    submissionDuration: "",
    prizeDistributionDuration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      description,
      entryFee,
      registrationDuration,
      approvalDuration,
      submissionDuration,
      prizeDistributionDuration,
    } = formData;

    // Basic validation
    if (!name || !description || !entryFee || 
        !registrationDuration || !approvalDuration || 
        !submissionDuration || !prizeDistributionDuration) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      await createHackathon(
        name,
        description,
        entryFee,
        parseInt(registrationDuration),
        parseInt(approvalDuration),
        parseInt(submissionDuration),
        parseInt(prizeDistributionDuration)
      )
    ) {
      alert("Hackathon created successfully!");
    } else {
      alert("Failed to create hackathon.");
    }
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 
              bg-blue-100 dark:bg-blue-900/30 rounded-full animate-bounce">
              Launch Your Vision
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
              Organize a{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse">
                Web3 Gaming
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse delay-300">
                Hackathon
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Create an exciting challenge that brings together passionate developers to build the future of blockchain gaming
            </p>
          </div>

          {!account ? (
            <div className="flex justify-center">
              <button
                onClick={connectWallet}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full 
                  hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 
                  font-semibold relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Connect Wallet to Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Manual Input Fields */}
              <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-blue-500" />
                      Hackathon Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter an exciting name for your hackathon"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                  <small className="text-gray-500 dark:text-gray-400 mt-2">Choose a catchy name that reflects the theme of your hackathon.</small>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      Description
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your hackathon in detail..."
                    rows={5}
                    className="w-full h-96 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                   <small className="text-gray-500 dark:text-gray-400 mt-2">
    • Theme and Focus Areas
    <br />
    • Technology Requirements (e.g., specific blockchain, tools)
    <br />
    • Prize Structure and Distribution
    <br />
    • Judging Criteria
    <br />
    • Contact Information for Organizers
    <br />
    • Participant Guidelines and Rules
    <br />
    • Resources Provided
    <br />
    • Mentorship Opportunities
    <br />
    • Timeline Breakdown
    <br />
    • Expected Deliverables
  </small>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-blue-500" />
                      Entry Fee (AIA)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    placeholder="e.g., 0.05"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                  <small className="text-gray-500 dark:text-gray-400 mt-2">Enter the fee in AIA tokens to participate in the hackathon.</small>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Registration Duration (in hours)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="registrationDuration"
                    value={formData.registrationDuration}
                    onChange={handleChange}
                    placeholder="e.g., 48"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                  <small className="text-gray-500 dark:text-gray-400 mt-2">Specify how long participants have to register for the hackathon.</small>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Approval Duration (in hours)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="approvalDuration"
                    value={formData.approvalDuration}
                    onChange={handleChange}
                    placeholder="e.g., 24"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                  <small className="text-gray-500 dark:text-gray-400 mt-2">Indicate how long it takes to approve registrations.</small>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Submission Duration (in hours)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="submissionDuration"
                    value={formData.submissionDuration}
                    onChange={handleChange}
                    placeholder="e.g., 48"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                  <small className="text-gray-500 dark:text-gray-400 mt-2">Set the time allowed for participants to submit their projects.</small>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <label className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      Prize Distribution Duration (in hours)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="prizeDistributionDuration"
                    value={formData.prizeDistributionDuration}
                    onChange={handleChange}
                    placeholder="e.g., 24"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                  <small className="text-gray-500 dark:text-gray-400 mt-2">Specify the duration for distributing prizes after the hackathon.</small>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full 
                    hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 
                    font-semibold relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Launch Hackathon
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 
                    group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
