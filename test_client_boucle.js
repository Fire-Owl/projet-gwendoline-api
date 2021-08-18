const divApi = document.getElementById('api');

function boucleJson(json) {
      /* divApi.innerHTML = json[0][0]['titre']; */
      /* console.log(json.length); */
      for (let i = 0; i < json.length; i++) {
            for (let ii = 0; ii < json[i].length; ii++) {
                  let inApiDiv = divApi.innerHTML;
                  divApi.innerHTML = inApiDiv + json[i][ii]['titre'] + '<br>';
            }
      }
}