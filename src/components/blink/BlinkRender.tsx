"use client";
import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useEdgeStore } from "@/contextproviders/edgestore";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { SingleImageDropzone } from "../ui/ImageUpload";
import { Progress } from "@radix-ui/react-progress";
import { Blink, updateBlink } from "@/lib/actions";

export default function BlinkRender({
  title,
  description,
  imageUrl,
  address,
}: {
  title: string;
  description: string;
  imageUrl: string;
  address: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);
  const [ti, setTi] = useState(title);
  const [desc, setDesc] = useState(description);
  const [url, setUrl] = useState(imageUrl);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);

  const handleSubmit = async () => {
    try {
      if (ti.trim().length < 6) {
        toast.warning("Title must be at least 5 characters long.");
        return;
      }

      if (desc.trim().length < 15) {
        toast.warning("Description must be at least 15 characters long.");
        return;
      }
      const data: Blink = {
        icon: url,
        description: desc,
        label: ti,
        title: ti,
      };
      const res = await updateBlink(data, address);

      if (res.err) {
        toast.warning(`${res.msg}`);
        return;
      }
      toast.success(`${res.msg}`);
      setIsEditing(!isEditing);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 ">
      <div
        className=" p-2 flex gap-2  items-center  
        "
      >
        <Switch
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        />{" "}
        <h1 className="text-xl">Edit</h1>
      </div>

      <Card className="min-w-md max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center">
          {!isEditing ? (
            <>
              <img
                src={url}
                alt="Upload the image"
                className="w-full aspect-square object-cover"
                width="300"
                height="300"
              />
            </>
          ) : (
            <>
              <div className="w-[300px] h-[300px] flex flex-col items-center gap-2 ">
                <SingleImageDropzone
                  width={300}
                  height={300}
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                    setProgress(0);
                    setUrl("");
                  }}
                />

                <Progress
                  className=" w-full transition-all duration-150 "
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
            </>
          )}
        </CardHeader>
        <CardContent
          className={`text-center ${
            !isEditing ? "space-y-2" : "space-y-6 mt-14"
          }`}
        >
          {!isEditing && (
            <p className="text-sm text-left text-muted-foreground">
              tipblink.xyz <InfoIcon className="inline-block w-4 h-4" />
            </p>
          )}
          {isEditing ? (
            <>
              <Input
                placeholder="Enter the title"
                onChange={(e) => {
                  setTi(e.target.value);
                }}
                value={ti}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-left">{ti}</h2>
            </>
          )}
          {isEditing ? (
            <>
              <Textarea
                placeholder="Enter the description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
              />
            </>
          ) : (
            <>
              <p className="text-muted-foreground text-left">{desc}</p>
            </>
          )}
        </CardContent>
        {!isEditing && (
          <>
            <CardFooter className="flex justify-between gap-1">
              <Button
                variant="default"
                className="flex-1 bg-black h-12 text-xl rounded-sm"
              >
                0.1 SOL
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-black h-12 text-xl rounded-sm ml-1"
              >
                0.5 SOL
              </Button>
            </CardFooter>
            <CardFooter>
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="Enter the SOL amount*"
                  className=" w-full h-12 border border-slate-400 p-7 focus:outline-none rounded-sm"
                  disabled
                />
                <Button className="absolute right-2 top-2 bg-black p-5 text-xl">
                  Send SOL
                </Button>
              </div>
            </CardFooter>
          </>
        )}
        {isEditing && (
          <CardFooter>
            <CardFooter>
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full text-xl uppercase"
              >
                Save
              </Button>
            </CardFooter>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
