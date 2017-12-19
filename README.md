# alfred-front
## Sobre 
Trata-se uma aplicação web para auxiliar no gerenciamento do  [alfred-api](https://github.com/jonathan-sh/alfred-front).
### Requisitos
  - nodejs 5^
  ou
  - docker
 
### Node
Instalando
```sh
npm install
```
Iniciando
```sh
npm start
```
### Docker
Criando image
```sh
docker build -t alfred-front:1.0
```
Criando e inicando container
```sh
docker run --name alfred-front -p 3000:3000 alfred-front:1.0
```
Parando container
```sh
docker container stop $(docker ps -aq  --filter ancestor=alfred-front:1.0)
```
Removendo container
```sh
docker container rm $(docker ps -aq  --filter ancestor=alfred-front:1.0)
```
