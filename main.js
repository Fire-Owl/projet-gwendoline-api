fetch('https://accesdenied.net/archives/api-gwendoline/node')
      .then((res) => {
            /* console.log('ok') */
            res.json().then(j => displayJson(j))
      })
      .catch((res) => {
            console.log('erreur de requête')
            console.log(res)
      })

function displayJson(json) {
      console.log(json)
      /* console.log(json[2][0]['titre']) */
      boucleJson(json)
}
