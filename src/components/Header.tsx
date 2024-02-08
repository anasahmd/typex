const Header = () => {
	return (
		<header>
			<nav className="pt-10 max-w-[900px] mx-auto">
				<div className="logo text-3xl font-bold">TypePro</div>
				<span className="text-lg">
					by{' '}
					<a href="" className="font-medium underline">
						anasahmad.dev
					</a>
				</span>
				{/* <div className="flex gap-10 font-medium underline underline-offset-2 decoration-slate-500">
					<a href="http://github.com/anasahmd">Source Code</a>
					<a href="https://anasahmad.dev">anasahmad.dev</a>
				</div> */}
			</nav>
		</header>
	);
};

export default Header;
