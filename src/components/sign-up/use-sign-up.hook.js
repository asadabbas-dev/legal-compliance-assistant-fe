"use client";

import { isAuthenticated } from "@/common/utils/users.util";
import { signUp } from "@/provider/features/auth/auth.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function useSignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const { email, password, confirmPassword } = watch();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/workspace");
    }
  }, [router]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await dispatch(
        signUp({
          payload: { email: values.email, password: values.password },
        }),
      );
      if (!signUp.fulfilled.match(result)) return;
      router.push("/workspace");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    loading,
    email,
    password,
    confirmPassword,
  };
}
