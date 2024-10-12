import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createUser, loginUser } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/components/UserProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useUser();

  const validateUsername = (username: string) => {
    return /^[a-zA-Z0-9]{3,20}$/.test(username);
  };

  const validatePassword = (password: string) => {
    return password.length >= 3 && password.length <= 20;
  };

  const handleLogin = async () => {
    if (!validateUsername(loginUsername)) {
      toast({
        title: "Incorrect Username",
        description:
          "Your username should be between 3-20 characters long and consist only of alphanumeric characters",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(loginPassword)) {
      toast({
        title: "Incorrect Password",
        description: "Your password should be between 3-20 characters long",
        variant: "destructive",
      });
      return;
    }

    const res = await loginUser(loginUsername, loginPassword);

    // Handle bad requests
    if (res instanceof Error) {
      toast({
        title: res.message,
        description:
          "Your username or password was incorrect, please try again.",
        variant: "destructive",
      });
      return;
    }

    // Handle successful login
    toast({
      title: "Successful login!",
    });
    user.handleLogin(loginUsername, loginPassword);
    navigate("/");
  };

  const handleRegister = async () => {
    if (!validateUsername(registerUsername)) {
      toast({
        title: "Bad Username",
        description:
          "Your username should be between 3-20 characters long and consist only of alphanumeric characters",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(registerPassword)) {
      toast({
        title: "Incorrect Password",
        description: "Your password should be between 3-20 characters long",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Incorrect Password",
        description:
          "The passwords you have entered do not match, make sure they are the same",
        variant: "destructive",
      });
      return;
    }

    const res = await createUser(registerUsername, registerPassword);

    // Handle bad requests
    if (res instanceof Error) {
      // Figure out what kind of error this is
      const errorMessage = res.message.split(" ");
      console.log(errorMessage);
      const statusCodeLocation = 3;

      if (
        errorMessage.length >= statusCodeLocation + 1 &&
        errorMessage[statusCodeLocation] === "400"
      ) {
        toast({
          title: res.message,
          description: `The username '${registerUsername}' is already taken, please try another username.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: res.message,
          description:
            "Something went wrong while trying to register your account. Please try again later.",
          variant: "destructive",
        });
      }

      return;
    }

    // Handle successful registration
    toast({
      title: "Your account has been successfully created!",
    });
    user.handleLogin(registerUsername, registerPassword);
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-20 bg-gray-100">
      <div className="w-full h-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                <Input
                  id="login-username"
                  type="text"
                  placeholder="Enter your username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="Choose a username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Please don't put any real passwords"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">
                  Confirm Password
                </Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
