const divApi = document.getElementById('api');

function boucleJson(json) {
      divApi.innerHTML = json[0][0]['titre'];
}