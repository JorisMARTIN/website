import projects from '../assets/data/projects.json';

/**
 * Load projects data from JSON document
 */
export const loadProjects = () => {
    const projectsContainer = document.getElementById('projects');

    for (const project of projects) {
        const section = document.createElement('section');
        section.id = project.name.replace(' ', '-').toLowerCase();

        section.innerHTML = patern
            .replace('%name%', project.name)
            .replace('%description%', project.description)
            .replace('%technologies%', project.technologies.map((tech) => `<li>${tech}</li>`).join(''))
            .replace('%link%', project.link)
            .replace('%imageSrc%', project.image)
            .replace('%imageAlt%', project.name + ' picture');

        projectsContainer.appendChild(section);
    }
}


const patern = `
    <div>
        <h3>%name%</h3>
        <p>%description%</p>
        <ul>%technologies%</ul>
        <a href="%link%" title="En savoir plus" target="_blank"><span>En savoir plus</span></a>
    </div>
    <img src="%imageSrc%" alt="%imageAlt%"/>
`;