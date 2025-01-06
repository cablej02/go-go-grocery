import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
    const developers = [
        { name: 'Mauricio', github: 'https://github.com/mauriciomdlg' },
        { name: 'Nattan', github: 'https://github.com/nattanaguiat' },
        { name: 'Jordan', github: 'https://github.com/JL-Code1' },
        { name: 'Jason', github: 'https://github.com/cablej02' },
    ];

    return (
        <footer className="footer bg-dark py-3">
            <div>
                {developers.map((dev, index) => (
                    <span key={index} className="mx-2">
                        <a
                            href={dev.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-decoration-none"
                        >
                            <FaGithub size={30} />
                        </a>
                    </span>
                ))}
            </div>
        </footer>
    );
};

export default Footer;