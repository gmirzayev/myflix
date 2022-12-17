# MYFLIX
<a href="https://myflix.onrender.com">Live site for Myflix</a>

# Introduction
Myflix is a clone of the popular streaming site Netflix. Myflix users can sign up for account, create profiles, and view a library of shows and movies. Each profile that is created can like and save their own favorite content for a better viewing experience.

To build this clone, the following technologies were used:

* Languages: Ruby, Javascript, HTML, and CSS.
* Backend API: Ruby on Rails
* Frontend framework: React
* Database: PostgreSQL

# Profiles (Create, read, update, delete)

Profiles allow a user to share their Myflix account. Up to 5 profiles can be created that each have their own set of liked content and saved content. 
Each profile has a different name and also a picture. 

# Content

The main draw of Myflix is the library of media content. Content can be a tv show or movie with a picture for display on the video index page.
Content images and videos are uploaded and stored in AWS. 

<img src="https://github.com/gmirzayev/myflix/blob/b1b8930df226a858e208c63b10f9d65d04e675ef/frontend/src/assets/Screen%20Recording%202022-12-16%20at%207.45.01%20PM.gif">

The content is on a slider that has multiple index positions controlled by the below javascript. 

```js 
    const handleSlideClick = (e) => {
        let slider;
        let direction;

        if(e.target.classList.contains("slide-left")) {
            slider = e.target.nextElementSibling;
            direction = "left";
        } else {
            slider = e.target.previousElementSibling;
            direction = "right";
        }
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
        const itemsShown = parseInt(getComputedStyle(slider).getPropertyValue("--items-shown"))
        const timesToShift = Math.floor(row.length/itemsShown);
        if(direction === "left") {
            if (sliderIndex - 1 < 0) {
                slider.style.setProperty("--slider-index", timesToShift - 1)
            } else {
                slider.style.setProperty("--slider-index", sliderIndex - 1)
            }
        } else {
            if (sliderIndex + 1 >= timesToShift) {
            slider.style.setProperty("--slider-index", 0)
            } else {
            slider.style.setProperty("--slider-index", sliderIndex + 1)
            }
        }
    }
```

# Likes / Saves

Under their own profile, a user can like and/or save content. Liking content will filter their index page to curate to their preferences. This is a work in progress. After saving content, the user can visit their My List page and see their saved content.

<img src="https://github.com/gmirzayev/myflix/blob/b1b8930df226a858e208c63b10f9d65d04e675ef/frontend/src/assets/Screen%20Recording%202022-12-16%20at%207.46.16%20PM.gif">

# Modal Preview

A modal is used to show a preview of info on content hover. The positioning of the modal was done with vanilla javascript and the content data was passed through a redux action creater.

```js
    const handleOpenModal = () => {
        dispatch(removeModal());
        dispatch(receiveModal(content));
        const modal = document.getElementById('test-modal');
        modal.style.display = "block";
        const item = document.getElementById(`${content.id}-item`);
        let position;
        if(item) {
            position = item.getBoundingClientRect();
        }
        modal.style.top = `${position.top + window.scrollY - 50}px`;
        modal.style.left = `${position.left - 20}px`;
        if(position.left < 50) {
            // modal.style.left = `${position.left + 30}px`;
            modal.style.marginLeft = "5%";
            modal.style.marginRight = "0";
        } 
        else if(window.innerWidth - position.right < 100) {
            // modal.style.marginLeft = "0";
            // modal.style.marginRight = "50%";
            modal.style.left = `${position.left - 110}px`;
        } else {
            modal.style.marginLeft = "0";
            modal.style.marginRight = "0";
        }
    }
```
