# :checkered_flag: MusicBoxd

Rede social sobre música onde o usuário pode escrever uma resenha de um álbum, editá-la e apagá-la.

## :technologist: Membros da equipe

428968 - Mateus Felipe Nobre, Design Digital

402751 - Thais Alves Batista, Design Digital

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

-Usuário não registrado

-Usuário registrado

-Administrador



## :spiral_calendar: Entidades ou tabelas do sistema

-Usuário

-Papel de usuário

-Review

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Usuário não registrado: poderão ver a Home da aplicação.

Usuário registrado: Pode escrever resenhas sobre os álbuns, exclui-lás e editá-las.

O adminstrador: pode adicionar, remover e editar usuários.


## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

VueJS v3.0, Vue-Router e Pinia.
Axios

**Backend:**

Node.JS
Express


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Role |  |    |  | |
| Review | X |  X  |  X | X |
| Usuário | x |  x  | x | x |



## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | api/users| admin
| GET | /api/users| admin 
| PUT | /api/users/admin |
| Delete | /api/users/admin |
| GET | API/review|user|
| POST | /api/review| user
| PUT | /api/review/ user |
| Delete | /api/review/user |


