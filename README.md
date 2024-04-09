# :checkered_flag: MusicBoxd

Rede social onde o usuário pode pesquisar um álbum de música, escrever uma resenha, editá-la e apagá-la caso queira.

## :technologist: Membros da equipe

428968 - Mateus Felipe Nobre, Design Digital
402751 - Thais Alves Batista, Design Digital

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

-Usuário não registrado

-Usuário registrado

-Administrador



## :spiral_calendar: Entidades ou tabelas do sistema

-Usuário

-Álbum

-Resenha

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Usuário não registrado: poderão ver os álbuns e as resenhas feitos por usuários registrados.

Usuário registrado: pode listar os álbuns e seus detalhes, assim como usuários não registrados, porém podem escrever resenhas sobre os álbuns.

O adminstrador: pode adicionar, remover e editar os álbuns.


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
| Álbum | X |  X  | X | X |
| Resenha | X |  X  |  X | X |
| Usuário |  |    |  |  |



## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| POST | auth/local|
| GET | /user/me|
| GET | API/Álbuns|
| GET | /api/álbuns/{id}|
| POST | /api/álbuns |
| PUT | /api/álbuns/{id} |
| Delete | /api/Álbuns/{id} |
