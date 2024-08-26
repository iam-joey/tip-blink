"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, CheckIcon } from "lucide-react";

interface Blink {
  icon: string;
  title: string;
  label: string;
  description: string;
}

export default function CardView({ blink }: { blink: Blink }) {
  console.log(blink);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(blink.title);
  const [label, setLabel] = useState(blink.label);
  const [description, setDescription] = useState(blink.description);
  const [imageUrl, setImageUrl] = useState(blink.icon);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold"
          />
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
        {isEditing ? (
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="text-sm text-muted-foreground"
          />
        ) : (
          <p className="text-sm text-muted-foreground">{label}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <p>{description}</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="image-url">Image URL</Label>
          {isEditing ? (
            <Input
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          ) : null}
          <img
            src={imageUrl}
            alt="Card image"
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        {isEditing ? (
          <Button onClick={handleSave}>
            <CheckIcon className="w-4 h-4 mr-2" />
            Save
          </Button>
        ) : (
          <Button onClick={handleEdit}>
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
