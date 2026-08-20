import api from "@/common/utils/api";
import { setAccessToken } from "@/common/utils/access-token.util";
import { clearGuestToken, removeUser, setUser } from "@/common/utils/users.util";

async function persistSession(accessToken) {
  setAccessToken(accessToken);
  clearGuestToken();
  const meResponse = await api({
    Authorization: `Bearer ${accessToken}`,
  }).get("/auth/me");
  const user = meResponse.data;
  setUser(user);
  return user;
}

const login = async ({ email, password }) => {
  const response = await api().post("/auth/login", { email, password });
  const accessToken = response.data?.access_token;
  if (!accessToken) {
    throw new Error("Login failed");
  }
  const user = await persistSession(accessToken);
  return { access_token: accessToken, user };
};

const signUp = async ({ email, password }) => {
  const response = await api().post("/auth/register", { email, password });
  const accessToken = response.data?.access_token;
  if (!accessToken) {
    throw new Error("Sign up failed");
  }
  const user = await persistSession(accessToken);
  return { access_token: accessToken, user };
};

const getMe = async () => {
  const response = await api().get("/auth/me");
  if (response.data) {
    setUser(response.data);
  }
  return response.data;
};

const logout = async () => {
  removeUser();
  return { success: true };
};

const authService = {
  logout,
  login,
  signUp,
  getMe,
};

export default authService;
