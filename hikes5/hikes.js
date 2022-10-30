// import hikeList Data
import { hikeList  } from '../data/hikeList.js';
import Comment from './comments.js';

// img src
const imgBasePath = '//byui-cit.github.io/cit261/examples/';

export default class Hikes {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.comment = new Comment("hike");
    // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
    this.backButton = this.buildBackButton();
  }
    
  getAllHikes() {
    return hikeList;
  }
  // For the first stretch we will need to get just one hike.
  getHikeByName(hikeName) {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }

  // show one hike with full details in the parentElement
  showOneHike(hikeName) {
      const hike = this.getHikeByName(hikeName);
      this.parentElement.innerHTML = '';
      this.parentElement.appendChild(renderOneHikeFull(hike));
      this.comment.showCommentByHike(hikeName);
      // show the back button
      this.backButton.classList.remove('hidden');
    }

  //show a list of hikes in the parentElement
  showHikeList() {
    this.parentElement.innerHTML = '';
    // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
    renderHikeList(this.parentElement, this.getAllHikes());
    this.addHikeListener();
    // make sure the back button is hidden
    this.backButton.classList.add('hidden');
  }

  // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  addHikeListener() {
    // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.addEventListener('click', e => {
        // why currentTarget instead of target?
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
  }
  buildBackButton() {
    const backButton = document.createElement('button');
    backButton.innerHTML = '&lt;- All Hikes';
    backButton.addEventListener('click', () => {
      this.showHikeList();
    });
    backButton.classList.add('touchEend');
    this.parentElement.before(backButton);
    return backButton;
  }
}


// End of Hikes class
// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHikeLight(hike));
  });
}
function renderOneHikeLight(hike) {
  const item = document.createElement('li');
  item.classList.add('light');
  // setting this to make getting the details for a specific hike easier later.
  item.setAttribute('data-name', hike.name);
  item.innerHTML = ` 
        <h2>${hike.name}</h2>
        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
        </div>`;

  return item;
}
function renderOneHikeFull(hike) {
  const item = document.createElement('li');
  item.innerHTML = ` 
    
        <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        <h2>${hike.name}</h2>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
        </div>
        <div>
            <h3>How to get there</h3>
            <p>${hike.directions}</p>
        </div>
    `;
  return item;
}
