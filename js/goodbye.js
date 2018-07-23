/// <reference path="jquery.min.js"/>

$(document).ready(function () {
    "use strict";

    var __window__ = $('.window'),
        user_input = $('.user-input'),
        user_name = $('#name'),
        user_dale = $('#dale'),
        title = $(".title"),
        terminal = $(".terminal"),
        prompt = "➜",
        path = "~",
        goodbye = "\nHola [nombre],\n\nComo ya sabrás, dejaré mi puesto como programdor Frontend en Accenture, y mi último día es el 30 de julio de 2018.\n\nAunque estoy entusiasmado con la nueva oportunidad, también hay una parte de mí que está triste por decir adiós a compañer@s increíbles como tú. Han sido muchas lágrimas y muchas risas que hemos sufrido y disfrutado trabajando juntos, y por encima de eso, con lo que me quedo es la amistad demostrada en todo este tiempo.\n\nDurante estos años he aprendido muchísimo de ti, a veces incluso he aprendido hasta cómo no hacer las cosas (jeje), y si esto es minimamente recíproco, me sentiré muy orgulloso.\n\nPero definitivamente no es el final de nuestra amistad. Tienes mi contacto, así que no dudes en contactar y tomamos un café, cerveza o almuerzo.\n\nHa sido genial trabajar juntos.\n\nPeace & Love,\n   Aitor Alejandro";

    function displayPrompt() {
        terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
        terminal.append("<span class=\"path\">" + path + "</span> ");
    }

    function displayLetter(name) {
        if (name) {
            user_input.addClass('hide');
            __window__.removeClass('hide').addClass('bounceInAnim');
            var goodbyeWithName = goodbye.replace('[nombre]', name);
            terminal.append(goodbyeWithName + "\n");
        }
    }

    user_dale.on('click', function () {
        displayLetter(user_name.val());
    });

    // Título de la ventana
    title.text("Goodbye Folks");
    displayPrompt();
});
