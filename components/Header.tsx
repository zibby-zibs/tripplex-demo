import React from "react";
import { BsBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

type Props = {
	title: string;
	color: string;
};

function Header({ title, color }: Props) {
	return (
		<header className={`w-full ${color} p-2 font-poppins`}>
			<nav className="flex items-center justify-between">
				<h1 className="text-xl">{title}</h1>
				<div className="flex gap-2">
					<Link href={"/account"}>
						<FaUserCircle />
					</Link>
					<BsBellFill />
				</div>
			</nav>
		</header>
	);
}

export default Header;
