(function(){
    const menu = document.getElementById('dropMenu');

    const GAMES = {
        "Tic-Tac-Toe": "port-games/tictactoe/index.js"
    }

    const drop = document.createElement('li');
    drop.classList = "nav-item dropdown";

    const nameDrop = document.createElement('a');
    nameDrop.classList = "nav-link dropdown-toggle";
    nameDrop.href = "javascript:void(0);";
    nameDrop.id = "navbarDropdown";
    nameDrop.role = "button";
    nameDrop["data-toggle"] = "dropdown";
    nameDrop["aria-haspopup"] = "true";
    nameDrop["aria-expanded"] = "false";
    nameDrop.innerHTML = "Games";

    const dropMenu = document.createElement('div');
    dropMenu.className = "dropdown-menu";
    dropMenu["aria-labelledby"] = "navbarDropdown";

    const gkeys = Object.keys(GAMES);
    gkeys.map(key =>{
        const item = document.createElement('a');
        item.className = "dropdown-item";
        item.href = "javascript:void(0);";
        item.onclick = `goTo(${GAMES[key]})`;
        item.innerHTML = key;

        dropMenu.appendChild(item);
    });

    drop.appendChild(nameDrop);
    drop.appendChild(dropMenu);

    menu.appendChild(drop);
})();