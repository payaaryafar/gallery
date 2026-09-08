import {
    images,
    CURRENT_PAGE,
    getApiUrl,
    nextPage,
    load,
    searchInput,
    resetPage,
    searchTerm,
    searchTerm_value,
    lightBox,
    iconClose
} from "./common.js";
import getData from "./fetch.js";


const photos = await getData();
const renderImages = (photos = []) => {
    const allImages = photos.map(img => `
        <li class="images__order"><img src="${img.src.large2x}" alt="${img.alt}" class="images__pics">
        <div class="images__details">
            <div class="photohapher">
                <i class="uil uil-camera"></i>
                <span class = "photohapher1">${img.photographer}</span>
            </div>
            <button class="images__button" data-url="${img.src.large2x}"><i class="uil uil-import"></i></button>
        </div></li> `
    ).join("");
    console.log(allImages);
    images.insertAdjacentHTML("beforeend", allImages)


};

renderImages(photos);

const clickHandler = async () => {
    nextPage();
    const loadPhotos = await getData();
    renderImages(loadPhotos);
};

const inputHandler = async (event) => {
    if (event.key === "Enter") {
        searchTerm_value(event.target.value);
        console.log(searchTerm);
        images.innerHTML = "";
        resetPage();
        const searchImages = await getData(searchTerm);
        renderImages(searchImages);
    }
};

images.addEventListener("click", (event) => {
    const button = event.target.closest(".images__button");
    if (!button) return;
    downloadHandler(button.dataset.url);
});


const downloadHandler = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Download failed");
    }

    const file = await response.blob();
    const fileUrl = URL.createObjectURL(file);
    
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = new Date().getTime();
    a.click();

    URL.revokeObjectURL(fileUrl);
  } catch (error) {
    console.error("Download error:", error.message);
  }
};
load.addEventListener("click", clickHandler);
searchInput.addEventListener("keyup", inputHandler);


images.addEventListener("click", (event) => {
    const card = event.target.closest(".images__order");
    if (!card) return;
    console.log(card);
    

    const image = card.querySelector(".images__pics");
    console.log(image);
    const photographer = card.querySelector(".photohapher1");
    console.log(photographer);
    

    lightBox.querySelector(".lightBox__img").src = image.src;
    lightBox.querySelector(".photohapher1").textContent = photographer.textContent;

    lightBox.classList.add("show");
});

const closeHandler = () =>{
     lightBox.classList.remove("show");
}


iconClose.addEventListener("click",closeHandler);
