import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import { client } from "@/sanityConfig";
import { fetchCategories } from "@/utils/fetchCategories";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { CircleLoader } from "react-spinners";
import { useForm, SubmitHandler } from "react-hook-form";
import Head from "next/head";

type Props = {
	category: Category[];
};
interface Inputs {
	bill: string;
	billType: string;
	amount: number;
	category: string;
}

function CreateBill({ category }: Props) {
	const router = useRouter();
	const { user, currentUser } = useAuth();
	const [pending, setPending] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async () => {
		const { bill, billType, amount, category } = getValues();
		const categoryId = await client
			.fetch(`*[_type == 'category' && title == '${category}'][0]._id`)
			.then((data) => data);
		// const categoryId = category.find((c) => c.title === category)?._id;
		const numAmount = amount;
		const newBill = {
			_type: "bill",
			_id: uuid(),
			billType: billType,
			billName: bill,
			amount: numAmount,
			categories: {
				_type: "reference",
				_ref: categoryId,
			},
			user: {
				_type: "reference",
				_ref: currentUser?.id,
			},
		};
		try {
			await client.createIfNotExists(newBill).then(() => {
				router.push("/paymentMethod");
				setPending(false);
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Head>
				<title>Create Bill</title>
			</Head>
			<Header title="Create a custom bill" color="bg-transparent" />
			<img
				src="/pat.jpg"
				alt=""
				className="absolute top-0 h-full w-full object-cover"
			/>

			<main className="mx-auto min-h-[90vh] max-w-md rounded-lg  p-2">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-5 rounded-lg bg-white p-3 drop-shadow-2xl"
				>
					<h1 className="text-md md:text-2xl">Enter bill details</h1>
					{/* register your input into the hook by invoking the "register" function */}
					<label htmlFor="">
						<h5 className="font-semibold">Bill Type</h5>
						<input
							type="text"
							required
							placeholder="e.g Personal, Work, e.t.c"
							{...register("billType")}
							className="inputFieldBill"
						/>
					</label>
					<label htmlFor="">
						<h5 className="font-semibold">Bill name</h5>
						<input
							type="text"
							required
							placeholder="bill"
							{...register("bill")}
							className="inputFieldBill"
						/>
					</label>

					{/* include validation with required or other standard HTML validation rules */}
					<label htmlFor="">
						<h5 className="font-semibold">Amount Due</h5>
						<input
							type="number"
							required
							placeholder="0.00"
							{...register("amount")}
							className="inputFieldBill"
						/>
					</label>
					<label htmlFor="">
						<h5 className="font-semibold">
							Select a category <sup className="text-red-500">*</sup>
						</h5>
						<select
							{...register("category")}
							placeholder="utility, grocery, e.t.c"
							className="inputFieldBill"
						>
							{category?.map((option) => (
								<option key={option._id} value={option.title}>
									{option.title}
								</option>
							))}
						</select>
					</label>
					{/* errors will return when field validation fails  */}
					{/* {errors.password && <span>This field is required</span>} */}

					<button
						type="submit"
						className={`${"bg-blue-500"} rounded-lg p-2 font-semibold text-white`}
						onClick={() => setPending(true)}
					>
						{pending ? <CircleLoader color="#36d7b7" size={25} /> : "Next"}
					</button>
				</form>
			</main>
		</>
	);
}

export default CreateBill;

export const getServerSideProps = async () => {
	// const [category] = await Promise.all([fetchCategories()]);
	const category: Category = await fetchCategories();

	return {
		props: {
			category,
		},
	};
};
