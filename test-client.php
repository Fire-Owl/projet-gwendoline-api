<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>test api client</title>
      <link rel="stylesheet" href="style.css">
</head>
<body>
      <h1>API Scraper paralympique</h1>
      <h2>code a utilisé pour utilisé l'API</h2>
      <p>Tout d'abord, il faut un script qui emmet une requête vers l'api:</p>
      <pre class="code">
fetch('http://adrienr.promo-68.codeur.online:3000/')
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
      </pre>
      <p>Ensuite, il faut une fonction (ci dessus nommé boucleJson) qui vient inséré dans le DOM les entrées du tableau précédemment appelé:</p>
      <pre class="code">
const divApi = document.getElementById('api');

function boucleJson(json) {
      /* divApi.innerHTML = json[0][0]['titre']; */
      /* console.log(json.length); */
      for (let i = 0; i &lt; json.length; i++) {
            for (let ii = 0; ii &lt; json[i].length; ii++) {
                  let inApiDiv = divApi.innerHTML;
                  divApi.innerHTML = inApiDiv + '&lt;a class="apiArt" href="' + json[i][ii]['lien'] + '"&gt;&lt;section class="apiArt"&gt;&lt;div class="child"&gt;&lt;img src="' + json[i][ii]['thumbnail'] + '"&gt;&lt;/div&gt;&lt;div class="child"&gt;&lt;h4&gt;' + json[i][ii]['titre'] + '&lt;/h4&gt;' + json[i][ii]['date'] + '&lt;hr&gt;&lt;p&gt;' + json[i][ii]['description'] + '&lt;/p&gt;&lt;/div&gt;&lt;/section&gt;&lt;/a&gt;';
            }
      }
}
      </pre>
      <p>Enfin, une balise html pour que le code généré puisse y être inséré:</p>
      <pre class="code">
&lt;div id="api"&gt;&lt;/div&gt;
      </pre>
      <p>Optionnellement , vous pouvez rajoutez un peut de css : </p>
      <pre class="code">
/* CODE API */

section.apiArt{
      border: 1px solid red;
      display: flex;
      margin: 2rem 0;
}
#api a{
      text-decoration: none;
      color: black;
}
section.apiArt img{
      width: 15rem;
}
section.apiArt .child{
      position: relative;
}
section.apiArt .child:nth-child(2){
      padding: 0 2rem;
}
section.apiArt hr{
      width: 15rem;
      position: absolute;
}
      </pre>
      <h2>notes des développeurs</h2>
      <p>vous pouvez bien sur modifier le css facilement, quand a la structure html, vous pouvez la modifier dans le script, dans la function boucleJson (divApi.innerHTML = inApiDiv + inséré le code html qui construit les cards).</p>
      <h2>résultat attendu</h2>
      <div id="api"></div>
      <script src="test_client_boucle.js"></script>
      <script src="main.js"></script>
</body>
</html>