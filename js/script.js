//  CREATE CHARACTER CARD
const createCard = e => {
    let name = e.name;
    let image = e.image;
    let species = e.species;
    let origin = e.origin.name;

    var output = ` <div class="card">
                    <div class="main-info">
                    <img width="100px" height="100px" class="avatar" src="${image}" alt="Thumbnail image for ${name}">
                    <h3 class="name"><span class="bold">${name}</span></h3>
                    </div>
                    <div class="info">
                        <p class="tag">Species: <span class="tag-info">${species}</span></p>
                        <p class="tag">Origin: <span class="tag-info">${origin}</span></p>
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

        //  ADD .ACTIVE TO SELECTED PAGE BUTTON
        $(this).parent().addClass('active');

        // SHOW OTHER PAGE RESULTS
        let currentId = $(this).data('id');
        getCharacters(currentId);

        // IF OTHER BUTTONS HAVE .ACTIVE, REMOVE IT
        let $siblings = $(this).parent().siblings();

        $siblings.each((e, a) => {
            if ($(a).hasClass('active')) {
                $(a).removeClass('active');
            }
        });

    })

    $.get(`https://rickandmortyapi.com/api/location`, resp => {
    })
})