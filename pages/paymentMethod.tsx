import Header from "@/components/Header";
import React from "react";
import Link from "next/link";
import { BsSafe2 } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Head from "next/head";

type Props = {};

function paymentMethod({}: Props) {
	return (
		<>
			<Head>
				<title>Payment Method</title>
			</Head>
			<Header title="Payment method" color="bg-transparent" />
			<img
				src="/pat.jpg"
				alt=""
				className="absolute top-0 h-full w-full object-cover"
			/>
			<main className="mx-auto flex min-h-screen max-w-md items-center p-2 font-mukta">
				<section>
					<h1>Select Payment Destination</h1>

					<section className="flex flex-col space-y-3">
						<Link href={"/bankDetails"}>
							<aside className="flex cursor-pointer items-center justify-between space-x-5 rounded-lg bg-gray-200 p-4 drop-shadow-xl">
								<BsSafe2 />
								<article>
									<h5 className="font-semibold">Bank account</h5>
									<p className="text-sm font-light">
										withdraw funds directly to your bank
									</p>
								</article>
								<MdOutlineKeyboardArrowRight className="" />
							</aside>
						</Link>
						<Link href={"/bankDetails"}>
							<aside className="flex cursor-pointer items-center justify-between space-x-5 rounded-lg bg-gray-200 p-4 drop-shadow-xl">
								<GiWallet />
								<article>
									<h5 className="font-semibold">Tripplex wallet</h5>
									<p className="text-sm font-light">
										Receive funds instantly in your Tripplex wallet
									</p>
								</article>
								<MdOutlineKeyboardArrowRight className="" />
							</aside>
						</Link>
					</section>
				</section>
			</main>
		</>
	);
}

export default paymentMethod;
