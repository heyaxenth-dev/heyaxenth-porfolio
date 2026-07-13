import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = ['About', 'Projects', 'Stack', 'Contact'];

const PROJECTS = [
	{
		id: 1,
		year: '2024',
		title: 'Remote Sens',
		desc: 'React Native mobile app using geospatial analysis to assess land areas and generate data-driven tree replantation suggestions. Integrated Python-based analysis with real-time weather and environmental factors to monitor growth and produce success rate reports.',
		tags: ['React Native', 'Python', 'Geospatial', 'Weather API'],
		href: 'https://github.com/heyaxenth-dev',
		images: [],
		wip: true,
	},
	{
		id: 2,
		year: '2024',
		title: 'GrowCalendar',
		desc: 'Smart farming app that recommends crops to farmers based on real-time weather, soil, and environmental factors. Features a feedback tracking system that continuously re-learns from farmer outcomes to improve future recommendations.',
		tags: ['React', 'Python', 'Data Re-learning', 'Weather API'],
		href: 'https://github.com/heyaxenth-dev',
		images: [
			'/images/growcalendar-1.png',
			'/images/growcalendar-2.png',
			'/images/growcalendar-3.png',
			'/images/growcalendar-4.png',
		],
		wip: false,
	},
	{
		id: 3,
		year: '2023',
		title: 'BILLFrozen',
		desc: 'Full-stack ordering and inventory management system for a frozen goods business. Retailers can place and track orders through a responsive web app with real-time SMS notifications for order status updates and communication.',
		tags: ['PHP', 'MySQL', 'JavaScript', 'SMS API'],
		href: 'https://github.com/heyaxenth-dev',
		images: [
			'/images/billfrozen-1.png',
			'/images/billfrozen-2.png',
			'/images/billfrozen-3.png',
			'/images/billfrozen-4.png',
			'/images/billfrozen-5.png',
			'/images/billfrozen-6.png',
		],
		wip: false,
	},
];

const SKILLS = [
	{
		group: 'Frontend',
		items: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
	},
	{
		group: 'Backend',
		items: [
			'PHP',
			'JavaScript',
			'jQuery',
			'OOP',
			'API Integration',
			'SEO Optimization',
		],
	},
	{
		group: 'Data & DB',
		items: ['MySQL', 'WordPress', 'REST APIs', 'SMS API Integration'],
	},
	{
		group: 'Design',
		items: ['UI/UX Design', 'Figma', 'Visual Graphics', 'Responsive Design'],
	},
];

function useInView(ref, threshold = 0.15) {
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) setInView(true);
			},
			{ threshold },
		);
		if (ref.current) obs.observe(ref.current);
		return () => obs.disconnect();
	}, [ref, threshold]);
	return inView;
}

function FadeIn({ children, delay = 0, className = '' }) {
	const ref = useRef(null);
	const inView = useInView(ref);
	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0)' : 'translateY(28px)',
				transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
			}}>
			{children}
		</div>
	);
}

export default function App() {
	const [activeNav, setActiveNav] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [sent, setSent] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const sections = ['about', 'projects', 'stack', 'contact'];
			for (const id of sections.reverse()) {
				const el = document.getElementById(id);
				if (el && window.scrollY >= el.offsetTop - 120) {
					setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
					return;
				}
			}
			setActiveNav('');
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollTo = (id) => {
		document
			.getElementById(id.toLowerCase())
			?.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	};

	const handleSend = (e) => {
		e.preventDefault();
		setSent(true);
	};

	return (
		<div
			style={{
				background: '#0d0d0d',
				color: '#e8e4dc',
				fontFamily: "'DM Mono', 'Courier New', monospace",
				minHeight: '100vh',
			}}>
			{/* ── NAV ── */}
			<nav
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
					backdropFilter: 'blur(12px)',
					background: 'rgba(13,13,13,0.88)',
					borderBottom: menuOpen ? 'none' : '1px solid #1e1e1e',
				}}>
				{/* Main nav bar */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '0 2rem',
						height: '60px',
					}}>
					<span
						style={{
							fontFamily: "'Playfair Display', Georgia, serif",
							fontSize: '1.1rem',
							letterSpacing: '0.02em',
							color: '#f5f0e8',
						}}>
						HCD<span style={{ color: '#c8ff00' }}>.</span>
					</span>

					{/* Desktop links */}
					<div style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
						{NAV_LINKS.map((l) => (
							<button
								key={l}
								onClick={() => scrollTo(l)}
								style={{
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									fontSize: '0.75rem',
									letterSpacing: '0.12em',
									textTransform: 'uppercase',
									color: activeNav === l ? '#c8ff00' : '#888',
									transition: 'color 0.2s',
								}}
								onMouseEnter={(e) => {
									if (activeNav !== l) e.target.style.color = '#e8e4dc';
								}}
								onMouseLeave={(e) => {
									if (activeNav !== l) e.target.style.color = '#888';
								}}>
								{l}
							</button>
						))}
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						<button
							onClick={() => scrollTo('Contact')}
							className="hire-btn"
							style={{
								background: '#c8ff00',
								border: 'none',
								cursor: 'pointer',
								color: '#0d0d0d',
								fontSize: '0.72rem',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								fontWeight: '700',
								padding: '8px 18px',
								borderRadius: '2px',
								transition: 'opacity 0.2s',
							}}
							onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
							onMouseLeave={(e) => (e.target.style.opacity = '1')}>
							Hire me
						</button>

						{/* Hamburger — mobile only */}
						<button
							className="hamburger"
							onClick={() => setMenuOpen((o) => !o)}
							aria-label="Toggle menu"
							style={{
								display: 'none',
								background: 'none',
								border: 'none',
								cursor: 'pointer',
								padding: '4px',
								flexDirection: 'column',
								gap: '5px',
							}}>
							<span
								style={{
									display: 'block',
									width: '22px',
									height: '2px',
									background: '#e8e4dc',
									transition: 'transform 0.3s, opacity 0.3s',
									transform: menuOpen
										? 'translateY(7px) rotate(45deg)'
										: 'none',
								}}
							/>
							<span
								style={{
									display: 'block',
									width: '22px',
									height: '2px',
									background: '#e8e4dc',
									transition: 'opacity 0.3s',
									opacity: menuOpen ? 0 : 1,
								}}
							/>
							<span
								style={{
									display: 'block',
									width: '22px',
									height: '2px',
									background: '#e8e4dc',
									transition: 'transform 0.3s, opacity 0.3s',
									transform: menuOpen
										? 'translateY(-7px) rotate(-45deg)'
										: 'none',
								}}
							/>
						</button>
					</div>
				</div>

				{/* Mobile dropdown menu */}
				<div
					style={{
						overflow: 'hidden',
						maxHeight: menuOpen ? '320px' : '0',
						transition: 'max-height 0.35s ease',
						borderBottom: menuOpen ? '1px solid #1e1e1e' : 'none',
						background: 'rgba(13,13,13,0.97)',
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							padding: '1rem 2rem 1.5rem',
						}}>
						{NAV_LINKS.map((l) => (
							<button
								key={l}
								onClick={() => scrollTo(l)}
								style={{
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									fontSize: '1.1rem',
									letterSpacing: '0.08em',
									textTransform: 'uppercase',
									color: activeNav === l ? '#c8ff00' : '#888',
									textAlign: 'left',
									padding: '0.85rem 0',
									borderBottom: '1px solid #1a1a1a',
									fontFamily: "'DM Mono', monospace",
									transition: 'color 0.2s',
								}}>
								{l}
							</button>
						))}
						<button
							onClick={() => scrollTo('Contact')}
							style={{
								background: '#c8ff00',
								border: 'none',
								cursor: 'pointer',
								color: '#0d0d0d',
								fontSize: '0.75rem',
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								fontWeight: '700',
								padding: '12px 18px',
								borderRadius: '2px',
								marginTop: '1rem',
								fontFamily: "'DM Mono', monospace",
							}}>
							Hire me →
						</button>
					</div>
				</div>
			</nav>

			{/* ── HERO ── */}
			<section
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					padding: '0 2rem 4rem',
					paddingTop: '100px',
					maxWidth: '1200px',
					margin: '0 auto',
				}}>
				<div
					style={{
						borderTop: '1px solid #1e1e1e',
						paddingTop: '3rem',
						marginBottom: '2rem',
					}}>
					<p
						style={{
							fontSize: '0.72rem',
							letterSpacing: '0.2em',
							color: '#555',
							textTransform: 'uppercase',
							marginBottom: '2rem',
						}}>
						Software Engineer & Web Developer — Available for hire
					</p>
					<h1
						style={{
							fontFamily: "'Playfair Display', Georgia, serif",
							fontSize: 'clamp(3.5rem, 10vw, 8rem)',
							lineHeight: 1,
							fontWeight: '700',
							color: '#f5f0e8',
							margin: 0,
							letterSpacing: '-0.02em',
						}}>
						Hya
						<br />
						<span style={{ color: '#c8ff00', fontStyle: 'italic' }}>Cynth</span>
						<br />
						Dojillo.
					</h1>
				</div>

				<div
					style={{
						display: 'flex',
						gap: '4rem',
						alignItems: 'flex-end',
						flexWrap: 'wrap',
					}}>
					<p
						style={{
							flex: '1',
							minWidth: '240px',
							fontSize: '1rem',
							color: '#888',
							lineHeight: 1.7,
							maxWidth: '440px',
							margin: 0,
						}}>
						Software engineer & web developer building user-centric applications
						with modern web technologies — from government systems to
						client-facing products.
					</p>
					<div style={{ display: 'flex', gap: '2rem' }}>
						{[
							['3+', 'Projects'],
							['5+', 'Years'],
							['NCIII', 'Certified'],
						].map(([n, l]) => (
							<div key={l}>
								<div
									style={{
										fontFamily: "'Playfair Display', serif",
										fontSize: '2rem',
										color: '#f5f0e8',
									}}>
									{n}
								</div>
								<div
									style={{
										fontSize: '0.7rem',
										letterSpacing: '0.15em',
										textTransform: 'uppercase',
										color: '#555',
									}}>
									{l}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Scroll hint */}
				<div
					style={{
						marginTop: '4rem',
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}>
					<div style={{ width: '40px', height: '1px', background: '#333' }} />
					<span
						style={{
							fontSize: '0.68rem',
							letterSpacing: '0.2em',
							color: '#444',
							textTransform: 'uppercase',
						}}>
						Scroll
					</span>
					<div
						style={{
							width: '1px',
							height: '32px',
							background: '#333',
							animation: 'pulse 2s infinite',
						}}
					/>
				</div>
			</section>

			{/* ── ABOUT ── */}
			<section
				id="about"
				style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
				<FadeIn>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '4rem',
							alignItems: 'start',
						}}>
						<div>
							<Label>001 — About</Label>
							<h2
								style={{
									fontFamily: "'Playfair Display', Georgia, serif",
									fontSize: 'clamp(2rem, 5vw, 3.5rem)',
									lineHeight: 1.1,
									color: '#f5f0e8',
									margin: '1.5rem 0 2rem',
									fontWeight: 700,
								}}>
								I craft experiences that{' '}
								<span style={{ color: '#c8ff00', fontStyle: 'italic' }}>
									scale.
								</span>
							</h2>
							<p
								style={{
									color: '#888',
									lineHeight: 1.8,
									fontSize: '0.95rem',
									marginBottom: '1.5rem',
								}}>
								Based in Antique, Philippines, I'm a software engineer and web
								developer with a strong foundation in designing and building
								user-centric applications. I've shipped systems for government,
								private clients, and international companies — from monitoring
								platforms to responsive marketing sites.
							</p>
							<p
								style={{ color: '#666', lineHeight: 1.8, fontSize: '0.95rem' }}>
								I hold a BS in Information Technology from St. Anthony's College
								and am a Visual Graphics NCIII holder. I graduated with honors
								and took home Best Programmer and Best Capstone awards.
							</p>
						</div>

						<div style={{ paddingTop: '1rem' }}>
							{[
								['Previously', "IT Programmer I @ Provincial Gov't of Antique"],
								[
									'Approach',
									'OOP principles, clean UI, and thorough testing — always.',
								],
								['Open to', 'Freelance projects and remote opportunities.'],
							].map(([k, v], i) => (
								<FadeIn key={k} delay={i * 0.1}>
									<div
										style={{
											borderTop: '1px solid #1e1e1e',
											padding: '1.5rem 0',
										}}>
										<div
											style={{
												fontSize: '0.68rem',
												letterSpacing: '0.18em',
												textTransform: 'uppercase',
												color: '#555',
												marginBottom: '0.5rem',
											}}>
											{k}
										</div>
										<div style={{ fontSize: '0.95rem', color: '#aaa' }}>
											{v}
										</div>
									</div>
								</FadeIn>
							))}
						</div>
					</div>
				</FadeIn>
			</section>

			{/* ── PROJECTS ── */}
			<section
				id="projects"
				style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
				<FadeIn>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: '3rem',
							borderBottom: '1px solid #1e1e1e',
							paddingBottom: '2rem',
						}}>
						<div>
							<Label>002 — Selected Work</Label>
							<h2
								style={{
									fontFamily: "'Playfair Display', Georgia, serif",
									fontSize: 'clamp(2rem, 4vw, 3rem)',
									color: '#f5f0e8',
									margin: '1rem 0 0',
									fontWeight: 700,
								}}>
								Projects
							</h2>
						</div>
						<span
							style={{
								fontSize: '0.75rem',
								color: '#555',
								letterSpacing: '0.1em',
							}}>
							0{PROJECTS.length} total
						</span>
					</div>
				</FadeIn>

				{PROJECTS.map((p, i) => (
					<FadeIn key={p.id} delay={i * 0.08}>
						<div
							style={{
								borderBottom: '1px solid #1e1e1e',
								padding: '2.5rem 0',
							}}>
							{/* Top row */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '80px 1fr auto',
									gap: '2rem',
									alignItems: 'flex-start',
									marginBottom: p.images.length > 0 || p.wip ? '1.5rem' : '0',
								}}>
								<span
									style={{
										fontSize: '0.7rem',
										color: '#444',
										letterSpacing: '0.1em',
										fontFamily: 'monospace',
										paddingTop: '4px',
									}}>
									{p.year}
								</span>
								<div>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '1rem',
											marginBottom: '0.6rem',
											flexWrap: 'wrap',
										}}>
										<span
											style={{
												fontFamily: "'Playfair Display', serif",
												fontSize: '1.3rem',
												color: '#f5f0e8',
											}}>
											{p.title}
										</span>
										{p.wip && (
											<span
												style={{
													fontSize: '0.6rem',
													letterSpacing: '0.12em',
													textTransform: 'uppercase',
													color: '#c8ff00',
													border: '1px solid #c8ff00',
													padding: '2px 8px',
													borderRadius: '2px',
												}}>
												In Progress
											</span>
										)}
										<div
											style={{
												display: 'flex',
												gap: '0.5rem',
												flexWrap: 'wrap',
											}}>
											{p.tags.map((t) => (
												<span
													key={t}
													style={{
														fontSize: '0.65rem',
														letterSpacing: '0.1em',
														textTransform: 'uppercase',
														color: '#555',
														border: '1px solid #222',
														padding: '2px 8px',
														borderRadius: '2px',
													}}>
													{t}
												</span>
											))}
										</div>
									</div>
									<p
										style={{
											fontSize: '0.85rem',
											color: '#666',
											margin: 0,
											lineHeight: 1.7,
										}}>
										{p.desc}
									</p>
								</div>
								<a
									href={p.href}
									target="_blank"
									rel="noopener noreferrer"
									style={{
										fontSize: '1.2rem',
										color: '#333',
										transition: 'color 0.2s',
										textDecoration: 'none',
									}}
									onMouseEnter={(e) => (e.target.style.color = '#c8ff00')}
									onMouseLeave={(e) => (e.target.style.color = '#333')}>
									→
								</a>
							</div>

							{/* Image strip */}
							{p.wip ? (
								<div
									style={{
										marginLeft: 'calc(80px + 2rem)',
										height: '160px',
										border: '1px dashed #222',
										borderRadius: '6px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexDirection: 'column',
										gap: '0.5rem',
										background: '#0a0a0a',
									}}>
									<span style={{ fontSize: '1.5rem' }}>🛰️</span>
									<span
										style={{
											fontSize: '0.7rem',
											letterSpacing: '0.15em',
											textTransform: 'uppercase',
											color: '#444',
										}}>
										Screenshots coming soon
									</span>
								</div>
							) : p.images.length > 0 ? (
								<div
									style={{
										marginLeft: 'calc(80px + 2rem)',
										display: 'flex',
										gap: '0.75rem',
										overflowX: 'auto',
										paddingBottom: '0.5rem',
										scrollbarWidth: 'thin',
										scrollbarColor: '#222 transparent',
									}}>
									{p.images.map((src, idx) => (
										<img
											key={idx}
											src={src}
											alt={`${p.title} screenshot ${idx + 1}`}
											style={{
												height: '160px',
												width: 'auto',
												minWidth: '240px',
												objectFit: 'cover',
												borderRadius: '6px',
												border: '1px solid #1e1e1e',
												flexShrink: 0,
												transition: 'transform 0.2s, border-color 0.2s',
												cursor: 'pointer',
											}}
											onMouseEnter={(e) => {
												e.target.style.transform = 'scale(1.02)';
												e.target.style.borderColor = '#c8ff00';
											}}
											onMouseLeave={(e) => {
												e.target.style.transform = 'scale(1)';
												e.target.style.borderColor = '#1e1e1e';
											}}
										/>
									))}
								</div>
							) : null}
						</div>
					</FadeIn>
				))}
			</section>

			{/* ── STACK ── */}
			<section
				id="stack"
				style={{ padding: '6rem 2rem', background: '#0a0a0a' }}>
				<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
					<FadeIn>
						<Label>003 — Toolbox</Label>
						<h2
							style={{
								fontFamily: "'Playfair Display', Georgia, serif",
								fontSize: 'clamp(2rem, 4vw, 3rem)',
								color: '#f5f0e8',
								margin: '1rem 0 3rem',
								fontWeight: 700,
							}}>
							Skills & Stack
						</h2>
					</FadeIn>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
							gap: '0',
						}}>
						{SKILLS.map((s, i) => (
							<FadeIn key={s.group} delay={i * 0.1}>
								<div
									style={{
										borderTop: '1px solid #1e1e1e',
										borderLeft: i % 2 === 0 ? 'none' : '1px solid #1e1e1e',
										padding: '2rem',
									}}>
									<div
										style={{
											fontSize: '0.68rem',
											letterSpacing: '0.2em',
											textTransform: 'uppercase',
											color: '#c8ff00',
											marginBottom: '1.5rem',
										}}>
										{s.group}
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '0.75rem',
										}}>
										{s.items.map((item) => (
											<span
												key={item}
												style={{
													fontSize: '0.95rem',
													color: '#888',
													display: 'flex',
													alignItems: 'center',
													gap: '0.75rem',
												}}>
												<span
													style={{
														width: '4px',
														height: '4px',
														background: '#333',
														borderRadius: '50%',
														flexShrink: 0,
													}}
												/>
												{item}
											</span>
										))}
									</div>
								</div>
							</FadeIn>
						))}
					</div>
				</div>
			</section>

			{/* ── CONTACT ── */}
			<section
				id="contact"
				style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
				<FadeIn>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '6rem',
							alignItems: 'start',
						}}>
						<div>
							<Label>004 — Get in touch</Label>
							<h2
								style={{
									fontFamily: "'Playfair Display', Georgia, serif",
									fontSize: 'clamp(2.5rem, 5vw, 4rem)',
									lineHeight: 1.05,
									color: '#f5f0e8',
									margin: '1.5rem 0 2rem',
									fontWeight: 700,
								}}>
								Let's build something{' '}
								<span style={{ color: '#c8ff00', fontStyle: 'italic' }}>
									great.
								</span>
							</h2>
							<p
								style={{
									color: '#666',
									lineHeight: 1.8,
									fontSize: '0.9rem',
									marginBottom: '2rem',
								}}>
								Open to freelance projects, full-time opportunities, and
								interesting collaborations. Response time: usually within 24h.
							</p>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.75rem',
								}}>
								{[
									['Email', 'hyacynth.dev@gmail.com'],
									['Phone', '(0965) 116 8472'],
									['GitHub', 'github.com/heyaxenth-dev'],
								].map(([k, v]) => (
									<div
										key={k}
										style={{
											display: 'flex',
											gap: '1.5rem',
											fontSize: '0.85rem',
										}}>
										<span
											style={{ color: '#444', width: '70px', flexShrink: 0 }}>
											{k}
										</span>
										<span style={{ color: '#888' }}>{v}</span>
									</div>
								))}
							</div>
						</div>

						{/* Form */}
						<div>
							{sent ? (
								<div
									style={{
										borderTop: '2px solid #c8ff00',
										paddingTop: '2rem',
									}}>
									<div
										style={{
											fontSize: '0.7rem',
											letterSpacing: '0.2em',
											textTransform: 'uppercase',
											color: '#c8ff00',
											marginBottom: '1rem',
										}}>
										Message sent
									</div>
									<p style={{ color: '#888', fontSize: '0.9rem' }}>
										Thanks! I'll get back to you soon.
									</p>
								</div>
							) : (
								<form
									onSubmit={handleSend}
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1.5rem',
									}}>
									{[
										['name', 'Name'],
										['email', 'Email'],
									].map(([field, label]) => (
										<div key={field}>
											<label
												style={{
													display: 'block',
													fontSize: '0.68rem',
													letterSpacing: '0.15em',
													textTransform: 'uppercase',
													color: '#555',
													marginBottom: '0.5rem',
												}}>
												{label}
											</label>
											<input
												type={field === 'email' ? 'email' : 'text'}
												required
												value={formState[field]}
												onChange={(e) =>
													setFormState({
														...formState,
														[field]: e.target.value,
													})
												}
												style={{
													width: '100%',
													background: 'transparent',
													border: 'none',
													borderBottom: '1px solid #2a2a2a',
													color: '#e8e4dc',
													fontSize: '0.95rem',
													padding: '0.75rem 0',
													outline: 'none',
													fontFamily: 'inherit',
													boxSizing: 'border-box',
													transition: 'border-color 0.2s',
												}}
												onFocus={(e) =>
													(e.target.style.borderBottomColor = '#c8ff00')
												}
												onBlur={(e) =>
													(e.target.style.borderBottomColor = '#2a2a2a')
												}
											/>
										</div>
									))}
									<div>
										<label
											style={{
												display: 'block',
												fontSize: '0.68rem',
												letterSpacing: '0.15em',
												textTransform: 'uppercase',
												color: '#555',
												marginBottom: '0.5rem',
											}}>
											Message
										</label>
										<textarea
											required
											rows={4}
											value={formState.message}
											onChange={(e) =>
												setFormState({ ...formState, message: e.target.value })
											}
											style={{
												width: '100%',
												background: 'transparent',
												border: 'none',
												borderBottom: '1px solid #2a2a2a',
												color: '#e8e4dc',
												fontSize: '0.95rem',
												padding: '0.75rem 0',
												outline: 'none',
												fontFamily: 'inherit',
												resize: 'none',
												boxSizing: 'border-box',
												transition: 'border-color 0.2s',
											}}
											onFocus={(e) =>
												(e.target.style.borderBottomColor = '#c8ff00')
											}
											onBlur={(e) =>
												(e.target.style.borderBottomColor = '#2a2a2a')
											}
										/>
									</div>
									<button
										type="submit"
										style={{
											background: '#c8ff00',
											border: 'none',
											cursor: 'pointer',
											color: '#0d0d0d',
											fontSize: '0.75rem',
											letterSpacing: '0.12em',
											textTransform: 'uppercase',
											fontWeight: '700',
											padding: '14px 28px',
											borderRadius: '2px',
											alignSelf: 'flex-start',
											fontFamily: 'inherit',
											transition: 'opacity 0.2s',
										}}
										onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
										onMouseLeave={(e) => (e.target.style.opacity = '1')}>
										Send message →
									</button>
								</form>
							)}
						</div>
					</div>
				</FadeIn>
			</section>

			{/* ── FOOTER ── */}
			<footer
				style={{
					borderTop: '1px solid #1a1a1a',
					padding: '2rem',
					maxWidth: '1200px',
					margin: '0 auto',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '1rem',
				}}>
				<span
					style={{ fontSize: '0.7rem', color: '#444', letterSpacing: '0.1em' }}>
					© 2025 Hya Cynth Dojillo. All rights reserved.
				</span>
				<span
					style={{ fontSize: '0.7rem', color: '#333', letterSpacing: '0.1em' }}>
					Built with React + Tailwind
				</span>
			</footer>

			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0d0d0d; }
        @keyframes pulse { 0%,100% { opacity:0.3 } 50% { opacity:1 } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hire-btn { display: none !important; }
          .hamburger { display: flex !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
          [style*="grid-template-columns: 80px"] { grid-template-columns: 60px 1fr 24px !important; gap: 1rem !important; }
        }
      `}</style>
		</div>
	);
}

function Label({ children }) {
	return (
		<div
			style={{
				fontSize: '0.68rem',
				letterSpacing: '0.2em',
				textTransform: 'uppercase',
				color: '#555',
				marginBottom: '0.25rem',
			}}>
			{children}
		</div>
	);
}
