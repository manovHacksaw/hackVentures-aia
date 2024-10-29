"use client";

import { ethers } from "ethers";
import { createContext, useState, useEffect, useContext } from "react";
import abi from "@/utils/HackVentures"; 

// Make sure to create this file with your contract ABI
const HackVenturesContext = createContext();

export const HackVenturesProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0.000");
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const contractABI = abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const loadContract = async (signer = null) => {
    const providerInstance = new ethers.BrowserProvider(
      window.ethereum ||
        new ethers.JsonRpcProvider("https://aia-dataseed1-testnet.aiachain.org")
    );
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer ? signer : providerInstance
    );
    setContract(contractInstance);
    return contractInstance;
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        setProvider(providerInstance);

        const accounts = await providerInstance.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        const balance = await providerInstance.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
        setIsConnected(true);

        await loadContract();
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask is required to use this app.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance("0.000");
    loadContract();
  };

  const createHackathon = async (
    name,
    description,
    entryFee,
    registrationDuration,
    approvalDuration,
    submissionDuration,
    prizeDistributionDuration
  ) => {
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = await loadContract(signer);
  
      // Convert entry fee to wei
      const entryFeeWei = ethers.parseEther(entryFee.toString());
  
      // Durations should already be in seconds from the component
      const transaction = await contract.createHackathon(
        name,
        description,
        entryFeeWei,
        registrationDuration,
        approvalDuration,
        submissionDuration,
        prizeDistributionDuration,
        {
          gasLimit: 500000, // Add reasonable gas limit
        }
      );
  
      const receipt = await transaction.wait();
      
      // Verify the transaction was successful
      if (receipt.status === 1) {
        await getHackathons(); // Refresh the hackathons list
        return true;
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Error creating hackathon:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getHackathons = async () => {
    setLoading(true);
    try {
      const contract = await loadContract();
      const count = await contract.hackathonCounter();
      const hackathonsArray = [];

      for (let i = 0; i < count; i++) {
        const hackathon = await contract.hackathons(i);
        hackathonsArray.push({
          id: i,
          organizer: hackathon.organizer,
          name: hackathon.name,
          description: hackathon.description,
          entryFee: ethers.formatEther(hackathon.entryFee),
          registrationDeadline: Number(hackathon.registrationDeadline),
          approvalDeadline: Number(hackathon.approvalDeadline),
          submissionDeadline: Number(hackathon.submissionDeadline),
          prizeDeadline: Number(hackathon.prizeDeadline),
          totalPrizePool: ethers.formatEther(hackathon.totalPrizePool),
          active: hackathon.active,
        });
      }

      setHackathons(hackathonsArray);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerForHackathon = async (
    hackathonId,
    githubAccount,
    projectIdea,
    pastAchievements,
    teamMembers,
    entryFee
  ) => {
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = await loadContract(signer);

      const transaction = await contract.registerForHackathon(
        hackathonId,
        githubAccount,
        projectIdea,
        pastAchievements,
        teamMembers,
        { value: ethers.parseEther(entryFee) }
      );

      await transaction.wait();
      return true;
    } catch (error) {
      console.error("Error registering for hackathon:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const submitProject = async (hackathonId) => {
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = await loadContract(signer);

      const transaction = await contract.submitProject(hackathonId);
      await transaction.wait();
      return true;
    } catch (error) {
      console.error("Error submitting project:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const approveParticipant = async (hackathonId, participant) => {
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = await loadContract(signer);

      const transaction = await contract.approveParticipant(
        hackathonId,
        participant
      );
      await transaction.wait();
      return true;
    } catch (error) {
      console.error("Error approving participant:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const declineParticipant = async (hackathonId, participant) => {
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = await loadContract(signer);

      const transaction = await contract.declineParticipant(
        hackathonId,
        participant
      );
      await transaction.wait();
      return true;
    } catch (error) {
      console.error("Error declining participant:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const distributePrizes = async (hackathonId, winners, amounts) => {
    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = await loadContract(signer);

      const transaction = await contract.distributePrizes(
        hackathonId,
        winners,
        amounts
      );
      await transaction.wait();
      return true;
    } catch (error) {
      console.error("Error distributing prizes:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    loadContract();
    getHackathons();
  }, []);

  useEffect(() => {
    if (account) {
      loadContract();
    }
  }, [account]);

  return (
    <HackVenturesContext.Provider
      value={{
        account,
        balance,
        isConnected,
        loading,
        hackathons,
        darkMode,
        connectWallet,
        disconnectWallet,
        createHackathon,
        registerForHackathon,
        submitProject,
        approveParticipant,
        declineParticipant,
        distributePrizes,
        toggleDarkMode,
      }}
    >
      {children}
    </HackVenturesContext.Provider>
  );
};

export const useHackVentures = () => useContext(HackVenturesContext);
