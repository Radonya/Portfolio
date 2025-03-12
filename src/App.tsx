import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMoon, FiSun } from 'react-icons/fi';
import { FaReact, FaPython, FaNetworkWired, FaDocker, FaNodeJs, FaAws, FaDatabase, FaTools, FaWhatsapp, FaGraduationCap, FaBriefcase, FaLaptopCode, FaSchool } from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiMysql, SiGrafana, SiPrometheus, SiTailwindcss, SiTypescript } from 'react-icons/si';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
            aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
        >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
        </button>
    );
};

const Button = ({ primary, children, href, className = '' }) => {
    return (
        <motion.a
            whileHover={{ scale: 1.05 }}
            className={`${primary
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:shadow-xl'
                : 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'} 
        px-4 sm:px-8 py-3 rounded-lg transition ${className}`}
            href={href}
        >
            {children}
        </motion.a>
    );
};

const SectionTitle = ({ children }) => {
    return (
        <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
            {children}
        </motion.h2>
    );
};

const AnimatedText = ({ text, className = '' }) => {
    return (
        <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
          <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className="inline-block"
          >
              {char === ' ' ? '\u00A0' : char}
          </motion.span>
      ))}
    </span>
    );
};

const SkillCard = ({ category }) => {
    const iconMap = {
        React: <FaReact />,
        Python: <FaPython />,
        "Node.js": <FaNodeJs />,
        Docker: <FaDocker />,
        AWS: <FaAws />,
        "Spring Boot": <SiSpringboot />,
        MongoDB: <SiMongodb />,
        MySQL: <SiMysql />,
        Grafana: <SiGrafana />,
        Prometheus: <SiPrometheus />,
        TypeScript: <SiTypescript />,
        Tailwind: <SiTailwindcss />,
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
            </h3>

            <div className="space-y-4">
                {category.skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3"
                    >
                        <div className="text-lg sm:text-xl text-blue-500 dark:text-blue-400">
                            {iconMap[skill.name] || <FaTools />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-1">
                                <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full ${skill.color} rounded-full`}
                                ></motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const QRCodeCard = ({ title, icon, qrCodeUrl, profileUrl }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
        >
            <div className="p-4 sm:p-6 flex flex-col items-center">
                <div className="text-2xl sm:text-3xl text-blue-500 dark:text-blue-400 mb-3">
                    {icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h3>
                <div className="w-full bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg mb-4">
                    <img
                        src={qrCodeUrl}
                        alt={`QR Code pour ${title}`}
                        className="w-full h-auto"
                    />
                </div>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition w-full text-center"
                >
                    Visiter le profil
                </motion.a>
            </div>
        </motion.div>
    );
};

const ContactSection = () => {
    const qrCodes = [
        {
            title: "LinkedIn",
            icon: <FiLinkedin />,
            qrCodeUrl: "/LinkDin.png",
            profileUrl: "https://linkedin.com/in/radoniaina-andrianandrasana-083930247"
        },
        {
            title: "GitHub",
            icon: <FiGithub />,
            qrCodeUrl: "/Git.png",
            profileUrl: "https://github.com/Radonya"
        },
        {
            title: "WhatsApp",
            icon: <FaWhatsapp />,
            qrCodeUrl: "/Whatsaap.png",
            profileUrl: "https://wa.me/0343906456"
        },
        {
            title: "Email",
            icon: <FiMail />,
            qrCodeUrl: "/Mail.png",
            profileUrl: "mailto:arradoniaina1@gmail.com"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <section id="contact" className="py-16 sm:py-20 bg-gray-900 dark:bg-gray-950 text-white px-4 sm:px-6 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Restons Connectés</h2>
                    <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12">Scannez ces codes QR pour me retrouver sur les réseaux sociaux ou me contacter</p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {qrCodes.map((qrCode, index) => (
                            <QRCodeCard
                                key={index}
                                title={qrCode.title}
                                icon={qrCode.icon}
                                qrCodeUrl={qrCode.qrCodeUrl}
                                profileUrl={qrCode.profileUrl}
                            />
                        ))}
                    </motion.div>

                    <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-700">
                        <p className="mt-6 sm:mt-8 text-gray-400 text-sm sm:text-base">
                            © {new Date().getFullYear()} Radoniaina Andrianandrasana. Tous droits réservés.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ProjectCategoryTabs = ({ activeCategory, setActiveCategory }) => {
    const categories = [
        { id: 'all', label: 'Tous', icon: <FaLaptopCode /> },
        { id: 'personal', label: 'Personnels', icon: <FaLaptopCode /> },
        { id: 'academic', label: 'Académiques', icon: <FaSchool /> },
        { id: 'professional', label: 'Professionnels', icon: <FaBriefcase /> }
    ];

    return (
        <div className="flex flex-wrap justify-center mb-8 sm:mb-12">
            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 m-1 sm:m-2 rounded-full transition ${
                        activeCategory === category.id
                            ? 'bg-blue-600 dark:bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                </motion.button>
            ))}
        </div>
    );
};

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeProjectCategory, setActiveProjectCategory] = useState('all');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const projects = {
        personal: [
            {
                title: "Portfolio Personnel",
                description: "Site web personnel avec React et Tailwind CSS",
                tech: ["React", "Tailwind CSS", "Framer Motion"],
                image: "https://source.unsplash.com/random/800x600?website"
            },
            {
                title: "Application de Budgétisation",
                description: "Application de suivi de budget personnel avec tableau de bord",
                tech: ["React", "Node.js", "MongoDB", "Chart.js"],
                image: "https://source.unsplash.com/random/800x600?finance"
            }
        ],
        academic: [
            {
                title: "Projet Fin d'Études",
                description: "Système de monitoring pour la sécurité des réseaux",
                tech: ["Python", "Grafana", "Prometheus", "SNMP"],
                image: "https://source.unsplash.com/random/800x600?security"
            },
            {
                title: "Plateforme E-learning",
                description: "Plateforme collaborative pour les étudiants",
                tech: ["React", "Spring Boot", "MySQL"],
                image: "https://source.unsplash.com/random/800x600?education"
            }
        ],
        professional: [
            {
                title: "Plateforme E-commerce",
                description: "Développement fullstack d'une marketplace avec paiement en ligne",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "https://source.unsplash.com/random/800x600?ecommerce"
            },
            {
                title: "Surveillance Réseau",
                description: "Solution de monitoring réseau temps réel avec alertes",
                tech: ["Python", "SNMP", "Grafana", "Prometheus"],
                image: "https://source.unsplash.com/random/800x600?network"
            },
            {
                title: "Gestion Parc Informatique",
                description: "Application de gestion des équipements IT avec inventaire",
                tech: ["Java", "Spring Boot", "React", "MySQL"],
                image: "https://source.unsplash.com/random/800x600?server"
            }
        ]
    };

    const filteredProjects = activeProjectCategory === 'all'
        ? [...projects.personal, ...projects.academic, ...projects.professional]
        : projects[activeProjectCategory];



    const skillCategories = [
        {
            name: "Frontend",
            icon: <FaReact className="text-blue-500" size={20} />,
            skills: [
                { name: "React JS", level: 85, color: "bg-blue-500" },
                { name: "Vue JS", level: 85, color: "bg-blue-500" },
                { name: "TypeScript", level: 70, color: "bg-blue-400" },
                { name: "Tailwind", level: 70, color: "bg-blue-600" }
            ]
        },
        {
            name: "Backend",
            icon: <FaNodeJs className="text-green-500" size={20} />,
            skills: [
                { name: "Node.js", level: 75, color: "bg-green-500" },
                { name: "Python", level: 80, color: "bg-green-600" },
                { name: "Spring Boot", level: 65, color: "bg-green-400" }
            ]
        },
        {
            name: "ORM",
            icon: <FaNodeJs className="text-green-500" size={20} />,
            skills: [
                { name: "Squelize", level: 75, color: "bg-green-500" },
                { name: "Hibernate", level: 80, color: "bg-green-600" }

            ]
        },
        {
            name: "Mobile",
            icon: <FaNodeJs className="text-green-500" size={20} />,
            skills: [

                { name: "React Native", level: 80, color: "bg-green-600" },
                { name: "Flutter", level: 65, color: "bg-green-400" }
            ]
        },
        // {
        //     name: "Infrastructure",
        //     icon: <FaNetworkWired className="text-purple-500" size={20} />,
        //     skills: [
        //         { name: "Docker", level: 70, color: "bg-purple-500" },
        //         { name: "AWS", level: 65, color: "bg-purple-600" },
        //         { name: "Prometheus", level: 75, color: "bg-purple-400" }
        //     ]
        // },
        {
            name: "Base de données",
            icon: <FaDatabase className="text-indigo-500" size={20} />,
            skills: [
                { name: "PostgreSQL", level: 80, color: "bg-indigo-500" },
                { name: "MySQL", level: 75, color: "bg-indigo-600" }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300 overflow-x-hidden">
            <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <motion.h1
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate"
                    >
                        Radoniaina Andrianandrasana
                    </motion.h1>

                    <div className="flex items-center">
                        <div className="hidden md:flex space-x-6 lg:space-x-8 mr-6">
                            <a href="#home"
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Accueil</a>
                            <a href="#education"
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Formation</a>
                            <a href="#skills"
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compétences</a>
                            <a href="#projects"
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projets</a>
                            <a href="#contact"
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                        </div>

                        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

                        <div className="md:hidden ml-4">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 dark:text-gray-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div
                        className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 fixed inset-0 z-50 flex flex-col justify-start pt-20">
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <div className="flex flex-col space-y-6 text-center text-xl bg-white">
                            <a href="#home"
                               onClick={() => setMobileMenuOpen(false)}
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Accueil</a>
                            <a href="#education"
                               onClick={() => setMobileMenuOpen(false)}
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Formation</a>
                            <a href="#skills"
                               onClick={() => setMobileMenuOpen(false)}
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Compétences</a>
                            <a href="#projects"
                               onClick={() => setMobileMenuOpen(false)}
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Projets</a>
                            <a href="#contact"
                               onClick={() => setMobileMenuOpen(false)}
                               className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2">Contact</a>
                        </div>
                    </div>
                )}
            </nav>

            <section id="home" className="relative  flex items-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 opacity-10"></div>
                <div className="container mx-auto relative z-10 max-w-6xl">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="flex flex-col md:flex-row items-center justify-between"
                    >
                        <div className="max-w-xl w-full order-2 md:order-1">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                                <AnimatedText text="Développeur Fullstack &"/>
                                <br/>
                                <span
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    <AnimatedText text="Débutant en Réseaux"/>
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                                <AnimatedText
                                    text="Je construis des applications web performantes et des infrastructures réseau sécurisées"/>
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                                <Button primary href="#contact">Contactez-moi</Button>
                                <Button href="#projects">Voir les projets</Button>
                            </div>
                        </div>

                        <motion.div
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.5, delay: 0.3}}
                            className="mt-10 md:mt-0 order-1 md:order-2 mb-8 md:mb-0"
                        >
                            <div
                                className="relative w-64 h-64 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                                <img
                                    src="/Profile.png"
                                    className="w-full h-full object-cover"
                                    alt="Radoniaina Andrianandrasana"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section id="projects"
                     className="py-16 sm:py-20 px-4 sm:px-6 dark:bg-gray-800 transition-colors duration-300">
                <div className="container mx-auto max-w-6xl">
                    <SectionTitle>Mes Projets</SectionTitle>

                    <ProjectCategoryTabs
                        activeCategory={activeProjectCategory}
                        setActiveCategory={setActiveProjectCategory}
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={index} project={project}/>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section id="skills"
                     className="py-16 sm:py-20 bg-white dark:bg-gray-900 px-4 sm:px-6 transition-colors duration-300">
                <div className="container mx-auto max-w-6xl">
                    <SectionTitle>Mes Compétences</SectionTitle>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                    >
                        {skillCategories.map((category, index) => (
                            <SkillCard key={index} category={category}/>
                        ))}
                    </motion.div>
                </div>
            </section>


            <ContactSection/>

            {/* Fermeture de la div principale */}
        </div>
    );
}