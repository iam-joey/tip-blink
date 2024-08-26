"use client";

import { useEdgeStore } from "@/contextproviders/edgestore";
import { useState } from "react";
import { SingleImageDropzone } from "./ui/ImageUpload";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "sonner";
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
import { blinkSchema, BlinkSchema } from "@/utils/validation";
import axios from "axios";
import { z, ZodError } from "zod";

export function CreateBlinkPage({ address }: { address?: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("Submitted:", { title, description, url });
      if (!address) return;
      if (!url) {
        toast.warning("please upload image");
        return;
      }

      const fromData: BlinkSchema = {
        description,
        imageUrl: url,
        label,
        title,
        walletAddress: address,
      };
      let blinkData = await blinkSchema.parse(fromData);
      console.log(blinkData);
      toast.info("creating your blink");
      const res = await axios.post(
        "http://localhost:3000/api/blink/create",
        blinkData
      );
      console.log(res.data);
      toast.success(`${res.data.msg}`);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("inside");
        error.issues
          .map((issue) => issue.message)
          .forEach((message) => toast.warning(message));
        return;
      }
      console.log(error);
      toast.warning("something went wrong while submitting");
    }
  };
  return (
    <div className="flex justify-center items-center max-w-[700px] md:w-full mx-auto ">
      <Card className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Create your Blink
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm  font-bold text-gray-700 dark:text-gray-300"
              >
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="label"
                className="text-sm font-bold text-gray-700 dark:text-gray-300"
              >
                Label
              </Label>
              <Input
                id="title"
                placeholder="Enter label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-bold text-gray-700 dark:text-gray-300"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col justify-center items-center gap-2">
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                    setProgress(0);
                    setUrl("");
                  }}
                />

                <Progress
                  className="max-w-[300px]  transition-all duration-150"
                  value={progress}
                />
                {(!url || url.trim() === "") && (
                  <Button
                    type="button"
                    onClick={async () => {
                      if (file) {
                        toast.info("image uploading");
                        const res = await edgestore.imageUrlsBlinks.upload({
                          file,
                          onProgressChange: (progress) => {
                            setProgress(progress);
                            console.log(progress);
                          },
                        });
                        console.log(res.url);
                        toast.info("upload successfull");
                        setUrl(res.url);
                      }
                    }}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-bold uppercase text-md text-black"
              type="submit"
            >
              Create Blink
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
