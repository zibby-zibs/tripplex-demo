import useAuth from "@/hooks/useAuth";
import { client } from "@/sanityConfig";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type Props = {};

interface Inputs {
	fullName: string;
	email: string;
	phoneNumber: string;
}

function Account({}: Props) {
	const { currentUser } = useAuth();
	const router = useRouter();
	const [disabled, setDisabled] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async () => {
		const { fullName, phoneNumber, email } = getValues();
		const newDocument = {
			_type: "user",
			_id: currentUser ? currentUser.id : uuidv4(),
			name: fullName,
			email: email,
			phone: phoneNumber,
		};
		try {
			await client.createIfNotExists(newDocument).then(() => {
				router.push("/");
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<main className="mx-auto flex min-h-screen max-w-md items-center p-2 font-mukta">
			<section>
				<h1 className="font-semibold md:text-3xl">
					Create your account on Tripplex
				</h1>
				<p className="text-sm font-light">
					Start your journey into a new way of living. Share a little about you
				</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-5 bg-white p-3"
				>
					<h1 className="text-md font-semibold uppercase md:text-3xl">
						Enter bill details
					</h1>
					{/* register your input into the hook by invoking the "register" function */}
					<label htmlFor="">
						<h5 className="font-semibold">Full name</h5>
						<input
							type="text"
							required
							placeholder="Full name"
							{...register("fullName")}
							className="inputFieldBill"
						/>
					</label>
					<label htmlFor="">
						<h5 className="font-semibold">Email address</h5>
						<input
							type="text"
							value={currentUser?.email}
							required
							disabled={true}
							placeholder="@gmail.com"
							{...register("email")}
							className="inputFieldBill"
						/>
					</label>

					{/* include validation with required or other standard HTML validation rules */}
					<label htmlFor="">
						<h5 className="font-semibold">Phone Number</h5>
						<input
							type="number"
							required
							placeholder="Phone number"
							{...register("phoneNumber")}
							className="inputFieldBill"
						/>
					</label>

					<button
						type="submit"
						className={`${
							disabled ? "bg-gray-400" : "bg-blue-500"
						} rounded-lg p-2 font-semibold tracking-wide text-white`}
					>
						CREATE ACCOUNT
					</button>
				</form>
			</section>
		</main>
	);
}

export default Account;
