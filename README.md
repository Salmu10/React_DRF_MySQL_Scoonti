<h1>SCOONTI</h1>

<p style="text-align: justify">Bienvenidos a SCOONTI.<br>
  
Un proyecto realizado por el alumno <a href="https://github.com/Salmu10">Salva Muñoz Úbeda</a> en el 2do curso de DAW en el <a href="https://portal.edu.gva.es/iestacio/">IES L'estació</a>.<br>
  
Este proyecto trata sobre una aplicación web de alquiler de patinetes eléctricos para una ciudad, con sus respectibas estaciones y patinetes.</p>
<hr>
  
<h2>FUNCIONES</h2>
 
<p>La web contiene un total de 5 secciones.<p>
  
<h3>Home</h3>
<p>En la sección del Home, el usuario tiene su primera impresión de la web, el cual puede observar el mapa de las estaciones para saber donde se encuentran estas.</p>

<h3>Login</h3>
<p>La aplicación web, consta también, de un módulo de login donde el usuario puede crear una cuenta, e iniciar sesión con ella. Consta además, de una sección de perfil, donde el usuario puede diferente información personal, junto con el patinete que tiene alquilado en ese momento, si es que aún no lo ha devuelto, y también notificaciones sobre las incidencias que ha creado el propio usuario. Si tiene un patinete en ese momento alquilado, podrá crear una incidencia sobre este. Además, también hay una función de administrador, donde, cuando el que ha iniciado sesión es un administrador, puede realizar distintas funcionalidades adicionales, como crear estaciones, patinetes, además de información sobre los usuarios, los alquileres y las incidencias, sobre estas últimas podrá actualizar su estado.</p>
<ul>
  <li>Register</li>
  <li>Login</li>
  <li>Profile</li>
  <li>Dashboard</li>
</ul>
<p>Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay un usuario conectado y además va comprobando el tiempo de la sesión.</p>
 
<h3>Rent</h3>
<p>Este es el módulo más importante de toda la web, en el se puede ver la lista de las estaciones en las que el usuario puede alquilar o devolver un patinete y al diriguirse a ella, se puede ver una lista de todos los slots donde puede dejar o recoger un patinete, habrá slots llenos, vacios o incluso en mantenimiento. Si el usuario alquila un patinete, no podrá alquilar otro hasta que lo devuelba. También, podrá crear una incidencia sobre un slot si es que así lo desea.</p>
<ul>
  <li>Lista de estaciones</li>
  <li>Lista de slots</li>
  <li>Reserva del patinete</li>
  <li>Incidencias</li>
</ul>

<hr>

<h2>PUESTA EN MARCHA</h2>

<h3>BACKEND</h3>
<p>El lenguaje servidor de este proyecto es django.</p>
<p>Consta también de un fichero dummys.py.</p>
<ol>
    <li>cd backend</li>
    <li>pipenv install</li>
    <li>pipenv run python ./manage.py migrate</li>
    <li>pipenv run python ./dummys.py  (Opcional, creación de dummys )</li>
    <li>pipenv run python ./manage.py runserver 0.0.0.0:8000</li>
</ol>

<h3>FRONTEND</h3>
<p>El lenguaje frontend de este proyecto es react.</p>
<ol>
  <li>cd frontend</li>
  <li>npm install</li>
  <li>npm run start</li>
</ol>

<hr>

<h2>LIBRERÍAS</h2>

<p>Lista de librerías utilizadas en este proyecto:</p>

<ul>
  <li><a href="https://www.npmjs.com/package/react-toastify">Toastr</a></li>
  <li><a href="https://fontawesome.com/">Font Awesome</a></li>
  <li><a href="https://avatars.dicebear.com/">DiceBear Avatars</a></li>
  <li><a href="https://www.mapbox.com/">MapBox</a></li>
  <li><a href="https://headlessui.com/">HeadlessUI</a></li>
</ul>