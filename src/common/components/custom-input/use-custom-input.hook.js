"use client";

import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";

export default function useCustomInput(onChange, type, endIcon) {
  const [showPassword, setShowPassword] = useState(false);

  const borderErrorStyle = {
    border: "1px solid red",
  };

  const borderSuccessStyle = {
    border: "1px solid gray",
  };

  const inputChangeHandler = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const getInputEndAdornment = useCallback(() => {
    if (type === "password") {
      return (
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          onMouseDown={(event) => event.preventDefault()}
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <Eye className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      );
    }
    return endIcon;
  }, [type, showPassword, endIcon]);

  return {
    showPassword,
    inputChangeHandler,
    getInputEndAdornment,
    borderErrorStyle,
    borderSuccessStyle,
  };
}
