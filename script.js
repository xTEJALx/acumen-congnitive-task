const categoryInput = document.getElementById('category-input');
const searchButton = document.getElementById('search-button');
const galleryContainer = document.getElementById('gallery');

console.log(categoryInput,searchButton,galleryContainer);
searchButton.addEventListener('click', searchPictures);

function searchPictures() {
  const category = categoryInput.value;
  if (category.trim() === '') {
    return;
  }

  clearGallery();

  const accessKey = 'V-_9dU_nH3cCw43cczvOco2Iqsvbg7Z9sDYDgyU-Obc';
  const apiUrl = `https://api.unsplash.com/search/photos?query=${category}&client_id=${accessKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayPictures(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayPictures(pictures) {
  pictures.forEach(picture => {
    const pictureCard = createPictureCard(picture);
    const card = document.createElement('card');
    
    card.appendChild(pictureCard);
    card.classList.add("col-sm-12");
    card.classList.add("col-lg-3");
    card.classList.add("col-md-6");
    galleryContainer.appendChild(card);
  });
}

function createPictureCard(picture) {
  const pictureCard = document.createElement('div');
  pictureCard.classList.add('picture-card');

  const image = document.createElement('img');
  image.src = picture.urls.regular;
  pictureCard.appendChild(image);

  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = `By: ${picture.user.name}`;
  pictureCard.appendChild(author);

  const description = document.createElement('div');
  description.classList.add('description');
  description.textContent = picture.description || 'No description available';
  pictureCard.appendChild(description);

  const link = document.createElement('a');
  link.classList.add('link');
  link.textContent = 'View on Unsplash';
  link.href = picture.links.html;
  link.target = '_blank';
  pictureCard.appendChild(link);

  return pictureCard;
}

function clearGallery() {
  galleryContainer.innerHTML = '';
}
