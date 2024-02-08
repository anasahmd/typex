import ThemeSwitch from './ThemeSwitch';

const Header = () => {
	return (
		<header>
			<nav className="pt-10 max-w-[900px] mx-auto flex justify-between items-center">
				<div>
					<div className="logo text-3xl font-bold">TypeZone</div>
					<span className="text-lg">
						by{' '}
						<a href="https://anasahmad.dev" className="font-medium underline">
							anasahmad.dev
						</a>
					</span>
				</div>
				<div>
					<ThemeSwitch />
				</div>
			</nav>
		</header>
	);
};

export default Header;
