
class BannerList {

    // Node elements
    bannerList;
    itemsContainer;

    // Variables
    itemLength;
    activeItem;

    constructor (bannerList) {
        this.bannerList = bannerList;

        // Add navigation buttons
        const buttonLeft = document.createElement('button');
        buttonLeft.classList.add('banner-list-btn', 'btn-left');

        const buttonRight = document.createElement('button');
        buttonRight.classList.add('banner-list-btn', 'btn-right');

        this.bannerList.insertBefore(buttonLeft, this.bannerList.firstChild);
        this.bannerList.appendChild(buttonRight);

        this.itemsContainer = this.bannerList.querySelector('.items');

        this.itemLength = this.bannerList.querySelectorAll('.items > div').length;

        this.activeItem = 0;

        // Apply listener on buttons
        buttonRight.addEventListener('click', () => this.moveRight());
        buttonLeft.addEventListener('click', () => this.moveLeft());
    }

    scroll () {
        this.itemsContainer.scroll({
            left: this.itemsContainer.clientWidth * this.activeItem,
            top: 0,
            behavior: 'smooth'
        });
    }

    
    moveLeft () {
        if (this.activeItem === 0) return;
        this.activeItem--;
        this.scroll()

    }

    moveRight () {
        if (this.activeItem === this.itemLength - 1) return;
        this.activeItem++;
        this.scroll()
    }
}


/**
 * Setup all banner list present in the DOM
 */
export const loadBannerLists = () => {
    const bannerLists = document.querySelectorAll('.banner-list');

    for (const bannerList of bannerLists) {
        new BannerList(bannerList)
    }
}