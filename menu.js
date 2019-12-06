(function(){
    const menu = document.getElementById('dropMenu');

    const prefix = "port-games/";

    const GAMES = {
        "Tic-Tac-Toe": "tictactoe/"
    }

    const drop = document.createElement('li');
    drop.classList = "nav-item dropdown";

    const nameDrop = document.createElement('a');
    nameDrop.classList = "nav-link dropdown-toggle";
    nameDrop.href = "javascript:void(0);";
    nameDrop.id = "navbarDropdown";
    nameDrop.setAttribute("role", "button");
    nameDrop.setAttribute("data-toggle", "dropdown");
    nameDrop.setAttribute("aria-haspopup", "true");
    nameDrop.setAttribute("aria-expanded", "false");
    nameDrop.innerHTML = "Games";

    const dropMenu = document.createElement('div');
    dropMenu.className = "dropdown-menu";
    dropMenu["aria-labelledby"] = "navbarDropdown";

    const gkeys = Object.keys(GAMES);
    gkeys.map(key =>{
        const item = document.createElement('a');
        item.className = "dropdown-item";
        item.href = "javascript:void(0);";
        item.setAttribute("onclick", `goTo("${prefix+GAMES[key]}")`);
        item.innerHTML = key;

        dropMenu.appendChild(item);
    });

    drop.appendChild(nameDrop);
    drop.appendChild(dropMenu);

    menu.appendChild(drop);
})();