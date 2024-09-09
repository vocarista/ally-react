import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"  // Adjust based on your project structure
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { toast } = useToast()


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      toast({
        title: 'Make sure all fields are filled',
        variant: 'destructive',
      })
      return
    }

    try {
      const url  = 'https://api.ally.vocarista.com/auth/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if(response.ok) {
        toast({
          title: 'User logged in successfully',
          variant: 'default',
        })
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.location.href = '/';
      } else {
        toast({
          title: 'Invalid email or password',
          variant: 'destructive',
        })
      }
    } catch (error) {
      setError('Invalid email or password')
      toast({
        title: 'Invalid email or password',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="md:flex bg-black">
        <div className='w-1/2 hidden md:flex h-screen'>
            <img 
            src="https://images.unsplash.com/photo-1605478328994-f93e98217da7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjBhYnN0cmFjdCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D"
            className='w-full h-full object-cover'
            ></img>

        </div>

        <div className=' h-screen md:w-1/2 flex justify-center items-center'>
        <Card className="w-3/4  h-96  max-w-md">
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Log in
            </Button>
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
      </div>

    </div>
  )
}

export default LoginPage
