import projects from '../assets/data/projects.json';

/**
 * Load projects data from JSON document
 */
export const loadProjects = () => {
    const projectsBannerListItemsContainer = document.querySelector('#projects .banner-list > .items');

    for (const project of projects) {
        const div = document.createElement('div');

        div.innerHTML = patern
            .replace('%name%', project.name.replace('\\n', '<br/>'))
            .replace('%description%', project.description.replace('\\n', '<br/>'))
            .replace('%technologies%', project.technologies.map((tech) => tech).join(' / '))
            .replace('%link%', project.link)
            .replace('%imageSrc%', project.image)
            .replace('%imageAlt%', project.name + ' picture'); 

        if (!project.link) {
            const node = div.querySelector('a.custom-link');
            div.removeChild(node);
        }

        if (!project.image) {
            const node = div.querySelector('img');
            div.removeChild(node);
        }
        
        projectsBannerListItemsContainer.appendChild(div);
    }
}

const patern = `
    <span>%name%</span>
    <img src="%imageSrc%" alt="%imageAlt%" title="%imageTitle"/>
    <p>%description%</p>
    <p>%technologies%</p>
    <a class="custom-link" href="%link%" title="En savoir plus" target="_blank"><span>En savoir plus</span></a>
`;