"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";

type Competition = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  description?: string;
  category?: string;
  topic?: string;
  registrationOpen: Date;
  registrationClose: Date;
  registrationLink: string;
  eventDate?: Date;
  organizer?: string;
  prize?: string;
  location?: string;
};

interface EditCompetitionModalProps {
  competition: Competition | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updatedData: Partial<Competition>) => void;
}

export function EditCompetitionModal({
  competition,
  isOpen,
  onClose,
  onSave,
}: EditCompetitionModalProps) {
  const [editForm, setEditForm] = useState({
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

  useEffect(() => {
    if (competition) {
      setEditForm({
        title: competition.title || "",
        shortDesc: competition.shortDesc || "",
        description: competition.description || "",
        category: competition.category || "",
        topic: competition.topic || "",
        organizer: competition.organizer || "",
        prize: competition.prize || "",
        location: competition.location || "",
        registrationLink: competition.registrationLink || "",
        eventDate: competition.eventDate
          ? new Date(competition.eventDate).toISOString().split("T")[0]
          : "",
        registrationOpen: competition.registrationOpen
          ? new Date(competition.registrationOpen).toISOString().split("T")[0]
          : "",
        registrationClose: competition.registrationClose
          ? new Date(competition.registrationClose).toISOString().split("T")[0]
          : "",
      });
    }
  }, [competition]);

  const handleSave = () => {
    if (competition) {
      onSave(competition._id, {
        title: editForm.title,
        shortDesc: editForm.shortDesc,
        description: editForm.description,
        category: editForm.category,
        topic: editForm.topic,
        organizer: editForm.organizer,
        prize: editForm.prize,
        location: editForm.location,
        registrationLink: editForm.registrationLink,
        eventDate: editForm.eventDate
          ? new Date(editForm.eventDate)
          : undefined,
        registrationOpen: editForm.registrationOpen
          ? new Date(editForm.registrationOpen)
          : undefined,
        registrationClose: editForm.registrationClose
          ? new Date(editForm.registrationClose)
          : undefined,
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Competition</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your competition details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Competition Title *</Label>
            <Input
              id="title"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Enter competition title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Textarea
              id="shortDesc"
              value={editForm.shortDesc}
              onChange={(e) =>
                setEditForm({ ...editForm, shortDesc: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Brief description of the competition"
              rows={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fullDesc">Full Description</Label>
            <Textarea
              id="fullDesc"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Detailed description of the competition..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, category: value })
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
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

            <div className="grid gap-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={editForm.topic}
                onChange={(e) =>
                  setEditForm({ ...editForm, topic: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., React, Python, Data Structures"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="prize">Prize</Label>
              <Input
                id="prize"
                value={editForm.prize}
                onChange={(e) =>
                  setEditForm({ ...editForm, prize: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., $1000, Trophy, Certificate"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Online or physical location"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="organizer">Organizer</Label>
            <Input
              id="organizer"
              value={editForm.organizer}
              onChange={(e) =>
                setEditForm({ ...editForm, organizer: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Organization or person hosting"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="registrationLink">Registration Link *</Label>
            <Input
              id="registrationLink"
              type="url"
              value={editForm.registrationLink}
              onChange={(e) =>
                setEditForm({ ...editForm, registrationLink: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/register"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={editForm.eventDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, eventDate: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="registrationOpen">Registration Opens *</Label>
              <Input
                id="registrationOpen"
                type="date"
                value={editForm.registrationOpen}
                onChange={(e) =>
                  setEditForm({ ...editForm, registrationOpen: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="registrationClose">Registration Closes *</Label>
              <Input
                id="registrationClose"
                type="date"
                value={editForm.registrationClose}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    registrationClose: e.target.value,
                  })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
