import Header from "@/components/Header";
import React from "react";
import { RiBillFill } from "react-icons/ri";
import { FaDesktop, FaLightbulb } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";
import Head from "next/head";

type Props = {};

function ChooseBill({}: Props) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Choose Bill</title>
			</Head>
			<Header title="Create a bill" color="bg-transparent" />
			<img
				src="/pat.jpg"
				alt=""
				className="absolute top-0 h-full w-full object-cover"
			/>

			<main className="mx-auto mt-5 flex min-h-[90vh] w-fit items-center font-mukta">
				<section>
					<aside
						className="flex cursor-pointer items-center justify-between space-x-2 rounded-lg bg-white p-2 px-2 drop-shadow-xl"
						onClick={() => router.push("/createBill")}
					>
						<RiBillFill className=" text-2xl" />
						<article>
							<h3 className="font-semibold">Customise Your Bill</h3>
							<p>Make your plans for the rainy day</p>
						</article>
						<MdOutlineKeyboardArrowRight className="" />
					</aside>

					<section className="mt-5 rounded-lg bg-white drop-shadow-xl">
						<aside
							className="flex cursor-pointer place-items-start items-center justify-between space-x-2 rounded-lg  p-2 drop-shadow-2xl"
							onClick={() => router.push("/createBill")}
						>
							<FaDesktop className=" text-2xl" />
							<article>
								<h3 className="font-semibold">Television</h3>
								<p className="text-sm font-light text-gray-500">
									Pay your TV bills here
								</p>
							</article>
							<MdOutlineKeyboardArrowRight className="" />
						</aside>
						<aside
							className="flex cursor-pointer place-items-start items-center justify-between space-x-2 rounded-lg p-2 drop-shadow-2xl"
							onClick={() => router.push("/createBill")}
						>
							<FaLightbulb className=" text-2xl" />
							<article>
								<h3 className="font-semibold">Electricity Bill</h3>
								<p className="text-sm font-light text-gray-500">
									view how much you need to pay
								</p>
							</article>
							<MdOutlineKeyboardArrowRight className="" />
						</aside>
					</section>
				</section>
			</main>
		</>
	);
}

export default ChooseBill;
