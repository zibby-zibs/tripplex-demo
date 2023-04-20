import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import { client } from "@/sanityConfig";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { uuid } from "uuidv4";

type Props = {};

interface Inputs {
	bankName: string;
	account: string;
}

function BankDetails({}: Props) {
	const { currentUser } = useAuth();
	const [disabled, setDisabled] = useState(false);
	const [pending, setPending] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async () => {
		const { bankName, account } = getValues();
		const newBill = {
			_type: "bill",
			_id: currentUser?.id || uuid(),
			account: account,
			bank: bankName,
		};
		router.push("/");
		// try {
		// 	await client.patch(currentUser?.id || uuid(), (patch: { set: (arg0: { _type: string; _id: string; account: string; bank: string; }) => any; })=>patch.set(newBill))
		// 		router.push("/paymentMethod");
		// 		setPending(false);
		// 	};
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	return (
		<>
			<Head>
				<title>Bank Details</title>
			</Head>
			<Header title="Create a custom bill" color="bg-transparent" />
			<img
				src="/pat.jpg"
				alt=""
				className="absolute top-0 h-full w-full object-cover"
			/>
			<main className="mx-auto flex min-h-screen max-w-md items-center justify-center p-2">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-5 bg-white p-3 drop-shadow-xl"
				>
					<h1 className="text-md md:text-2xl">Add Bank Details</h1>
					{/* register your input into the hook by invoking the "register" function */}
					<label htmlFor="">
						<h5 className="font-semibold">Bank Name</h5>
						<input
							type="text"
							required
							placeholder="e.g Personal, Work, e.t.c"
							{...register("bankName")}
							className="inputFieldBill"
						/>
					</label>
					<label htmlFor="">
						<h5 className="font-semibold">Account Number</h5>
						<input
							type="text"
							required
							placeholder="account number"
							{...register("account")}
							className="inputFieldBill"
						/>
					</label>

					{/* include validation with required or other standard HTML validation rules */}

					{/* errors will return when field validation fails  */}
					{/* {errors.password && <span>This field is required</span>} */}

					<button
						type="submit"
						className={`${
							disabled ? "bg-gray-400" : "bg-blue-500"
						} rounded-lg p-2 font-semibold text-white`}
						onClick={() => setDisabled(false)}
					>
						Continue
					</button>
				</form>
			</main>
		</>
	);
}

export default BankDetails;
