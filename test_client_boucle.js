<<<<<<< HEAD
const divApi = document.getElementById('api');

function boucleJson(json) {
      /* divApi.innerHTML = json[0][0]['titre']; */
      /* console.log(json.length); */
      for (let i = 0; i < json.length; i++) {
            for (let ii = 0; ii < json[i].length; ii++) {
                  let inApiDiv = divApi.innerHTML;
                  divApi.innerHTML = inApiDiv + '<a class="apiArt" href="' + json[i][ii]['lien'] + '"><section class="apiArt"><div class="child"><img src="' + json[i][ii]['thumbnail'] + '"></div><div class="child"><h4>' + json[i][ii]['titre'] + '</h4>' + json[i][ii]['date'] + '<hr><p>' + json[i][ii]['description'] + '</p></div></section></a>';
            }
      }
=======
const divApi = document.getElementById('api');

function boucleJson(json) {
      /* divApi.innerHTML = json[0][0]['titre']; */
      /* console.log(json.length); */
      for (let i = 0; i < json.length; i++) {
            for (let ii = 0; ii < json[i].length; ii++) {
                  let inApiDiv = divApi.innerHTML;
                  divApi.innerHTML = inApiDiv + '<a class="apiArt" href="' + json[i][ii]['lien'] + '"><section class="apiArt"><div class="child"><img src="' + json[i][ii]['thumbnail'] + '"></div><div class="child"><h4>' + json[i][ii]['titre'] + '</h4>' + json[i][ii]['date'] + '<hr><p>' + json[i][ii]['description'] + '</p></div></section></a>';
            }
      }
>>>>>>> 0d2758083222a37d5fc191b1e0166770faca75f1
}