import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { fetchBill } from "@/utils/fetchBill";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

type Props = {
	bill: Bill[];
};
export default function Home({ bill }: Props) {
	const [thisUser, setThisUser] = useState();
	const { currentUser } = useAuth();

	const router = useRouter();
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header title="Your bills" color="bg-blue-300" />
			<img
				src="/pat.jpg"
				alt=""
				className="absolute top-0 -z-10 h-full w-full object-cover"
			/>
			<main className="mx-auto flex max-h-[90vh] max-w-sm flex-col items-center overflow-hidden rounded-md bg-blue-400 bg-opacity-10 bg-clip-padding p-5 backdrop-blur-sm backdrop-filter">
				<section className="mt-5 flex w-full items-center justify-between">
					<h5 className="rounded-md bg-blue-500 p-1 px-2 font-light text-white">
						Personal
					</h5>
					<Link href={"/chooseBill"}>
						<BsFillPlusCircleFill className="text-xl text-blue-700" />
					</Link>
				</section>

				<form className="pt-5">
					<input
						type="text"
						placeholder="search for bill"
						className="min-w-full rounded-md border-2 border-gray-400 bg-transparent p-1 px-2"
					/>
				</form>
				{!bill ? (
					<h5 className="flex min-h-[70vh] items-center">
						You don&apos;t have any bills yet
					</h5>
				) : (
					<section className="flex h-screen items-center">
						{bill?.map((b) => {
							return (
								<aside
									key={b._id}
									className="w-full cursor-pointer space-y-3 divide-y-2 rounded-lg bg-gray-300 p-5"
								>
									<article className="flex justify-between font-semibold">
										<h3>{b.billName}</h3>
										<h4>{b.amount}</h4>
									</article>
									<article className="flex justify-between space-x-11 pt-3">
										<p className="text-sm font-light">
											Due date: {new Date(b._createdAt).toDateString()}
										</p>
										<p>Monthly</p>
									</article>
								</aside>
							);
						})}
					</section>
				)}

				<button
					className="-mt-11 rounded-md bg-blue-700 p-1 px-2 font-light text-white"
					onClick={() => router.push("/chooseBill")}
				>
					Schedule bill
				</button>
			</main>
		</>
	);
}

export const getServerSideProps = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	// const [category] = await Promise.all([fetchCategories()]);
	const bill: Bill = await fetchBill(user?.id);

	return {
		props: {
			bill,
		},
	};
};
