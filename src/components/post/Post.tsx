import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpIcon, ArrowDownIcon, MessageSquare, Share2, BookmarkIcon, MoreHorizontal} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
const Post = ({ post }: any) => {
    const { title, content, user_id, interaction_id, /*timestamp, university_id,*/ votes } = post;
    const [voted, setVoted] = useState<number>(0);
    const [poster, setPoster] = useState<string>('');
    const token = localStorage.getItem('token');

    async function getPoster() {
        const url  = `https://api.ally.vocarista.com/user/${user_id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok) {
            const data = await response.json();
            setPoster(data.name);
        }
    }

    async function handleUpvote() {
        if(voted === 1) {
            await downvote();
        } else {
            await upvote();
        }
    }

    async function handleDownvote() {
        if(voted === -1) {
            await upvote();
        } else {
            await downvote();
        }
    }

    async function upvote() {
        const url = `https://api.ally.vocarista.com/interaction/upvote/${interaction_id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok) {
            setVoted(voted => voted + 1);
        }
    }

    useEffect(() => {
        getPoster();
    }, [])

    async function downvote() {
        const url = `https://api.ally.vocarista.com/interaction/downvote/${interaction_id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok) {
            setVoted(voted => voted - 1);
        }
    }


    return(
        <div className="w-full lg:w-full space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="flex flex-col items-center">
                <Button size="icon" variant="ghost" onClick = {handleUpvote}>
                  <ArrowUpIcon className="h-5 w-5" />
                </Button>
                <span className="text-sm font-bold">{votes}</span>
                <Button size="icon" variant="ghost" onClick = {handleDownvote}>
                  <ArrowDownIcon className="h-5 w-5" />
                </Button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Posted by {poster}</span>
                  <span className="text-sm text-muted-foreground">Just Now</span>
                </div>
                <h3 className="text-lg font-bold mt-2">{title}</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                {content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  24 Comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <BookmarkIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
    )
}

export default Post;