$(document).ready(function() {
    "use strict";

    // UTILITY
    function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
    }
    // END UTILITY

    // COMMANDS
    function clear() {
            terminal.text("");
    }

    function help() {
            terminal.append("Me puedes encontrar en https://www.linkedin.com/in/aitoralejandro\n");
    }

    function echo(args) {
            var str = args.join(" ");
            terminal.append(str + "\n");
    }
    // END COMMANDS

    var title = $(".title");
    var terminal = $(".terminal");
    var prompt = "➜";
    var path = "~";

    var commandHistory = [];
    var historyIndex = 0;

    var command = "";
    var commands = [{
                    "name": "clear",
                    "function": clear
            }, {
                    "name": "help",
                    "function": help
            }, {
                    "name": "echo",
                    "function": echo
            }];
    var goodbye = "\nHola [nombre],\n\nComo ya sabrás, dejaré mi puesto como programdor Frontend en Accenture, y mi último día es el 30 de julio de 2018.\n\nAunque estoy entusiasmado con la nueva oportunidad, también hay una parte de mí que está triste por decir adiós a compañer@s increíbles como tú. Han sido muchas lágrimas y muchas risas que hemos sufrido y disfrutado trabajando juntos, y por encima de eso, con lo que me quedo es la amistad demostrada en todo este tiempo.\n\nDurante estos años he aprendido muchísimo de ti, a veces incluso he aprendido hasta cómo no hacer las cosas (jeje), y si esto es minimamente recíproco, me sentiré muy orgulloso.\n\nPero definitivamente no es el final de nuestra amistad. Tienes mi contacto -escribiendo help en esta consola-, así que no dudes en contactar y tomamos un café, cerveza o almuerzo.\n\nHa sido genial trabajar juntos.\n\nPeace & Love,\n   Aitor Alejandro";

function processCommand() {
    var isValid = false;

    var args = command.split(" ");
    var cmd = args[0];
    args.shift();

    // Buscar si es uno de los comandos establecidos
    for (var i = 0; i < commands.length; i++) {
            if (cmd === commands[i].name) {
                    commands[i].function(args);
                    isValid = true;
                    break;
            }
    }

    // sin coincidencias
    if (!isValid) {
            terminal.append(goodbye.replace('[nombre]', command) + "\n");
    }

    commandHistory.push(command);
    historyIndex = commandHistory.length;
    command = "";
}

function displayPrompt() {
    terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
    terminal.append("<span class=\"path\">" + path + "</span> ");
}

function erase(n) {
    command = command.slice(0, -n);
    terminal.html(terminal.html().slice(0, -n));
}

function clearCommand() {
    if (command.length > 0) {
            erase(command.length);
    }
}

function appendCommand(str) {
    terminal.append(str);
    command += str;
}


$(document).keydown(function(e) {
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // BACKSPACE
    if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
            if (command !== "") {
                    erase(1);
            }
    }

    // UP or DOWN
    if (keyCode === 38 || keyCode === 40) {
            if (keyCode === 38) {
                    // UP
                    historyIndex--;
                    if (historyIndex < 0) {
                            historyIndex++;
                    }
            } else if (keyCode === 40) {
                    // DOWN
                    historyIndex++;
                    if (historyIndex > commandHistory.length - 1) {
                            historyIndex--;
                    }
            }

            var cmd = commandHistory[historyIndex];
            if (cmd !== undefined) {
                    clearCommand();
                    appendCommand(cmd);
            }
    }
});

$(document).keypress(function(e) {
    e = e || window.event;
    var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

    // tecla pulsada ??
    switch (keyCode) {
            // ENTER
            case 13:
                    {
                            terminal.append("\n");

                            processCommand();
                            displayPrompt();
                            break;
                    }
            default:
                    {
                            appendCommand(String.fromCharCode(keyCode));
                    }
    }
});

// Título de la ventana
title.text("");
terminal.append("Escribe tu nombre:\n");
displayPrompt();
});