const divApi = document.getElementById('api');
let inApiDiv = divApi.value;

function boucleJson(json) {
      /* divApi.innerHTML = json[0][0]['titre']; */
      /* console.log(json.length); */
      for (let i = 0; i < json.length; i++) {
            console.log(i);
            divApi.innerHTML = inApiDiv + json[i][0]['titre'];
      }
}