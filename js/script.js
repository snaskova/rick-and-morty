//  CREATE CHARACTER CARD
const createCard = e => {
    let name = e.name;
    let image = e.image;
    let species = e.species;
    let origin = e.origin.name;
    let id = e.id;


    let output = ` <div class="card js-card" data-id="${id}">
                    <div class="main-info">
                    <img width="100px" height="100px" class="avatar" src="${image}" alt="Thumbnail image for ${name}">
                    <h3 class="name">${name}</h3>
                    </div>
                    <div class="specs">
                        <p class="tag">Species: <span class="tag-info">${species}</span></p>
                        <p class="tag">Origin: <span class="tag-info">${origin}</span></p>
                    </div>
                </div>`;

    return output;
}


// CREATE POPUP WITH ADDITIONAL INFORMATION
const createMoreInfoPopup = e => {
    let name = e.name;
    let status = e.status;
    let species = e.species;
    let avatar = e.image;
    let gender = e.gender;
    let origin = e.origin.name;
    let currentLocation = e.location.name;
    let episodes = {};

    // console.log(status);


    // e.episode.forEach((e, a) => {
    //     let episodeURL = e;
    //     let episodeId = a;

    //     $.get(`${episodeURL}`, e => {
    //         let episodeNumber = e.episode;
    //         let episodeName = e.name;
    //         let airDate = e.air_date;
    //     })
    // });


    let output = `<div class="popup-wrapper card">
                    <div class="main-info">
                        <img class="avatar" src="${avatar}" alt="Thumbnail image of ${name}">
                        <div class="specs">
                            <h3 class="name">${name}</h3>
                            <p class="tag">Species: <span class="tag-info">${species}</span></p>
                            <p class="tag">Gender: <span class="tag-info">${gender}</span></p>
                            <span class="status">${status}</span>
                        </div>
                    </div>
                    <div class="text">
                        <p>${name}’s origin is ${origin}. Last seen at ${currentLocation}.</p>
                        <a href="#/" class="button" id="js-closePopup">Confirm</a>
                    </div>
                </div>`;
    $('body').append(` <div id="popup">${output}</div>`)
    $('#popup').html(output);

    if (status === 'Dead') {
        $('.status').addClass('dead');
    } else if (status === 'unknown') {
        $('.status').addClass('unknown');
    }
}

$(function () {

    // GET INFO FOR CHARACTERS 
    const getCharactersApi = number => {
        $.get(`https://rickandmortyapi.com/api/character/?page=${number}`, resp => {
            let result = "";
            let base = resp.results;

            base.forEach(e => {
                result += createCard(e);
                $('#content').html(result);
            });
        })
    }

    const getCharacterMoreInfo = id => {
        $.ajax({
            url: `https://rickandmortyapi.com/api/character/${id}`,
            success: resp => {
                createMoreInfoPopup(resp);
            }
        });
    }


    //  CLOSE POPUP ON BUTTON CLICK OR OUTSIDE OF POPUP CLICK
    $('body').click(('#js-closePopup'), e => {
        if ($(e.target).attr('id') === 'popup' || $(e.target).attr('id') === 'js-closePopup') {
            $('#popup').remove();
        }
    });

    // OPEN POPUP WITH MORE CHARACTER INFO ON CARD CLICK
    $('#content').on('click', '.js-card', e => {
        let currentId = $(e.currentTarget).data('id');
        fetch(`https://rickandmortyapi.com/api/character/${currentId}`)
            .then(resp => {
                var respJson = resp.json();
                return respJson;
            })
            .then(respJson => {
                createMoreInfoPopup(respJson);
            })
            .then(() => {
                $('#popup').css('display', 'flex');
            })
            .catch(error => {
                // showError();
            })
    });


    // PAGINATION LOGIC
    $('.page-button').click(function (e) {
        $('html,body').animate({ scrollTop: 0 }, 200);

        //  ADD .ACTIVE TO SELECTED PAGE BUTTON
        $(this).parent().addClass('active');

        // SHOW OTHER PAGE RESULTS
        let currentId = $(this).data('id');
        getCharactersApi(currentId);

        // IF OTHER BUTTONS HAVE .ACTIVE, REMOVE IT
        let $siblings = $(this).parent().siblings();

        $siblings.each((e, a) => {
            if ($(a).hasClass('active')) {
                $(a).removeClass('active');
            }
        });

    })


    getCharactersApi(1);
    getCharacterMoreInfo(1);

})