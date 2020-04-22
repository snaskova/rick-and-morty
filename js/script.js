//  CREATE CHARACTER CARD
const createCard = e => {
    let name = e.name;
    let image = e.image;
    let species = e.species;
    let origin = e.origin.name;

    var output = ` <div class="card">
                    <img width="100px" height="100px" class="image" src="${image}" alt="Thumbnail image for ${name}">
                    <div class="info">
                        <h3 class="name"><span class="bold">${name}</span></h2>
                        <p class="species">Species: <span class="bold">${species}</span></p>
                        <p class="origin">Origin: <span class="bold">${origin}</span></p>
                    </div>
                </div>`;

    return output;
}

$(function () {

    // GET INFO FOR CHARACTERS 
    const getCharacters = number => {
        $.get(`https://rickandmortyapi.com/api/character/?page=${number}`, resp => {
            let result = "";
            let base = resp.results;
            // console.log(resp);

            base.forEach(e => {
                result += createCard(e);
                $('#content').html(result);
            });
        })
    }

    getCharacters(1);

    // PAGINATION LOGIC
    $('.page-button').click(function (e) {
        let thisButton = $(this).data('id');
        getCharacters(thisButton);

        let $siblings = $(this).siblings();
        console.log();

        if ($(this).hasClass('active')) {
            $siblings.removeClass('active')
        }

    })

    $.get(`https://rickandmortyapi.com/api/location`, resp => {
    })
})