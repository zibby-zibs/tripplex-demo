import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = {};
interface Inputs {
	email: string;
	password: string;
}

const Signup = (props: Props) => {
	const [login, setLogin] = useState(false);
	const [isError, setIsError] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);
	const { signUp, error, setError } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (login) {
			await signUp?.(email, password);
		}
	};

	const router = useRouter();

	return (
		<main className="flex h-screen flex-col items-center justify-center space-y-3">
			<img
				src="/pat.jpg"
				alt=""
				className="absolute top-0 h-full w-full object-cover"
			/>
			{error?.type === "success" ? (
				<aside className="z-20 flex rounded-lg bg-[#04de04] px-3 py-1 text-white">
					<IoIosCheckmarkCircle className="h-6 w-6" /> {error?.message}
				</aside>
			) : (
				error?.type === "error" && (
					<aside className="z-20 flex rounded-lg bg-[#d41111] px-3 py-1 text-white">
						<IoMdCloseCircle className="h-6 w-6" /> {error?.message}
					</aside>
				)
			)}

			<section className="rounded-md  bg-black/75 bg-opacity-10 bg-clip-padding drop-shadow-md backdrop-blur-sm backdrop-filter">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className=" space-y-8 px-6 py-10 md:mt-0 md:max-w-md md:px-14"
				>
					<h1 className="text-4xl font-semibold capitalize text-white">
						sign up
					</h1>
					<div className="space-y-4">
						<label className="inline-block w-full">
							<input
								type="email"
								id=""
								placeholder="Email"
								className="inputForm"
								{...register("email", { required: true })}
							/>
							{errors.email && (
								<p className="p-1 text-sm font-light text-orange-300">
									This field is required
								</p>
							)}
						</label>
						<label className="relative inline-block w-full">
							<input
								type={passwordShown ? "text" : "password"}
								id=""
								placeholder="Password"
								className="inputForm "
								{...register("password", { required: true })}
							/>
							{passwordShown ? (
								<AiFillEye
									className="absolute right-2 top-[25%] h-6 w-6 text-white"
									onClick={() => setPasswordShown(!passwordShown)}
								/>
							) : (
								<AiFillEyeInvisible
									className="absolute right-2 top-[25%] h-6 w-6 text-white"
									onClick={() => setPasswordShown(!passwordShown)}
								/>
							)}
							{errors.password && (
								<p className="p-1 text-sm font-light text-orange-300">
									This field is required
								</p>
							)}
						</label>
					</div>

					<button
						className="w-full rounded bg-white py-3 font-semibold capitalize"
						onClick={() => setLogin(true)}
					>
						sign up
					</button>

					<div className="text-[gray]">
						Have an account? &nbsp;
						<button
							type="submit"
							className="capitalize text-white hover:underline"
							onClick={() => router.push("login")}
						>
							sign in now
						</button>
					</div>
				</form>
			</section>
		</main>
	);
};

export default Signup;
