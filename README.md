# Jogo-da-Velha

## Sobre o Projeto:

> Este projeto é um Jogo da Velha no Navegador feito com um layout moderno. A ideia do layout vem do site
[Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v), onde existe este desafio.
Por ser um desafio para usuários premium, não tive acesso aos *assets* que normalmente o site disponibiliza ao usuário para iniciar o projeto,
apenas vi como eram as imagens e as cores e fiz.

<hr>

## Deploy do projeto:

<https://pedro-sousam.github.io/Jogo-da-Velha-Animado/>

<img src="/imagens/JogoDaVelha.jpg"/>

## Descrição do projeto:

> O usuário seleciona o modo de jogo e pode jogar o jogo da velha com alguém que esteja com ele ou contra a cpu.
> O jogo foi feito com responsividade, perfeito para ser jogado na tela do celular.

> Este jogo implementa 3 dificuldades para a cpu: Boba, Atenta e Imbatível.
> - A **Boba** faz a jogada da cpu ser aleatória. Ela analisa apenas se o espaço está vazio para poder jogar.
> - A **Atenta** tenta fechar a linha e impedir o jogador de ganhar.
> - A **Imbatível** conhece todas as jogadas possíveis para a vitória, por isso, ela força um empate se não puder vencer. Como o próprio nome diz, ela não pode ser vencida, fazendo com que o jogador teste suas habilidades para não ser derrotado e sempre buscar pelo menos um empate.

> O projeto conta com 4 telas:
> - A tela inicial de opções para começar o Jogo.
> - A tela de seleção de inteligência da Cpu.
> - A tela com o tabuleiro do jogo para jogar.
> - A tela de vitória para indicar o vencedor.

> ### Tela Inicial:
> O usuário pode escolher seu simbolo: X ou O. Sabendo que o X sempre é o primeiro a jogar.
> Então, Escolhe se jogará com um segundop jogador ou contra a Cpu.

<img src="/imagens/TelaInicial.png"/>

> ### Tela Seleção de Inteligência:
> O usuário pode selecionar o nível de inteligência da Cpu que vai enfrentar ou cancelar a opção.

<img src="/imagens/TelaCpu.png"/>

> ### Tela de Jogo:
> Nesta tela, o jogador escolhe qual espaço preencherá com seu símbolo em seu devido turno.
> No topo da tela existe um indicador de quem é o turno e um botão de retornar a tela inicial.
> Na parte inferior, existe um placar de vitórias e empates.

<img src="/imagens/TelaJogo.png"/>

> ### Tela de Vitoria:
> A tela de vitória só surge quando o jogo reconhece uma vitória ou um empate, sobrepondo a tela de Jogo para indicar o vitorioso ou a falta de um.
> Ela possui a opção de continuar jogando ou de retornar à tela inicial.

<img src="/imagens/TelaVitoria.png"/>

## Recursos:

* [X] Tela de opções iniciais do jogo
* [X] Tela de seleção da inteligência da CPU
* [X] Tela de Vitória, Derrota ou Empate
* [X] Tela com o tabuleiro do jogo
* [X] Layout Responsivo
* [X] Seleção de símbolos
* [X] Modos de jogo
* [X] Controles de retorno
* [X] Funções das telas
* [X] Placar e Turnos
* [X] Funções da Cpu
* [X] Jogadas da Cpu Atenta
* [X] Jogadas da Cpu Imbatível



