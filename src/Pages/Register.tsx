import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
// import { useNavigate } from "react-router-dom"

export default function Register() {
  const [universities, setUniversities] = useState([]);
  // const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function fetchUniversities() {
    const response = await fetch("http://localhost:3000/university", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setUniversities(data);
  }

  async function registerUser(event: any) {
    event.preventDefault();
    console.log(name, email, password, confirmPassword, universityId, isAlumni);
    if ((password !== confirmPassword) || !name || !email || !password || !confirmPassword || !universityId) {
      toast({
        title: "Make sure all fields are filled and passwords match",
        variant: "destructive",
      });
      return;
    }
    const url = "https://api.ally.vocarista.com/auth/register/" + (isAlumni ? "alumni" : "student");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        university_id: [universityId],
        role: isAlumni ? "Alumni" : "Student",
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast({
        title: "User registered successfully",
        variant: "default",
      });
      window.location.href = "/login";
    } else {
      toast({
        title: data.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchUniversities();
  }, [])

  const [isAlumni, setIsAlumni] = useState(false)
  const [universityId, setUniversityId] = useState("")
  const [universityName, setUniversityName] = useState("")
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Sign Up for Ally</h1>
          <p className="mt-2 text-muted-foreground">Create your account to get started.</p>
        </div>
        <form className="mt-6 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Enter your name" required onChange={(event) => {
              setName(event.target.value);
            }}/>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required onChange={(event) => {
              setEmail(event.target.value);
            }}/>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required onChange={(event) => {
              setPassword(event.target.value);
            }}/>
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm your password" required onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}/>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="role" className="flex items-center gap-2">
              {isAlumni ? "Alumni" : "Student"}
              <Switch id="role" aria-label="Role" checked={isAlumni} onCheckedChange={setIsAlumni} />
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span>{universityName || "University"}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select University</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {universities.map((university: any) => (
                  <DropdownMenuItem key={university.university_id} onSelect={() => {
                    setUniversityId(university.university_id)
                    setUniversityName(university.name)
                  }}>{university.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button type="submit" className="w-full" onClick = {registerUser}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  )
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}