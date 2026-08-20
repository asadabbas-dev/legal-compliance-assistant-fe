"use client";

import { isAuthenticated } from "@/common/utils/users.util";
import { login } from "@/provider/features/auth/auth.slice";
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
});

export default function useLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { email, password } = watch();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/workspace");
    }
  }, [router]);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedUsername");
    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setIsChecked(true);
    }
  }, [setValue]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const result = await dispatch(
        login({
          payload: { email: values.email, password: values.password },
        }),
      );
      if (!login.fulfilled.match(result)) return;

      if (isChecked) {
        localStorage.setItem("rememberedUsername", values.email);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      localStorage.removeItem("rememberedPassword");
      router.push("/workspace");
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    isChecked,
    setIsChecked,
    router,
    loading,
    register,
    handleSubmit,
    errors,
    password,
    email,
  };
}
