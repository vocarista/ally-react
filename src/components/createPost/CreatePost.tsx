import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "@/hooks/use-toast";

const CreatePost = () => {
    const [content, setContent] = useState<string>('Sample Content')
    const [title, setTitle] = useState<string>('Sample Title')
    const user_id = JSON.parse(localStorage.getItem('user') || '{}').user_id;
    const token = localStorage.getItem('token');
    // const { editor } = useCurrentEditor()

    async function postHandler() {
        const url = `https://api.ally.vocarista.com/interaction/post`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok) {
            window.location.reload();
            toast({
                title: 'Post created successfully',
                variant: 'default',
            })
        } else {
            toast({
                title: 'An error occurred',
                variant: 'destructive',
            })
        }
    }
  return (
    <Card>
    <CardHeader className="flex flex-row items-center gap-4 justify-between">
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" alt="@username" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className = "flex flex-col w-full gap-6">
        <Input placeholder="Post Title" onChange={(event) => {
            setTitle(event.target.value)
        }}/>
        <Textarea placeholder="Post Content" onChange = {(event) => {
            setContent(event.target.value);
        }}/>
        <Button className = "place-self-end w-1/6" onClick={postHandler}>Post</Button>
      </div>
    </CardHeader>
  </Card>
  )
}

export default CreatePost;