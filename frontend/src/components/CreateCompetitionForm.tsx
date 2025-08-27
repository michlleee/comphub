"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import api from "@/api/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface CreateCompetitionFormProps {
  refresh: () => void;
}

export function CreateCompetitionForm({ refresh }: CreateCompetitionFormProps) {
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    description: "",
    category: "",
    topic: "",
    registrationOpen: "",
    registrationClose: "",
    registrationLink: "",
    eventDate: "",
    organizer: "",
    prize: "",
    location: "",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      await api.post(`${backendURL}/api/competition/add`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Successfully added competition");
      refresh();
      setFormData({
        title: "",
        shortDesc: "",
        description: "",
        category: "",
        topic: "",
        registrationOpen: "",
        registrationClose: "",
        registrationLink: "",
        eventDate: "",
        organizer: "",
        prize: "",
        location: "",
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Competition Details</CardTitle>
        <CardDescription className="text-gray-400">
          Fill in the details to create your competition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter competition title"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc" className="text-gray-300">
              Short Description
            </Label>
            <Input
              id="shortDesc"
              value={formData.shortDesc}
              onChange={(e) => handleInputChange("shortDesc", e.target.value)}
              placeholder="Brief description of the competition"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Full Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e: any) =>
                handleInputChange("description", e.target.value)
              }
              placeholder="Detailed description of the competition..."
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">
                Category
              </Label>
              <Select
                onValueChange={(value: any) =>
                  handleInputChange("category", value)
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-orange-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="algorithm">Algorithm</SelectItem>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                  <SelectItem value="ai-ml">AI/ML</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-gray-300">
                Topic
              </Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => handleInputChange("topic", e.target.value)}
                placeholder="e.g., React, Python, Data Structures"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationOpen" className="text-gray-300">
                Registration Opens *
              </Label>
              <Input
                id="registrationOpen"
                type="datetime-local"
                value={formData.registrationOpen}
                onChange={(e) =>
                  handleInputChange("registrationOpen", e.target.value)
                }
                className="bg-gray-800 border-gray-700 text-white focus:border-orange-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationClose" className="text-gray-300">
                Registration Closes *
              </Label>
              <Input
                id="registrationClose"
                type="datetime-local"
                value={formData.registrationClose}
                onChange={(e) =>
                  handleInputChange("registrationClose", e.target.value)
                }
                className="bg-gray-800 border-gray-700 text-white focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationLink" className="text-gray-300">
              Registration Link *
            </Label>
            <Input
              id="registrationLink"
              type="url"
              value={formData.registrationLink}
              onChange={(e) =>
                handleInputChange("registrationLink", e.target.value)
              }
              placeholder="https://example.com/register"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate" className="text-gray-300">
              Event Date
            </Label>
            <Input
              id="eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={(e) => handleInputChange("eventDate", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizer" className="text-gray-300">
              Organizer
            </Label>
            <Input
              id="organizer"
              value={formData.organizer}
              onChange={(e) => handleInputChange("organizer", e.target.value)}
              placeholder="Organization or person hosting"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prize" className="text-gray-300">
                Prize
              </Label>
              <Input
                id="prize"
                value={formData.prize}
                onChange={(e) => handleInputChange("prize", e.target.value)}
                placeholder="e.g., $1000, Trophy, Certificate"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Online or physical location"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            Create Competition
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
