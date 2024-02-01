const Header = () => {
	return (
		<header>
			<nav className="pt-10 flex justify-between items-center px-52">
				<div className="logo text-xl font-bold">Speed Type</div>
				<div className="flex gap-10 font-medium underline underline-offset-2 decoration-slate-500">
					<a href="http://github.com/anasahmd">Source Code</a>
					<a href="https://anasahmad.dev">anasahmad.dev</a>
				</div>
			</nav>
		</header>
	);
};

export default Header;
