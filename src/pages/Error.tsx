import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ErrorPage: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSkipClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-red-500 animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>

        <p className="text-xl text-gray-600">Page not found</p>

        <div className="text-lg font-semibold text-blue-600">
          Redirecting you to home in{" "}
          <span className="inline-block w-8 h-8 leading-8 text-white bg-blue-600 rounded-full">
            {countdown}
          </span>
        </div>

        <div className="relative pt-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            />
          </div>
        </div>

        <Button onClick={handleSkipClick} variant="outline">
          Skip to Home
        </Button>

        <p className="text-sm text-gray-500 italic">
          "In chess, as in life, not every move goes as planned."
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
