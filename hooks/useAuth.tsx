import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
// import { Database } from '../db_types'
// type Profiles = Database['public']['Tables']['profiles']['Row']

type ErrorObject = {
	message: string;
	type: object;
};

interface AuthContextProps {
	user: User | null;
	currentUser: User | null;
	profile: { [x: string]: any } | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	getUserProfile: () => void;
	updatePassword: (password: string) => Promise<void>;
	error: { message: string; type: string };
	setError: React.Dispatch<
		React.SetStateAction<{ message: string; type: string }>
	>;
	logout: () => void;
	passwordReset: (email: string) => Promise<void>;
	loggedIn: boolean;
	loading: boolean;
	userLoading: boolean;
}

type Props = {
	children: React.ReactNode;
};
const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider = ({ children }: Props) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [userLoading, setUserLoading] = useState(true);
	const [loggedIn, setLoggedin] = useState(false);
	const [error, setError] = useState({ message: "", type: "" });
	const [recoveryToken, setRecoveryToken] = useState<string | null>(null);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<null | { [x: string]: any }>(null);

	const router = useRouter();

	useEffect(() => {
		const getCurrentUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setCurrentUser(user);
		};

		getCurrentUser();
	});
	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
		};
		fetchUser(); // returns the `user` if there's an active session avaialable

		if (user) {
			setUser(user);
			setUserLoading(false);
			setLoggedin(true);
			const isNewUser = JSON.parse(
				localStorage.getItem("isNewUser") || "false"
			);
			if (isNewUser) {
				router.push("/account");
				localStorage.removeItem("isNewUser");
			} else {
				router.push("/");
			}
		} else {
			setUser(null);
			router.push("/login");
		}
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			const user = session?.user ?? null;
			setUserLoading(false);
			if (event === "PASSWORD_RECOVERY") {
				let newPassword = prompt(
					"What would you like your new password to be?"
				);
				if (newPassword !== null && newPassword !== undefined) {
					const { data, error } = await supabase.auth.updateUser({
						password: newPassword,
					});
				}
			}

			if (user) {
				setUser(user);
				setLoggedin(true);
				const isNewUser = JSON.parse(
					localStorage.getItem("isNewUser") || "false"
				);
				if (isNewUser) {
					router.push("/account");
					localStorage.removeItem("isNewUser");
				} else {
					router.push("/");
				}
			} else {
				router.push("/login");
			}
		});

		return () => {
			subscription.unsubscribe(); // We'll simply unsubscribe from listening to the events when the user navigates away from our App.
		};
	}, []);

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError?.({ message: "", type: "" });
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	const signUp = async (email: string, password: string) => {
		try {
			setLoading(true);
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) {
				setError({
					message: "An error occured, try again in a bit",
					type: "error",
				});
			} else {
				localStorage.setItem("isNewUser", JSON.stringify(true)); // Convert boolean value to a string before storing in localStorage
				setError({
					message: "Check your email for confirmation mail",
					type: "success",
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const signIn = async (email: string, password: string) => {
		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				setError({ message: "An error occured", type: "error" });
				console.log(error.message);
			} else {
				setUser(user);
				setError({ message: "Log in successfull!", type: "success" });
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			await supabase.auth.signOut();
			setUser(null);
			router.push("/login");
		} catch (error) {
			console.log(error);
		}
	};
	const passwordReset = async (email: string) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: "http://localhost:3000/reset",
		});
		if (error) {
			setError({ message: "An error occured", type: "error" });
			console.log(error);
		} else {
			setError({
				message: "Email sent, It might be in your spam",
				type: "success",
			});
		}
	};
	const updatePassword = async (password: string) => {
		const { error } = await supabase.auth.updateUser({ password });
		if (error) {
			setError({ message: "An error occured", type: "error" });
			console.log(error);
		} else {
			setError({ message: "Password updated, sign in now", type: "success" });
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signUp,
				signIn,
				loading,
				logout,
				updatePassword,
				passwordReset,
				error,
				profile,
				currentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
