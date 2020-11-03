import { elements } from './base.js';

// <use href="img/icons.svg#icon-heart-outlined"></use>

export const toggleLikeBtn = (isLiked) => {
	const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
	document
		.querySelector('.recipe__love use')
		.setAttribute('href', `img/icons.svg#${iconStr}`);
};

export const toggleLikesMenu = (numLikes) => {
	elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
	const markup = `<li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.img}" alt="Test">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${like.title}...</h4>
                                    <p class="likes__author">${like.publisher}</p>
                                </div>
                            </a>
                        </li>`;

	elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = (id) => {
	document.querySelector(`[href="#${id}"]`).remove();
};
